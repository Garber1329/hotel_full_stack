import React, {useState} from 'react';
import {Button, Modal} from "react-bootstrap";
import Carousel from 'react-bootstrap/Carousel';
import {Link} from "react-router-dom";

function Service({service, selectServices, btn}) {


    return (
        <div className="row bs">
            <div className="col-md-4">
                <img src={service.imageurl} className="smallimg"/>
            </div>
            <div className="col-md-7 text-left">
                <h2>{service.name}</h2>
                <p>Description : {service.description}</p>
                <p>Capasity : {service.capacity}</p>
                <p>Price : {service.price}</p>
                { btn === false ? (<div></div>) : (
                        <div style={{float: 'right'}}>
                            <button className='btn btn-primary' onClick={() => {
                                selectServices(service)
                            }}>Add service
                            </button>
                        </div>
                    )
                }

            </div>
        </div>
    )
        ;
}

export default Service;