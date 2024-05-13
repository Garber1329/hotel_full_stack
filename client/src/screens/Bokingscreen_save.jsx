import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useParams} from "react-router-dom";
import Loader from "../components/Loader";
import Error from "../components/Error";
import moment from "moment";
import StripeCheckout from 'react-stripe-checkout';
import Swal from "sweetalert2";

function Bokingscreen() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
    const [room, setRoom] = useState([]);

    const {roomid} = useParams();
    const {fromDate} = useParams();
    const {toDate} = useParams();

    const fromDate1 = moment(fromDate, "DD-MM-YYYY");
    const toDate1 = moment(toDate, "DD-MM-YYYY");
    const totaldays = moment(toDate1).diff(fromDate1, 'days') + 1
    const [totalamount, setTotalamount] = useState();


    useEffect(() => {
        const fetchData = async () => {

            // if(!localStorage.getItem('currentUser')){
            //     window.location.reload='/login'
            // }

            try {
                setLoading(true);
                const data = (await axios.post("/api/rooms/getroombyid", {roomid: roomid})).data;
                setRoom(data);
                setTotalamount(totaldays * data.rentperday);
            } catch (error) {
                console.error('Error fetching room data:', error);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [roomid]); // Empty dependency array, runs effect only once after mount

    async function onToken  (token) {
        fetch('/save-stripe-token', {
            method: 'POST',
            body: JSON.stringify(token),
        }).then(response => {
            response.json().then(data => {
                alert(`We are in business, ${data.email}`);
            });
        });

        const bookingDetails = {
            room,
            userid: JSON.parse(localStorage.getItem('currentUser')).id,
            fromdate: fromDate1,
            todate: toDate1,
            totalamount,
            totaldays,
            token
        }

        try {
            setLoading(true)
            const result = await axios.post('/api/bookings/bookroom', bookingDetails);
            setLoading(false)
            Swal.fire('Congratulations', 'Your Room Booked Successfully', 'success', ).then(result=>{
                window.location.href= '/bookings'
            })
        } catch (error) {
            setError(true)
            setLoading(false)
            Swal.fire('Oops', 'Something went wrong', 'error')
        }
    }

    return (
        <div className="m-5">
            {loading ? (<Loader/>) : error ? (<Error/>) : (

                <div className="row justify-content-center mt-5 bs">

                    <div className="col-md-6">
                        <h1>{room.name}</h1>
                        <img src={room.imageurls[0]} className='bigimg'/>
                    </div>

                    <div className="col-md-5">

                        <div style={{textAlign: 'right'}}>
                            <h1>Booing Details</h1>
                            <hr/>

                            <b>
                                {/*<p>Name : {JSON.parse(localStorage.getItem('currentUser')).name}</p>*/}
                                <p>From Date : {fromDate} </p>
                                <p>To Date : {toDate}</p>
                                <p>Max Count : {room.maxcount}</p>
                            </b>
                        </div>

                        <div style={{textAlign: 'right'}}>
                            <b>
                                <h1>Amount</h1>
                                <hr/>
                                <p>Total days : {totaldays}</p>
                                <p>Rent per day : {room.rentperday}</p>
                                <p>Total Amount: {totalamount}</p>
                            </b>
                        </div>

                        <div style={{float: 'right'}}>
                            <StripeCheckout
                                token={onToken}
                                stripeKey="pk_test_51P8T3SRqmcthmtwqEGt4vcYpE86Ov44HdHDsZYFD24J6l3NJgInJMqbr7lFnhK69Zpz6DVHdups0Og2d8EwSIZV600pPpQQXs6"
                            >
                                <button className='btn btn-primary'>Pay Now</button>
                            </StripeCheckout>
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
}

export default Bokingscreen;