import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
// useNavigate is used to redirect from one screen to another
export default function Login() {
  // create a state now
  const [credentials, setCredentials] = useState({ email: '', password: '' })
  //we have to set an onChangeEventListener to each input field to change these static values declared above.


  let navigate = useNavigate()
  // synthetic event - preventDefault
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/api/loginuser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      })
    });
    const json = await response.json()
    console.log(json);

    if (json.success) {
      //save the auth toke to local storage and redirect to the root (home screen)
      localStorage.setItem("authToken", json.authToken);
      // save the email too so that the order history of each user can be sent to backend
      localStorage.setItem('userEmail', credentials.email);
      console.log(localStorage.getItem("authToken"))
      navigate("/");
      
    }
    if(!json.success){
      alert("Enter Valid Credentials!!")
    }
  }
  const onChange = (event) => {
    setCredentials({
      ...credentials, [event.target.name]: event.target.value
    })
  }
  return (
    <div>
      {/* container classname gives a  mobile first approach */}
      <div className='container'>

        {/* whenever a user triggers this onSubmit event- > we want the request to hit the end point created on the backend that stores the data to the mongoDB database */}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control"  aria-describedby="emailHelp" name='email' value={credentials.email} onChange={onChange} />
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control"  name='password' value={credentials.password} onChange={onChange} />
          </div>
          <button type="submit" className="btn btn-success">LogIn</button>
          <Link to='/createuser' className='m-3 btn btn-danger'>I am a new User</Link>
        </form>
      </div>
    </div>
  )
}
