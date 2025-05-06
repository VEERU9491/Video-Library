import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import {  Link, useNavigate, useParams } from "react-router-dom";



export function DeleteVideo(){
 const [videos, setVideos] = useState([{VideoId:0, Title:'', Url:'', Description:'', Likes:0, Dislikes:0, Views:'', Comments:[''], CategoryId:0}])

    let params = useParams();
    let navigate = useNavigate();

    useEffect(()=>{
          
            axios.get(`http://127.0.0.1:5050/get-video/${params.id}`)
            .then(response=>{
                 setVideos(response.data);
                 
            })
    
        },[])

        function DeleteClick(){
            axios.delete(`http://127.0.0.1:5050/delete-video/${params.id}`).then(() => {
                navigate('/admin-dashboard');
            });
        }
    return(
        
        <div className="bg-light p-4 m-4  w-25 d-flex justify-content-center rounded-4">
           <div>
           <h2>Are you want to delete?</h2>
            <dl>
                <dt>Title</dt>
                <dd>{videos[0].Title}</dd>
                <dt>Description</dt>
                <dd>{videos[0].Description}</dd>
            </dl>
            <button className="btn btn-danger me-2" onClick={DeleteClick}>yes</button>
            <Link to="/admin-dashboard" className="btn btn-warning">No</Link>
           </div>
        </div>
    )
}