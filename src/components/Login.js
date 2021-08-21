import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
// import axios from 'axios'
// import { Context } from "../Store";
// import { storeToken } from "../helper.js"

import { login } from '../actions/userActions'

function Login({ location, history }) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch()

    // const userLogin = useSelector((state) => state.userLogin)
    // const userInfo = userLogin

    // const redirect = location.search ? location.search.split('=')[1] : '/'

    // useEffect(() => {
    //     if (userInfo) {
    //         history.push(redirect)
    //     }
    // }, [history, userInfo, redirect])

    const loginSubmit = async e => {
        e.preventDefault()
        try {
            dispatch(login(email, password))
            window.location.href = "/main";
        } catch (err) {
            alert(err)
        }
    }

    return (
        <div className="login-page">
            <form onSubmit={loginSubmit}>
                <h2>Login</h2>
                <input type="email" name="email" required
                    placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />

                <input type="password" name="password" required autoComplete="on"
                    placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />

                <div className="row">
                    <button type="submit">Login</button>
                    <Link to="/register">Register</Link>
                </div>
            </form>
        </div>
    )
}

export default Login