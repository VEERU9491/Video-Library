import { Link, useNavigate } from "react-router-dom";
import { Formik, useFormik } from "formik";
import axios from "axios";



export function AdminLogin(){

let navigate=useNavigate()

const formik=useFormik({
    initialValues:{
        userId:'',
        password:''
    },
    onSubmit:(admin)=>{

        axios.get('http://127.0.0.1:5050/get-admin')
        .then(response=>{
            var user=response.data.find(item=>item.userId===admin.userId);
            if(user){
                if(admin.password===user.password){

                    navigate("/admin-dashboard");

                }else{
                    alert(`invalid password`);
                }
            }else{
                alert(`invalid userId`);
            }
        })
        
    }
})

    return(
        <div className="d-flex justify-content-center">
            <div className="bg-light p-4 m-4 w-25 text-center rounded-3">
           
           <form onSubmit={formik.handleSubmit}>
           <h3>Admin Login</h3>
               <dl>
                   <dt>Admin Id</dt>
                   <dd><input type="text"  className="form-control"name="userId" onChange={formik.handleChange}/></dd>
                   <dt>Password</dt>
                   <dd><input type="text" className="form-control" name="password" onChange={formik.handleChange} /></dd>
               </dl>
               <button className="btn btn-primary">Login</button>
               <Link to="/" className="btn btn-danger ms-2">cancel</Link>
           </form>
       </div>
        </div>
    )
}