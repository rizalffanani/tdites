import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

import axios from 'axios'
import { useFormik } from "formik";
import * as Yup from "yup";

export const AddCrud = () => {
    const history = useHistory();
    const [user, setDataList] = useState()
    const { id } = useParams();
    const token = "Bearer " + localStorage.getItem("token");

    useEffect(() => {
        if (id) {
            getById();
        }
    }, [id]);// eslint-disable-line react-hooks/exhaustive-deps


    const getById = async () => {
        await axios.get(`http://localhost:8000/api/loker/${id}`, {
            headers: {
                Authorization: token
            }
        }).then((response) => {
            console.log(response.data)
            setDataList(response.data);
        })
    }

    const formik = useFormik({
        initialValues: {
            nama: user ? user.nama : "",
            deskripsi: user ? user.deskripsi : "",
            pendidikan: user ? user.tingkat_pendidikan_minimal : "",
            tglBuka: user ? user.tanggal_dibuka : "",
            tglTutup: user ? user.tanggal_ditutup : "",
            kuota: user ? user.kuota : "",
        },
        enableReinitialize: true,
        validationSchema: Yup.object({
            nama: Yup.string()
                .min(3, "Mininum 3 huruf")
                .required("Harus diisi"),
            deskripsi: Yup.string()
                .min(3, "Mininum 3 huruf")
                .required("Harus diisi"),
            pendidikan: Yup.string()
                .required("Harus diisi"),
            tglBuka: Yup.date()
                .required("Tanggal buka harus dipilih"),
            tglTutup: Yup.date()
                .required("Tanggal tutup harus dipilih"),
            kuota: Yup.number()
                .min(1, "Mininum 1 Kuota")
                .required("Harus diisi")
        }),
        onSubmit: values => {

            const formData = {
                nama: values.nama,
                deskripsi: values.deskripsi,
                tingkat_pendidikan_minimal: values.pendidikan,
                tanggal_dibuka: values.tglBuka,
                tanggal_ditutup: values.tglTutup,
                kuota: values.kuota
            };
            if (id) {
                axios.put(`http://localhost:8000/api/loker/${id}`, formData, {
                    headers: {
                        Authorization: token
                    }
                }).then(() => {
                    history.push('/dashboard');
                })
            } else {
                axios.post('http://localhost:8000/api/loker', formData, {
                    headers: {
                        Authorization: token
                    }
                }).then(() => {
                    history.push('/dashboard');
                })
            }
        }
    });

    return (
        <div className="container" style={{ marginTop: "50px" }}>
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card border-0 rounded shadow-sm">
                        <div className="card-body">
                            <form onSubmit={formik.handleSubmit} >
                                <div className="form-group">
                                    <label className="label">Nama</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        placeholder="Nama"
                                        name="nama"
                                        value={formik.values.nama}
                                        onChange={formik.handleChange}
                                    />
                                    {formik.errors.nama && formik.touched.nama && (
                                        <div className="alert alert-warning mt-2">
                                            {formik.errors.nama}
                                        </div>
                                    )}
                                </div>

                                <div className="form-group">
                                    <label className="label">Deskripsi</label>
                                    <textarea
                                        className="form-control"
                                        rows="3"
                                        placeholder="Deskripsi"
                                        name="deskripsi"
                                        value={formik.values.deskripsi}
                                        onChange={formik.handleChange}
                                    />
                                    {formik.errors.deskripsi && formik.touched.deskripsi && (
                                        <div className="alert alert-warning mt-2">
                                            {formik.errors.deskripsi}
                                        </div>
                                    )}
                                </div>

                                <div className="form-group">
                                    <label className="label">Tingkat Pendidikan Minimal</label>
                                    <select
                                        className="form-control"
                                        name="pendidikan"
                                        value={formik.values.pendidikan}
                                        onChange={formik.handleChange}
                                    >
                                        <option value={""}>Pilih</option>
                                        <option value={"SMP"}>SMP</option>
                                        <option value={"SMA"}>SMA</option>
                                        <option value={"D1"}>D1</option>
                                        <option value={"D2"}>D2</option>
                                        <option value={"D3"}>D3</option>
                                        <option value={"S1"}>S1</option>
                                    </select>
                                    {formik.errors.pendidikan && formik.touched.pendidikan && (
                                        <div className="alert alert-warning mt-2">
                                            {formik.errors.pendidikan}
                                        </div>
                                    )}
                                </div>

                                <div className="form-group">
                                    <label className="label">Tanggal Dibuka</label>
                                    <input
                                        className="form-control"
                                        type="date"
                                        name="tglBuka"
                                        value={formik.values.tglBuka}
                                        onChange={formik.handleChange}
                                    />
                                    {formik.errors.tglBuka && formik.touched.tglBuka && (
                                        <div className="alert alert-warning mt-2">
                                            {formik.errors.tglBuka}
                                        </div>
                                    )}
                                </div>

                                <div className="form-group">
                                    <label className="label">Tanggal DiTutup</label>
                                    <input
                                        className="form-control"
                                        type="date"
                                        name="tglTutup"
                                        value={formik.values.tglTutup}
                                        onChange={formik.handleChange}
                                    />
                                    {formik.errors.tglTutup && formik.touched.tglTutup && (
                                        <div className="alert alert-warning mt-2">
                                            {formik.errors.tglTutup}
                                        </div>
                                    )}
                                </div>

                                <div className="form-group">
                                    <label className="label">Kuota</label>
                                    <input
                                        className="form-control"
                                        placeholder="Kuota"
                                        type="number"
                                        name="kuota"
                                        value={formik.values.kuota}
                                        onChange={formik.handleChange}
                                    />
                                    {formik.errors.kuota && formik.touched.kuota && (
                                        <div className="alert alert-warning mt-2">
                                            {formik.errors.kuota}
                                        </div>
                                    )}
                                </div>

                                <div className="form-group">
                                    <button type="submit" className="btn btn-primary">Save</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
