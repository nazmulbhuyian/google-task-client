import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider/AuthProvider';

const Google = () => {

    const { googleSignIn } = useContext(AuthContext);

    const navigate = useNavigate();


    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(result => {
                const user = result.user;
                // console.log(user)
                // saveUser(user.email)
            })
            .then(err => console.error(err))

    }

    // const saveUser = (email) => {
    //     const user = { email };
    //     fetch('https://kacha-bazar-server.vercel.app/user', {
    //         method: 'POST',
    //         headers: {
    //             'content-type': 'application/json'
    //         },
    //         body: JSON.stringify(user)
    //     })
    //         .then(res => res.json())
    //         .then(data => {
    //             console.log(data);
    //             if (data.acknowledged === true) {
    //                 toast.success('Successfull')
    // navigate('/')
    //             }
    //         })
    // }

    return (
        <div>
            <p className='text-center'><small>Social Login</small></p>
            <p className='text-center'>
                <button onClick={handleGoogleSignIn} className='btn btn-ghost'>Google</button>
            </p>
        </div>
    );
};

export default Google;