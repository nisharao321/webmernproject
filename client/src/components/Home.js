import React, {useEffect, useState} from 'react'

const Home = () => {

    const [userName, setUserName] = useState();
    const [show, setShow] = useState(false);


    const userHome = async () => {
        try {
            const res = await fetch('/getdata', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
                // credentials: "include",
            });

            const data = await res.json();
           // console.log(data);

            setUserName(data.name);
            setShow(true);
            // if (!res.status === 200) {
            //     const error = new Error(res.error);
            //     throw error;
            // }
        } catch(err) {
           console.log(err);
        //    history.push('/login');
        }
    }

    useEffect(() => {
        userHome();
    });

    return (
        <>
            <div className="home-page">
                <p className="home-div">WELCOME</p>
                <h2>{show ? userName:'Hello'}</h2>
                    <h1>{show ? 'Happy, to see you back':'We Are The MERN Developer'}</h1>
            </div>

        </>
    )
}

export default Home
