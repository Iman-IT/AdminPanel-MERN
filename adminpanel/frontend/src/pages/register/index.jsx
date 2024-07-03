import React, { useState } from 'react';

import { useSignup } from '../../hooks/useSignup';
import { useNavigate } from 'react-router-dom';
import AppLayout from '../../components/applayout';

function Register() {
    const [role, setRole] = useState("");
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: '',
        address: '',
        phone: '',
        image: null
    });
    const [formErrors, setFormErrors] = useState({});
    const { signup, error, isLoading } = useSignup();
    const navigate = useNavigate();

    const handleRoleChange = (value) => {
        setRole(value);
        setFormData({ ...formData, role: value });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const errors = {};
        if (!formData.name) errors.name = 'Name is required';
        if (!formData.email) errors.email = 'Email is required';
        if (!formData.password) errors.password = 'Password is required';
        if (!formData.role) errors.role = 'Occupation is required';

        setFormErrors(errors);
        if (Object.keys(errors).length > 0) return;

        const formDataObj = new FormData();
        Object.keys(formData).forEach(key => {
            formDataObj.append(key, formData[key]);
        });

        await signup(formDataObj);
        alert('Registration Successful');

        if (!error) {
            setFormData({
                name: '',
                email: '',
                password: '',
                role: '',
                address: '',
                phone: '',
                image: null
            });
            navigate('/adminpanel')
        }
    };

    return (
        <>
       <AppLayout>

       <h2 className="lead fw-bold mt-5 me-3 text-center">Register</h2>
            <div className="container">
                <div className="row d-flex justify-content-center align-items-center card p-4">
                    <form method="post" encType="multipart/form-data">
                        <section className="row">
                            <div className="col-6">
                                <div className="form-outline mb-4">
                                    <input type="text" className="form-control form-control-lg"
                                        placeholder="Enter a name" name="name" onChange={handleChange} />
                                    <label className="form-label">Name</label>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="form-outline mb-4">
                                    <input type="email" className="form-control form-control-lg"
                                        placeholder="Enter a valid email address" name="email" onChange={handleChange} />
                                    <label className="form-label">Email address</label>
                                </div>
                            </div>
                        </section>
                        <section className="row">
                            <div className="col-6">
                                <div className="form-outline mb-4">
                                    <input type="phone" className="form-control form-control-lg"
                                        placeholder="Enter a phone no" name="phone" onChange={handleChange} />
                                    <label className="form-label">Phone No</label>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="form-outline mb-4">
                                    <input type="password" className="form-control form-control-lg"
                                        placeholder="Enter a password" name="password" onChange={handleChange} />
                                    <label className="form-label">Password</label>
                                </div>
                            </div>
                        </section>
                        <section className="row">
                            <div className="col-6">
                                <div className="form-outline mb-3">
                                    <select name="role" className="form-control form-control-lg" onChange={handleRoleChange}>
                                        <option value="">Select Role</option>
                                        <option value="user">User</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                    <label className="form-label">Role</label>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="form-outline mb-4">
                                    <input type="file" className="form-control form-control-lg"
                                        name="image" onChange={handleFileChange} />
                                    <label className="form-label">Image</label>
                                </div>
                            </div>
                        </section>
                        <div className="form-outline mb-3">
                            <input type="text" className="form-control form-control-lg"
                                placeholder="Enter an address" name="address" onChange={handleChange} />
                            <label className="form-label">Address</label>
                        </div>
                        <section>
                            <button className='btn btn-primary btn-lg' onClick={handleSubmit}>Register</button>
                        </section>
                    </form>
                </div>
            </div>
            </AppLayout>
        </>
    );
}

export default Register;
