//import hook react
import React, { useState, useEffect } from 'react';

//import hook useHitory from react router dom
import { useHistory } from 'react-router';
import { Link } from "react-router-dom";

//import axios
import axios from 'axios';

export default function Login() {
    //define state
    const [email, setEmail] = useState("admin@gmail.com");
    const [password, setPassword] = useState("12345678");

    //define state validation
    const [validation, setValidation] = useState([]);

    //define history
    const history = useHistory();

    //hook useEffect
    useEffect(() => {
        if (localStorage.getItem('token')) {
            history.push('/dashboard');
        }
    }, [history]);

    //function "login"
    const loginHandler = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append('email', email);
        formData.append('password', password);

        await axios.post('http://localhost:8000/api/login', formData)
            .then((response) => {
                const data = response.data;
                if (data.success) {
                    localStorage.setItem('token', response.data.token);
                    history.push('/dashboard');
                } else {
                    setValidation(response.data);
                }
            })
            .catch((error) => {
                setValidation(error.response.data);
            })
    };

    return (
        <div className="container" style={{ marginTop: "120px" }}>
            <div className="row justify-content-center">
                <div className="col-md-4">
                    <div className="card border-0 rounded shadow-sm">
                        <div className="card-body">
                            <h4 className="fw-bold">HALAMAN LOGIN</h4>
                            <hr />
                            {
                                validation.message && (
                                    <div className="alert alert-danger">
                                        {validation.message}
                                    </div>
                                )
                            }
                            <form onSubmit={loginHandler}>
                                <div className="mb-3">
                                    <label className="form-label">ALAMAT EMAIL</label>
                                    <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Masukkan Alamat Email" />
                                </div>
                                {
                                    validation.email && (
                                        <div className="alert alert-danger">
                                            {validation.email[0]}
                                        </div>
                                    )
                                }
                                <div className="mb-3">
                                    <label className="form-label">PASSWORD</label>
                                    <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Masukkan Password" />
                                </div>
                                {
                                    validation.password && (
                                        <div className="alert alert-danger">
                                            {validation.password[0]}
                                        </div>
                                    )
                                }
                                <div className="d-grid gap-2">
                                    <button type="submit" className="btn btn-primary mr-2">LOGIN</button>
                                    <Link to={`/register`} className="btn btn-info">REGISTER</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
