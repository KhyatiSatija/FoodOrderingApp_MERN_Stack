import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
export default function Signup() {
    // create a state now
    const [credentials, setCredentials] = useState({name: '', email: '', password: '', geolocation: ''})
    //we have to set an onChangeEventListener to each input field to change these static values declared above.
    let navigate = useNavigate()

    // synthetic event - preventDefault
    const handleSubmit = async(e) => {
        e.preventDefault();
        const response =  await fetch('http://localhost:5000/api/createuser', {
            method: 'POST', 
            headers: {
                'Content-Type' : 'application/json'
            },
            body:JSON.stringify({
                name: credentials.name, 
                email: credentials.email, 
                password: credentials.password, 
                location: credentials.geolocation
            })
        });
        const json = await response.json()
        console.log(json);

        if(!json.success){
            alert("Enter Valid Credentials!!")
        }
        if (json.success) {
            //save the auth toke to local storage and redirect
            localStorage.setItem('token', json.authToken)
            navigate("/login")
      
          }

    }
    const onChange =(event) =>{
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
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control"  name='name' value={credentials.name} onChange={onChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' value={credentials.email} onChange={onChange}/>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
               
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control"  name='password' value={credentials.password} onChange={onChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="geolocation" className="form-label">Address</label>
                    <input type="text" className="form-control"  name='geolocation' value={credentials.geolocation} onChange={onChange} />
            
                </div>
                {/* <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                        <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                </div> */}
                <button type="submit" className="btn btn-success">SignIn</button>
                <Link to='/login' className='m-3 btn btn-danger'>I am Already a User</Link>
            </form>
            </div>
        </div>
    )
}
