import React, { useState } from 'react';
import { NavLink, useHistory } from "react-router-dom";
import signup from "../images/signup.jpg";

//use states
const Signup = () => {
    const history = useHistory();
    const [user, setUser] = useState({
        name: "", email: "", phone: "", work: "", password: "", cpassword: ""
    });
    
    let name, value;
    const handleInputs = (e) => {
        console.log(e);
        name = e.target.name;
        value = e.target.value;
        setUser({...user,[name]:value})
    }

    const PostData = async (e) => {
        e.preventDefault();

        const { name, email, phone, work, password, cpassword } = user;

        const res = await fetch("/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name, email, phone, work, password, cpassword
            })
        });
        const data = await res.json();

        if (res.status === 422 || !data) {
            window.alert("Invalid Registration");
            console.log("Invalid Registration");
        } else {
            window.alert("Registration Successful");
            console.log("Registration Successful");
            
            history.push("/login");
        }
    }

    return (
        <>
            <div className="main">
                <section className="signup">
                    <div className="small-middle-container">
                        <div className="signup-content">
                            <div className="signup-form">
                                <h2 className="form-title">Sign-up</h2>
                                <form method="POST" className="register-form" id="register-form">
                                    <div className="form-group">
                                        <label htmlFor="name"><i className="zmdi zmdi-account material-icons-name"></i></label>
                                        <input type="text" name="name" id="name" autoComplete="off"
                                            value={user.name}
                                            onChange={handleInputs}
                                            placeholder="Your Name" required={true} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email"><i className="zmdi zmdi-email"></i></label>
                                        <input type="email" name="email" id="email" autoComplete="off"
                                        value={user.email}
                                        onChange={handleInputs}
                                        placeholder="Your Email" required={true} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="phone"><i className="zmdi zmdi-phone-in-talk"></i></label>
                                        <input type="number" name="phone" id="phone" autoComplete="off"
                                        value={user.phone}
                                        onChange={handleInputs}
                                        placeholder="phone" required={true} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="work"><i className="zmdi zmdi-slideshow"></i></label>
                                        <input type="text" name="work" id="work" autoComplete="off"
                                            value={user.work}
                                            onChange={handleInputs}
                                            placeholder="Your Profession" required={true} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="pass"><i className="zmdi zmdi-lock"></i></label>
                                        <input type="password" name="password" id="password" autoComplete="off"
                                            value={user.password}
                                            onChange={handleInputs}
                                            placeholder="Password" required={true} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="re-pass"><i className="zmdi zmdi-lock-outline"></i></label>
                                        <input type="password" name="cpassword" id="cpassword" autoComplete="off"
                                        value={user.cpassword}
                                            onChange={handleInputs}
                                            placeholder="Repeat your password" required={true} />
                                    </div>
                                    <div className="form-group form-button">
                                        <input type="submit" name="signup" id="signup" className="form-submit" value="Register"
                                        onClick={PostData} required={true} />
                                    </div>
                                </form>
                            </div>
                            <div className="signup-image">
                                <figure><img src={signup} alt="signup" /></figure>
                                <NavLink to="/login" className="signup-image-link">I am already member</NavLink>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default Signup
