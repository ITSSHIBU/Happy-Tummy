import React,{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'

export default function Login() {
let navigate = useNavigate()
  const [credentials,setcredentials] = useState({emial:"",password:""})

    const handleSubmit = async (e) =>{
        e.preventDefault();
        const response = await fetch('http://localhost:4000/api/loginuser',{
            method: 'POST',
            headers:{
                'Content-Type' : 'application/json'
            },
            body:JSON.stringify({email:credentials.email,password:credentials.password})
        })
        const json = await response.json()
        console.log(json);
        if (!json.success){
            alert('Please enter valid credentials')
        }
        if(json.success){
          localStorage.setItem('userEmail', credentials.email)
          localStorage.setItem('authToken',json.authToken);
          console.log(localStorage.getItem('authToken'))
          navigate('/')
        }
    }
    const onChange = (event) =>{
        setcredentials ({...credentials,[event.target.name]:event.target.value})
    }

  return (
    <div style={{ backgroundImage: 'url("https://images.pexels.com/photos/1565982/pexels-photo-1565982.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")', backgroundSize: 'cover', height: '100vh' }}>
       <div>
        <Navbar />
      </div>
    <div className='container'>
    <form className='w-50 m-auto mt-2 border bg-dark border-success rounded' onSubmit={handleSubmit}>
  <div className="m-3">
    <label htmlFor="exampleInputEmail1" className="form-text">Email address</label>
    <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange} id="exampleInputEmail1" aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="m-3">
    <label htmlFor="exampleInputPassword1" className="form-text">Password</label>
    <input type="password" className="form-control" name='password' value={credentials.password} onChange={onChange} id="exampleInputPassword1"/>
  </div>
  <button type="submit" className="m-3 btn btn-success">Submit</button>
  <Link to='/createuser' className='m-3 btn btn-danger'>Signup</Link>
</form>
</div>
    </div>
  )
}
