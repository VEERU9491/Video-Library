import { useEffect, useState} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { error } from "ajv/dist/vocabularies/applicator/dependencies";


export function AdminDashboard(){

   const [videos,setVideos]=useState([{videoid:0,Title:'',url:'',Description:'',Likes:0,Dislikes:0,views:0,categoryId:0,Comments:[]}])

   useEffect(()=>{
    axios.get('http://127.0.0.1:5050/get-videos')
    .then(response=>{
        console.log("fetched videos:",response.data)
        setVideos(response.data);
    })
    .catch(error=> console.log(error));
   },[]);

    return(
        <div className="bg-light rounded-4 p-4 mb-5 " >
            <h2>Admin Dashboard</h2>
            <div>
               <Link to="/add-video" className="btn btn-primary bi bi-camera-video">Add Video</Link>
            </div>
            <div style={{ maxHeight: '450px', overflowY: 'auto' }}>
              <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Preview</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        videos.map(video=>
                            <tr key={video.videoid}>
                                <td><b>{video.Title}</b></td>
                                <td>
                                    <iframe src={video.url} width="200px"  height="200px"></iframe>
                                </td>

                                <td>
                                    <Link to={`/edit-video/${video.videoid}`} className="bi bi-pen-fill btn btn-warning me-2 me-2">Edit</Link>
                                    <Link to={`/delete-video/${video.videoid}`} className="bi bi-trash-fill btn btn-danger">Delete</Link>
                                </td>
                            </tr>
                        )
                    }
                </tbody>

              </table>
            </div>
            
        </div>
    )
}