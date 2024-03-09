import { NavLink, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { baseURL } from "../../hooks/config";

const Admin = () => {

    const navigate = useNavigate()
    const [adminData, setAdminData] = useState({
        username: "",
        password: ""
    })



    const validatePassword = password => {
        const uppercaseRegex = /[A-Z]/;
        const specialCharRegex = /[!@#$%^&*(),.?":{ }|<>]/;

        if (!uppercaseRegex.test(password)) {
            toast.error("Password must contain 1 or more uppercase characters.");
            return false;
        }

        if (!specialCharRegex.test(password)) {
            toast.error("Password must contain 1 or more special characters.");
            return false;
        }

        if (password.length < 8) {
            toast.error("Password must be at least 8 characters long.");
            return false;
        }

        return true;
    };

    const validateEmail = email => {
        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValid = emailRegex.test(email);

        if (!isValid) {
            toast.error("Invalid email address.");
        }

        return isValid;
    };



    const handleChange = (e) => {
        const { name, value } = e.target;
        setAdminData({ ...adminData, [name]: value })
    }

    const AdminLoginHandle = async (e) => {
        e.preventDefault();
        const isEmailValid = validateEmail(adminData.username);
        const isPasswordValid = validatePassword(adminData.password);

        if (!isEmailValid || !isPasswordValid) {
            return;
        }

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify(adminData);

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        try {
            const response = await fetch(`${baseURL}/user/authenticate`, requestOptions);
            const data = await response.json();

            if (!response.ok) {
                if (response.status === 401) {
                    // Handle wrong password error
                    console.log("Incorrect username or password. Please try again.");
                    toast("Incorrect username or password. Please try again.")
                    navigate("/adminlogin")
                } else {
                    console.log("An error occurred:", response.statusText);
                }
                return;
            }

            localStorage.setItem("idToken", JSON.stringify(data.idToken));
            localStorage.setItem("accessToken", JSON.stringify(data.accessToken));
            navigate("/admindashboard");
        } catch (error) {
            console.log("An error occurred:", error);
        }
    };


    return (

        <>

            <section className="login-wrapper">
                <div className="login-form">
                    <div className="container">
                        <NavLink className="theme-logo" to="/">
                            <img
                                src="assets/images/logo.png"
                                alt="Project & Resource Tracking System Logo"
                            />
                        </NavLink>
                        <div className="form_sect">
                            <h1>Admin Login</h1>

                            <form action="">
                                <div className="form-group field">
                                    <input
                                        type="email"
                                        name="username"
                                        value={adminData.username}
                                        onChange={handleChange}
                                        className="form-control email"
                                        placeholder="username"
                                    />
                                </div>
                                <div className="form-group field mb30">
                                    <input
                                        type="password"
                                        name="password"
                                        required
                                        value={adminData.password}
                                        onChange={handleChange}
                                        className="form-control pass"
                                        placeholder="Password/OTP"
                                    />
                                </div>
                                <div className="">
                                    <button className="btn btn-info" onClick={AdminLoginHandle}>
                                        Log in
                                    </button>

                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}

export default Admin;