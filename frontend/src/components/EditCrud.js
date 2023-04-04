import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

//import axios
import axios from 'axios'

export const EditCrud = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState();
    const history = useHistory();
    const { id } = useParams();
    const token = "Bearer " + localStorage.getItem("token");

    useEffect(() => {
        getById();
    }, []);// eslint-disable-line react-hooks/exhaustive-deps

    const getById = async () => {
        await axios.get(`http://localhost:8000/api/articles/${id}`, {
            headers: {
                Authorization: token
            }
        }).then((response) => {
            setTitle(response.data.title);
            setBody(response.data.body);
        })
    }

    const updateCrud = async (e) => {
        e.preventDefault();

        const formData = { title, body };

        await axios.put(`http://localhost:8000/api/articles/${id}`, formData, {
            headers: {
                //set axios header dengan type Authorization + Bearer token
                Authorization: token
            }
        }).then(() => {
            //redirect to logi page
            history.push('/crud');
        })
    }


    return (
        <div className="container" style={{ marginTop: "50px" }}>
            <div className="row justify-content-center">
                <div className="col-md-12">
                    <div className="card border-0 rounded shadow-sm">
                        <div className="card-body">
                            <form onSubmit={updateCrud}>
                                <div className="form-group">
                                    <label className="label">Title</label>
                                    <input className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} type="text" placeholder="Title" />
                                </div>

                                <div className="form-group">
                                    <label className="label">Body</label>
                                    <textarea className="form-control" value={body} onChange={(e) => setBody(e.target.value)} rows="3"></textarea>
                                </div>

                                <div className="form-group">
                                    <button className="btn btn-primary">Update</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
