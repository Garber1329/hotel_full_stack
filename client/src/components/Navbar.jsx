import React from 'react'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

function Navbar() {
    const user = JSON.parse(localStorage.getItem('currentUser'))

    function logout(){
        localStorage.removeItem('currentUser')
        window.location.href='/login'
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid d-flex justify-content-between">
                    <a className="navbar-brand flex-fill" href="/home">Luxury Hotel</a>
                    <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0 flex-fill">
                        <li><a href="/home" className="nav-link px-2">Reservation</a></li>
                        <li><a href="/contact" className="nav-link px-2">Contact</a></li>
                    </ul>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
                            aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"><FontAwesomeIcon icon="fa-solid fa-bars"
                                                                               style={{color: "#ffffff"}}/></span>
                    </button>
                    <div className="collapse navbar-collapse flex-fill" id="navbarNav">
                        <ul className="navbar-nav mr-5">
                            {user ? (
                                <>
                                    {user.isAdmin &&
                                        <li className="nav-item">
                                            <a href="/admin" className="nav-link px-2">Admin panel</a>
                                        </li>
                                    }
                                    <li className="nav-item">
                                        <div className="dropdown">
                                        <button className="btn btn-secondary dropdown-toggle" type="button"
                                                    data-bs-toggle="dropdown" aria-expanded="false">
                                                <i className="fa-solid fa-user"></i>
                                                {user.name}
                                            </button>
                                            <ul className="dropdown-menu">
                                                <li><a className="dropdown-item" href="/profile">Profile</a></li>
                                                <li><a className="dropdown-item" href="/login"
                                                       onClick={logout}>Logout</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li className="nav-item">
                                        <a className="nav-link active" aria-current="page" href="/register">Register</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/login">Login</a>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar