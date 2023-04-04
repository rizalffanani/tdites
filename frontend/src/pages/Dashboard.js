import React, { useMemo, useState, useEffect } from 'react'
import moment from 'moment'
import 'moment/locale/id';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';

import { Link } from "react-router-dom";
import { useHistory } from 'react-router'
import axios from 'axios'
import Table from '../components/Table';

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

    const deleteAlert = (id) => {

        confirmAlert({
            title: 'Konfirmasi Hapus',
            message: 'Apa anda yakin',
            buttons: [
                {
                    label: 'ya',
                    onClick: () => deleteList(id)
                },
                {
                    label: 'tidak',
                }
            ]
        });
    }

    //function logout
    const logoutHandler = async () => {
        axios.defaults.headers.common['Authorization'] = `${token}`
        await axios.post('http://localhost:8000/api/logout').then(() => {
            localStorage.removeItem("token");
            history.push('/');
        });
    };

    const columns = useMemo(
        () => [
            {
                Header: "Nama",
                accessor: "nama",
            },
            {
                Header: "Deskripsi",
                accessor: "deskripsi",
            },
            {
                Header: "Pendidikan Minimal",
                accessor: "tingkat_pendidikan_minimal",
            },
            {
                Header: "Tanggal Buka",
                accessor: "tanggal_dibuka",
                Cell: ({ cell: { value } }) => {
                    return (moment(value).format('LL'));
                }
            },
            {
                Header: "Tanggal Tutup",
                accessor: "tanggal_ditutup",
                Cell: ({ cell: { value } }) => {
                    return (moment(value).format('LL'));
                }
            },
            {
                Header: "Kuota",
                accessor: "kuota",
            },
            {
                Header: "Actions",
                accessor: "id",
                Cell: ({ cell: { value } }) => {
                    return (
                        <>
                            <Link to={`/edit/${value}`} className="btn btn-warning">Update</Link>
                            {" "}
                            <button onClick={() => deleteAlert(value)} className="btn btn-danger">Delete</button>
                        </>
                    );
                }
            },
        ], []
    );

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
                            <Table columns={columns} data={datalist} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
