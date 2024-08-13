import React, { useState } from 'react';

const UserForm = ({ onSubmit, user }) => {
    const [formData, setFormData] = useState({
        name: user ? user.name : '',
        email: user ? user.email : '',
        password: user ? user.password : '',
        dob: user ? user.dob : ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
            />
            <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
            />
            <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
            />
            <input
                type="date"
                name="dob"
                placeholder="Date of Birth"
                value={formData.dob}
                onChange={handleChange}
            />
            <button type="submit">Submit</button>
        </form>
    );
};

export default UserForm;