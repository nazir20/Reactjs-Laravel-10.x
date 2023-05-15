import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import axiosClient from '../axios-client';
import { useStateContext } from '../Contexts/ContextProvider';

export default function Signup() {

    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmationRef = useRef();
    const {setUser, setToken} = useStateContext();
    const [errors, setErrors] = useState(null);

    const onSubmit = (e)=>{

        e.preventDefault();

        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value
        }
        console.log(payload);
        axiosClient.post('/signup', payload)
            .then(({data})=>{
                setUser(data.user)
                setToken(data.token);
                console.log('hello');
            })
            .catch(err=>{
                const response = err.response;
                if(response && response.status === 422){
                    console.log(response.data.errors);
                    setErrors(response.data.errors);
                }
            })
        

    }
    return (
        <>
            <form onSubmit={onSubmit}>
                <h1 className='title'>Signup for free</h1>
                {errors && 
                <div>
                    {Object.keys(errors).map(key=>{
                        return (
                            <div key={key} className='alert'>
                                <p>{errors[key][0]}</p>
                            </div>
                        )
                    })}
                </div>}
                <input ref={nameRef} type="text" placeholder='Full Name' />
                <input ref={emailRef} type="email" placeholder='Email Address' />
                <input ref={passwordRef} type="password" placeholder='Password'/>
                <input ref={passwordConfirmationRef} type="password" placeholder='Password Confirmation'/>
                <button className='btn btn-block'>Signup</button>
                <p className='message'>
                    Already Registered? <Link to={'/login'}>Sign In</Link>
                </p>
            </form>
        </>
    )
}
