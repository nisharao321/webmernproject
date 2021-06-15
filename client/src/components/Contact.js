import React, {useEffect, useState} from 'react'
 import { useHistory } from 'react-router-dom';

const Contact = () => {

     const history = useHistory();
    const [userData, setUserData] = useState({ name: "", email:"",phone:"",message:""});

    const userContact = async () => {
        try {
            const res = await fetch('/getdata', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            });

            const data = await res.json();
            console.log(data);

            setUserData({ ...userData, name: data.name, email: data.email, phone:data.phone,message:data.message});
            if (!res.status === 200) {
                const error = new Error(res.error);
                throw error;
            }
        } catch(err) {
           console.log(err);
        }
    }

  

    //we are storing data in states

    const handleInputs = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setUserData({ ...userData, [name]:value });
        
    }

    //send the data to backend

    const contactForm = async(e) => {
        e.preventDefault();

        const { name, email, phone, message } = userData;

        const res = await fetch('/contact', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
            },
            body: JSON.stringify({
                    name,email,phone,message
                })
        });
        
        const data = await res.json();
        
        if (!data) {
            console.log("message not sent");
        } else {
            alert("Message Sent");
            setUserData({ ...userData, message: "" });
                     history.push('/');

        }
    }

    useEffect(() => {
          
        userContact();
    });

    return (
        <>
            <div className="contact-page">
                <div className="contact_info">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-10 offset-lg-1 d-flex justify-content-between">
                                {/* phone number */}
                                <div className="contact_info_item justify-content-start align-item-center">
                                    <img src="https://img.icons8.com/office/24/000000/iphone.png" className="imge" alt="phone" />
                                    <div className="contact_info_content">
                                        <div className="contact_info_title">
                                            Phone
                                    </div>
                                        <div className="contact_info_text">
                                            +91 111 345 4566
                                    </div>
                                    </div>
                                </div>
                                {/* email */}
                                <div className="contact_info_item justify-content-start align-item-center">
                                    <img src="https://img.icons8.com/office/24/000000/email.png" className="imge" alt="email" />
                                    <div className="contact_info_content">
                                        <div className="contact_info_title">
                                            Email
                                    </div>
                                        <div className="contact_info_text">
                                            webdev@gmail.com
                                    </div>
                                    </div>
                                </div>
                                {/* address */}
                                <div className="contact_info_item justify-content-start align-item-center">
                                    <img src="https://img.icons8.com/office/24/000000/address.png" className="imge" alt="Address" />
                                    <div className="contact_info_content">
                                        <div className="contact_info_title">
                                            Address
                                    </div>
                                        <div className="contact_info_text">
                                            Karnataka, India
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* contact us form */}
                <div className="contact_form">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-10 offset-lg-1">
                                <div className="contact_form_container">
                                    <div className="contact_form_title">
                                        <h1>Get in Touch</h1>
                                        <form method="POST" id="contact_form">
                                            <div className="d-flex justify-content-between align-content-between">
                                                <input type="text"
                                                    className="contact_form_ "
                                                   name="name"
                                                    value={userData.name}
                                                   onChange={handleInputs}
                                                    placeholder="Your Name" required={true} />
                                                <input type="email"
                                                    className="contact_form_ "
                                                   name="email"
                                                    value={userData.email}
                                                   onChange={handleInputs}
                                                     placeholder="Your Email" required={true} />
                                                <input type="number"
                                                    className="contact_form_ "
                                                   name="phone"
                                                    value={userData.phone}
                                                  onChange={handleInputs}
                                                     placeholder="Your phone number" required={true} />
                                            </div>
                                            <div className="contact_form_text textfield mt-5">
                                                <textarea className="contact-message text-field"
                                                 name="message"
                                                 value={userData.message}
                                                 onChange={handleInputs}
                                                 placeholder="Message" required={true} id="" cols="30" rows="6"></textarea>
                                            </div>
                                            <div className="contact_form_button mt-4">
                                                <button type="submit" className="button contact_submit_button"
                                                onClick={contactForm}>Send Message</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Contact
