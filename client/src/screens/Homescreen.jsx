import React, {useState, useEffect} from 'react'
import axios from "axios";
import Room from "../components/Room";
import Loader from "../components/Loader";
import Error from "../components/Error";
import {DatePicker} from 'antd';
import moment from "moment";

function Homescreen() {
    const [loading, setLoading] = useState();
    const [error, setError] = useState();
    const [rooms, setRooms] = useState([])
    const {RangePicker} = DatePicker;

    const [fromdate, setfromdate] = useState();
    const [todate, settodate] = useState();
    const [duplicaterooms, serDuplicaterooms] = useState();

    const [searchkey, setsearchkey] = useState('')
    const [type, settype] = useState('all')

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const data = (await axios.get('/api/rooms/getallrooms')).data
                setRooms(data); // Access data using response.data
                serDuplicaterooms(data)
                setLoading(false)
            } catch (error) {
                setError(true)
                console.error(error); // Use console.error for errors
                setLoading(false)
            }
        };

        fetchData();
    }, [fromdate, todate]); // Empty dependency array, runs effect only once after mount

    function filterByDate(dates) {
        setfromdate(moment(dates[0].$d).format('DD-MM-YYYY'))
        settodate(moment(dates[1].$d).format('DD-MM-YYYY'))

        // var temprooms = []
        //
        // for (const room of duplicaterooms) {
        //     var availability = true;
        //
        //     if (room.currentbookings.length > 0) {
        //         for (const booking of room.currentbookings) {
        //
        //             const start = moment(booking.fromdate, 'DD-MM-YYYY');
        //             const end = moment(booking.todate, 'DD-MM-YYYY');
        //
        //             if (moment(fromdate).isBetween(start, end) ||
        //                 moment(todate).isBetween(start, end)
        //
        //                 ||
        //                 (moment(start).isBetween(fromdate, todate) ||
        //                     moment(end).isBetween(fromdate, todate))
        //
        //                 ||
        //                 (
        //                     moment(fromdate).isSame(start) &&
        //                     moment(todate).isSame(end)
        //                 )
        //                 ||
        //                 (
        //                     moment(fromdate).isSameOrAfter(start) &&
        //                     moment(todate).isSameOrBefore(end))
        //             ) {
        //                 availability = false;
        //                 break;
        //             }
        //         }
        //     }
        //     if (availability) {
        //         temprooms.push(room)
        //     }
        // }
        // setRooms(temprooms)

    }

    function filterBySearch() {

        const temprooms = duplicaterooms.filter(room => room.name.toLowerCase().includes(searchkey.toLowerCase()))

        setRooms(temprooms)
    }

    function filterByType(e) {
        settype(e)

        if (e !== 'all') {
            const temprooms = duplicaterooms.filter(room => room.type.toLowerCase() === e.toLowerCase())
            setRooms(temprooms)
        }
        else {
            setRooms(duplicaterooms)
        }


    }

    return (
        <div className="container">

            <div className='row mt-5 bs align-items-center'>

                <div className="col-md-3">

                    <RangePicker format='DD/MM/YYYY' onChange={filterByDate}/>

                </div>

                <div className='col-md-5'>
                    <input type="text" className="form-control" placeholder='Search Rooms'
                           value={searchkey} onChange={(e) => {
                        setsearchkey(e.target.value)
                    }} onKeyUp={filterBySearch}/>
                </div>

                <div className='col-md-4'>
                    <select className='form-control' value={type} onChange={(e) => {
                        filterByType(e.target.value)
                    }}>
                        <option value="all" className='formho'>All</option>
                        <option value="delux" className='formho'> Delux</option>
                        <option value="non-delux" className='formho'>Non-delux</option>
                    </select>
                </div>
            </div>

            <div className="row justify-content-center mt-5">
                {loading ? (
                    <Loader/>
                ) : error ? (
                    <Error/>
                ) : (
                    rooms.map((room) => {
                        return <div className="col-md-9 mt-3">
                            <Room room={room} fromdate={fromdate} todate={todate}/>
                        </div>;
                    })
                )}
            </div>
        </div>
    )
}

export default Homescreen