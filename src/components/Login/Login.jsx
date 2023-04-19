import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useRef, useState } from 'react';
import app from '../../../vite.config';
import { Link } from 'react-router-dom';

const auth = getAuth(app);

const Login = () => {
    const [error, setError] = useState('')
    const [success, setSuccess] =useState('')
    const emailRef = useRef();

    

    const handleLogin = (event) =>{
        setSuccess('')
        setError('')
        event.preventDefault()
        const form = event.target;
        const email =form.email.value;
        const password = form.password.value;
        console.log(email, password)
        if(!/(?=.*[A-Z].*[A-Z])/.test(password)){
            setError('please enter minimum 2 uppercase')
            return;
        }
         
        else if(!/(?=.*[!@#$&*])/.test(password)){
            setError('please type one special character')
            return;
        }

        signInWithEmailAndPassword(auth, email, password)
        .then(result=>{
            const loggedIn = result.user
            console.log(loggedIn)
            setSuccess('successfully logged in')
            setError('')
        })
        .catch(error => {
            console.log(error.message)
            setError(error.message)
        })
    }

    const handleResetPassword = (event) =>{
        const email = emailRef.current.value
        if(!email){
            alert('please enter your email')
            return;
        }

        sendPasswordResetEmail(auth, email)
        .then( ()=> {
            alert('please check your email')
        })
        .catch(error =>{
            console.log(error)
            setError(error.message)
        })
    }
    return (
        <div>
            <div className="row">
        <div className="col-md-6 offset-md-3 mt-5">
          <form onSubmit={handleLogin}>
            <div className="form-group mb-3">
              <label htmlFor="email">Email address</label>
              <input type="email" className="form-control" id="email" ref={emailRef} name='email' placeholder="Enter email" required/>
            </div>
            <div className="form-group mb-3">
              <label htmlFor="password">Password</label>
              <input type="password" className="form-control" id="password" name='password' placeholder="Password" required/>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
          <p><small>Forget Password? Please <button onClick={handleResetPassword} className='btn btn-link'>Reset password</button></small></p>

          <p><small>Don't have  na account? please <Link to='/register'>Register</Link></small>
          </p>
          <p className='text-success'>{success}</p>
          <p className='text-danger'>{error}</p>
        </div>
      </div>
        </div>
    );
};

export default Login;