import React, {useState} from 'react';
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Success from "../components/Success";

function Registerscreen({steps, setSteps}) {
    const [name, setname] = useState('');
    const [email, setemail] = useState('');
    const [password, setpassword] = useState("1234");
    const [cpassword, setcpassword] = useState("1234");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();
    const [success, setSuccess] = useState();

    async function register() {

        if (password === cpassword) {
            const user = {
                name,
                email,
                password,
                cpassword
            }

            try {
                setLoading(true)
                const result = (await axios.post('/api/users/register', user)).data

                const resultLog = (await axios.post('/api/users/login', user)).data

                localStorage.setItem('currentUser', JSON.stringify(resultLog));

                setLoading(false)
                setSuccess(true);

                setname('');
                setemail('');
                setpassword('');
                setcpassword('');

                setSteps(steps+1)


            } catch (error) {
                console.log(error)
                setLoading(false)
                setError(true)
            }

        } else {
            alert('Passwords not matched')
        }
    }
    return (
        <div>
            {loading ? (<Loader/>) : error ? (<Error/>) :
                <div className="row justify-content-center mt-5">
                    <div className="col-md-5">
                        {success && (<Success message="Registration successful" />)}
                        <div className="bs">
                            <h2>Enter your data</h2>
                            <input type="text" className="form-control" placeholder="name"
                                   value={name} onChange={(e) => {
                                setname(e.target.value)
                            }}/>
                            <input type="email" className="form-control" placeholder="email"
                                   value={email} onChange={(e) => {
                                setemail(e.target.value)
                            }}
                            />

                            <button className='btn btn-primary' onClick={register}>Apply</button>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}

export default Registerscreen;