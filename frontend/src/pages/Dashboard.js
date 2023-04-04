import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import { useHistory } from 'react-router'
import axios from 'axios'

export default function Dashboard() {

    //state
    const [title] = useState("CRUD Loker");
    const [datalist, setDataList] = useState([]);
    //token
    const token = "Bearer " + localStorage.getItem("token");

    //define history
    const history = useHistory();

    //hook useEffect
    useEffect(() => {
        if (!token) {
            history.push('/');
        }
        cekLogin();
    }, [token, history]);

    // get data
    const cekLogin = async () => {
        await axios.get('http://localhost:8000/api/user-profile', {
            headers: {
                Authorization: token
            }
        }).then((response) => {
            fetchData();
        }).catch((error) => {
            localStorage.removeItem("token");
            history.push('/');
        })
    }

    // get data
    const fetchData = async () => {
        await axios.get('http://localhost:8000/api/loker', {
            headers: {
                Authorization: token
            }
        }).then((response) => {
            setDataList(response.data);
        }).catch((error) => {
            console.log(error);
        })
    }

    // delete
    const deleteList = async (id) => {
        await axios.delete(`http://localhost:8000/api/loker/${id}`, {
            headers: {
                Authorization: token
            }
        }).then((response) => {
            const data = response.data;
            if (data.success) {
                fetchData();
            }
        })
    }

    //function logout
    const logoutHandler = async () => {
        axios.defaults.headers.common['Authorization'] = `${token}`
        await axios.post('http://localhost:8000/api/logout').then(() => {
            localStorage.removeItem("token");
            history.push('/');
        });
    };

    return (
        <div className="container" style={{ marginTop: "50px" }}>
            <div className="row justify-content-center">
                <div className="col-md-12">
                    <div className="card border-0 rounded shadow-sm">
                        <div className="card-body">
                            <h1>{title}</h1>
                            <hr />
                            <Link to="/add" className="btn btn-primary mr-2">Create New</Link>
                            <button onClick={logoutHandler} className="btn btn-md btn-danger">Logout</button>
                            <table className="table table-striped mt-2">
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>Nama</th>
                                        <th>Deskripsi</th>
                                        <th>Pendidikan Minimal</th>
                                        <th>Tanggal Buka</th>
                                        <th>Tanggal Tutup</th>
                                        <th>Kuota</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {datalist.map((row, index) => (
                                        <tr key={row.id}>
                                            <td>{index + 1}</td>
                                            <td>{row.nama}</td>
                                            <td>{row.deskripsi}</td>
                                            <td>{row.tingkat_pendidikan_minimal}</td>
                                            <td>{row.tanggal_dibuka}</td>
                                            <td>{row.tanggal_ditutup}</td>
                                            <td>{row.kuota}</td>
                                            <td>
                                                <Link to={`/edit/${row.id}`} className="btn btn-warning">Update</Link>
                                                {" "}
                                                <button onClick={() => deleteList(row.id)} className="btn btn-danger">Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
