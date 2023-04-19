import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, updateProfile } from 'firebase/auth';
import React, { useState } from 'react';
import app from '../../../vite.config';
import { Link } from 'react-router-dom';
const auth = getAuth(app)
const Register = () => {
   
    const [email, setEmail] = useState('')
    const [password, setPassword] =useState('')
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('')

    const handleSubmit = (event) => {
        setSuccess('')
        setError('')
        event.preventDefault();
        const email =event.target.email.value;
        const password =event.target.password. value;
        const name = event.target.name.value;
        console.log(name, email, password)
        if(!/(?=.*[A-Z])/.test(password)){
            setError('please enter at least 1 uppercase')
            return;
        }
        else if(!/(?=.*[0-9].*[0-9])/.test(password)){
            setError('enter minimum 2 digit')
            return;
        }
        else if (password.length < 8){
            setError('required 8 ')
            return;
        }
        createUserWithEmailAndPassword(auth, email, password)
        .then(userCredential =>{
            const registerUser = userCredential.user
            console.log(registerUser)
            setError('')
            event.target.reset;
            setSuccess('successfully registered')
            sendVerificationEmail(userCredential.user)
            updateProfileName(userCredential.user, name)

            
        })
        .catch(error =>{
            console.log(error.message)
            setError(error.message)
        })
    }

    const sendVerificationEmail = (user) =>{
        sendEmailVerification(user)
        .then(result =>{
            console.log(result)
            alert('please verify your email')
        })
    }
    const updateProfileName = (user, name) =>{
        updateProfile(user, {
            displayName: name
        } )
        .then(() => {
            console.log('profile updated')
        })
        .catch(error => {
            setError(error.message)
        })
    }
    //     const handleEmailChange = (event)=> {
    //     console.log(event.target.value)
      
    // }
 
    //     const handlePasswordBlur = (event)=>{
    //         console.log(event.target.value)
            

    return (
        <div className='w-50 mx-auto'>
            <h2 className='text-primary w-50 mx-auto'>Register</h2>
            <form className='w-50 mx-auto' onSubmit={handleSubmit}>
                <input className='mt-3' type="text" name="name" id="name" placeholder='your name' required/>
                <br />
                <input className='mt-3' type="email" name="email" id="email" placeholder='your email' required/>
                <br />
                <input className='mt-3'   type="password" name="password" id="password" placeholder='your password' required/>
                <br />
                <input className='mt-3' type="submit" value="Register" />
            </form>
            <p><small>Already have an account? please <Link to='/login'>Login</Link> </small></p>
            <p className='text-danger'>{error}</p>
            <p className='text-success'>{success}</p>
        </div>
    );
};


export default Register;