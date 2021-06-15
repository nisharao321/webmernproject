import React, {useState,useContext} from 'react';
import { NavLink,useHistory } from "react-router-dom";
import login from "../images/signin.jpg";

import { UserContext } from '../App';

const Login = () => {

    const {state,dispatch} = useContext(UserContext);

    const history = useHistory();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const loginUser = async (e) => {
        e.preventDefault();
        const res = await fetch('/signin', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        });

        const data = res.json();

        if (res.status === 400 || !data) {
            window.alert("Invaid credentials");
        } else {
            dispatch({ type: 'USER',payload:true });
            window.alert("Login Successful");
            history.push("/");
        }
    }

    return (
        <>
            <div className="main_">
                <section className="signin">
                    <div className="small-middle-container">
                        <div className="signup-content">
                            <div className="signup-image">
                                <figure><img src={login} alt="signin" /></figure>
                                <NavLink to="/signup" className="signup-image-link">Create an account</NavLink>
                            </div>
                            <div className="signin-form">
                                <h2 className="form-title">Sign-in</h2>
                                <form method="POST" className="register-form" id="register-form">
                                <div className="form-group">
                                    <label htmlFor="email"><i className="zmdi zmdi-email"></i></label>
                                    <input type="email" name="email" id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Your Email" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="pass"><i className="zmdi zmdi-lock"></i></label>
                                    <input type="password" name="password" id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Password" />
                                </div>
                                <div className="form-group form-button">
                                    <input type="submit" name="signin" id="signin" className="form-submit"
                                        value="Login"
                                        onClick={loginUser}
                                    />
                                </div>
                              </form>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default Login
