import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useParams} from "react-router-dom";
import Loader from "../components/Loader";
import Error from "../components/Error";
import moment from "moment";
import StripeCheckout from 'react-stripe-checkout';
import Swal from "sweetalert2";
import RegisterForOrder from "../components/RegisterForOrder";
import Room from "../components/Room";
import Service from "../components/Service";

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

            try {
                setLoading(true);
                const data = (await axios.post("/api/rooms/getroombyid", {roomid: roomid})).data;
                setRoom(data);
                setTotalamount(totaldays * data.rentperday);
                const serData = (await axios.get('/api/services/getallservices')).data
                setService(serData);
            } catch (error) {
                console.error('Error fetching room data:', error);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [roomid]); // Empty dependency array, runs effect only once after mount

    async function onToken(token) {
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
            Swal.fire('Congratulations', 'Your Room Booked Successfully', 'success',).then(result => {
                window.location.href = '/profile'
            })
        } catch (error) {
            setError(true)
            setLoading(false)
            Swal.fire('Oops', 'Something went wrong', 'error')
        }
    }

    const [steps, setSteps] = useState(1);
    const [services, setService] = useState([]);
    const [selectedServices, setSelectedServices] = useState([]);

    function selectServices(service) {
        setSelectedServices([...selectedServices, service]);

    }

    if (steps === 1) {
        return (
            <div className='row justify-content-center mt-5'>
                <div className='col-7'>
                    <div className='row d-flex align-items-center justify-content-between'>
                        <h2 className='col-6'>Chose your service</h2>
                        <button className='btn btn-primary col-2' onClick={() => setSteps(steps + 1)}>Next step</button>
                    </div>
                    {
                        services.map((service) => {
                            return <div className='col'>
                                <Service service={service} selectServices={selectServices}/>
                            </div>;
                        })
                    }
                </div>

            </div>

        )
    } else if (steps === 2) {
        if (!localStorage.getItem('currentUser')) {
            return (
                <RegisterForOrder steps={steps} setSteps={setSteps}/>
            )
        } else {
            setSteps(steps + 1)
        }

    } else if (steps === 3) {
        return (
            <div className="m-5">
                {loading ? (<Loader/>) : error ? (<Error/>) : (
                    <>
                        <div className="row justify-content-center mt-5 bs">

                            <div className="col-md-6">
                                <h1>{room.name}</h1>
                                <img src={room.imageurls[0]} className='bigimg'/>
                            </div>

                            <div className="col-md-5">

                                <div style={{textAlign: 'right'}}>
                                    <h1>Booking Details</h1>
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
                        <div className="row justify-content-center mt-5 col-5">
                            <h2>Your Selected Service</h2>
                            {
                                selectedServices.map((service) => {
                                    return <div className='col-12'>
                                        <Service btn={false} service={service}/>
                                    </div>;
                                })
                            }
                        </div>
                    </>
                )}
            </div>
        );
    }

}

export default Bokingscreen;