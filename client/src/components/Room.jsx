import React, {useState} from 'react';
import {Button, Modal} from "react-bootstrap";
import Carousel from 'react-bootstrap/Carousel';
import {Link} from "react-router-dom";

function Room({room, fromdate, todate}) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div className="row bs">
            <div className="col-md-4">
                <img src={room.imageurls[0]} className="smallimg"/>
            </div>
            <div className="col-md-7 text-left">
                <h2>{room.name}</h2>
                <p>Max Count : {room.maxcount}</p>
                <p>Phone Number : {room.phonenumber}</p>
                <p>Type : {room.type}</p>

                <div className="d-flex justify-content-between" style={{float: 'right'}}>
                    {(fromdate && todate) && (
                        <Link className="d-block mr-5" to={`/book/${room._id}/${fromdate}/${todate}`}>
                            <button className='btn btn-dark'>Book Now</button>
                        </Link>
                    )}
                    <button className='btn btn-dark ml-2' onClick={handleShow}>View Details</button>
                </div>
            </div>

            <Modal show={show} onHide={handleClose} size={"lg"}>
                <Modal.Header closeButton>
                    <Modal.Title>{room.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Carousel>
                        {room.imageurls.map(url => {
                            return <Carousel.Item>
                                <img
                                    className="d-block w-100 bigimg"
                                    src={url}
                                    alt="slide"
                                />
                            </Carousel.Item>
                        })}

                    </Carousel>
                    <p className="mt-4">{room.description}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
        ;
}

export default Room;