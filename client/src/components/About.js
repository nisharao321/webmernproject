import React, {useEffect, useState} from 'react'
import { useHistory } from 'react-router-dom';
import about from "../images/about.jpg";

const About = () => {
    const history = useHistory();
    const [userData, setUserData] = useState({});

    const callAboutPage = async () => {
        try {
            const res = await fetch('/about', {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include",
            });

            const data = await res.json();
            console.log(data);

            setUserData(data);
            if (!res.status === 200) {
                const error = new Error(res.error);
                throw error;
            }
        } catch(err) {
           console.log(err);
           history.push('/login');
        }
    }

    useEffect(() => {
        callAboutPage();
    });


    return (
        <>
            <div className="main_">
            <div className="emp">
                <div className="small-middle-container emp_p">
                    <form method="GET">
                        <div className="row">
                            <div className="col-md-3">
                                <img src={about} alt="about" />
                            </div>
                            <div className="col-md-2">
                                <div className="profile-head">
                                    <h5>{userData.name}</h5>
                                    <h6>{userData.work}</h6>
                                    <p className="profile-rating ">RANKINGS:<span>1/10</span></p>


                                </div>
                                {/* <input type="submit" className="profile-eit-btn " name="btnAddmore" value="Edit Profile" /> */}
                            </div>
                            <div className="col-md-7 pl-5">
                                <ul className="nav" role="tablist">
                                    <li className="nav-item">
                                        <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab">About</a>
                                    </li>

                                </ul>

                                {/* <div className="col-md-8 pl-5 about-info"> */}
                                <div className="tab-content profile-tab ml-4" id="myTabContent">
                                    <div className="tab-pane fade show active " id="home" role="tabpanel" aria-labelledby="home-tab">
                                        <div className="row mt-3">
                                            <div className="col-md-6">
                                                <label>User Id</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>{ userData._id}</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Name</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>{userData.name}</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Email</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>{ userData.email}</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Phone</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>{userData.phone}</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Profession</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>{userData.work}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* </div> */}

                            </div>


                           
                        </div>
                    </form>
                </div>
                </div>
                </div>
        </>
    )
}

export default About
