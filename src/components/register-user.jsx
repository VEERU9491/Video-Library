import axios from "axios";
import { useFormik } from "formik";
import {  Link, useNavigate } from "react-router-dom";



export function RegisterUser(){

const navigate=useNavigate()

     const formik=useFormik({
        initialValues:{
            UserId:'',
            UserName:'',
            Password:'',
            Mobile:'',
            Email:''
        },
        onSubmit:(user)=>{
            axios.post("http://127.0.0.1:5050/register-users",user);
            alert('registered successfully...');
            navigate('/user-login');


        }
           
        
     })
    
     


    return(
        <div className="bg-light p-4 m-4 rounded-5 ">
            <h2 className="text-center">Register for New User</h2>
            <div>
                <form className="w-25 ms-4" onSubmit={formik.handleSubmit}>
                    <dl>
                        <dt>UserId</dt>
                        <dd><input type="text" name="UserId" className="form-control" onChange={formik.handleChange} /></dd>
                    </dl>
                    <dl>
                        <dt>UserName</dt>
                        <dd><input type="text" name="UserName" className="form-control" onChange={formik.handleChange}/></dd>
                    </dl>
                    <dl>
                        <dt>Password</dt>
                        <dd><input type="password" name="Password" className="form-control" onChange={formik.handleChange}/></dd>
                    </dl>
                    <dl>
                        <dt>Mobile</dt>
                        <dd><input type="text" name="Mobile" className="form-control" onChange={formik.handleChange} /></dd>
                    </dl>
                    <dl>
                        <dt>Email</dt>
                        <dd><input type="text" name="Email" className="form-control" onChange={formik.handleChange}/></dd>
                    </dl>
                    <button className="btn btn-success w-100">Register</button>
                </form>
            </div>
          
            <div>
            <Link to="/user-login" className="btn btn-link ms-4">Back to login</Link>
            </div>
        </div>
    )
}