import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { data, Link, useNavigate, useParams } from "react-router-dom";

export function EditVideo() {
    const navigate = useNavigate();
    const [videos,setVideos]=useState([{videoid:0,Title:'',url:'',Description:'',Likes:0,Dislikes:0,views:0,categoryId:0,Comments:[]}])

    const [categories, setCategories] = useState([{ categoryId: 0, categoryName: '' }]);
    const params=useParams();

    function Loadcategories(){
        axios.get("http://127.0.0.1:5050/get-categories")
            .then(response => {
               
                response.data.unshift({ categoryId: -1, categoryName: "Select a Category" });
                setCategories(response.data);
            });
        }

    const formik = useFormik({
        initialValues: {
            videoid: videos[0].videoid,
            Title: videos[0].Title,
            url: videos[0].url,
            Description:videos[0].Description ,
            Likes: videos[0].Likes,
            Dislikes: videos[0].Dislikes,
            views:videos[0].views,
            categoryId: videos[0].categoryId,
            Comments: videos[0].Comments
        },
        onSubmit: (values) => {
            axios.post(`http://127.0.0.1:5050/edit-video/${params.id}`, values)
          
                alert("video edited successfully...");
                navigate(`/admin-dashboard`);

        },
        enableReinitialize:true
    });
    useEffect(()=>{
        Loadcategories();
        axios.get(`http://127.0.0.1:5050/get-video/${params.id}`)
        .then(response=>{
            setVideos(response.data);
            console.log(response.data)
            
        })
    },[])

    return (
        <div className="bg-light p-4 w-50 ms-5 rounded-4">
            <h2>Edit Video</h2>
            <form onSubmit={formik.handleSubmit} className="overflow-auto" style={{ height: "400px" }}>
                <dl>
                    <dt>Video ID</dt>
                    <dd><input type="number" className="form-control" name="videoid" onChange={formik.handleChange} value={formik.values.videoid} /></dd>

                    <dt>Title</dt>
                    <dd><input type="text" className="form-control" name="Title" onChange={formik.handleChange} value={formik.values.Title}/></dd>

                    <dt>URL</dt>
                    <dd><input type="text" className="form-control" name="url" onChange={formik.handleChange} value={formik.values.url}/></dd>

                    <dt>Description</dt>
                    <dd><textarea className="form-control" name="Description" onChange={formik.handleChange} value={formik.values.Description}></textarea></dd>

                    <dt>Likes</dt>
                    <dd><input type="number" className="form-control" name="Likes" onChange={formik.handleChange} value={formik.values.Likes}/></dd>

                    <dt>Dislikes</dt>
                    <dd><input type="number" className="form-control" name="Dislikes" onChange={formik.handleChange} value={formik.values.Dislikes}/></dd>

                    <dt>views</dt>
                    <dd><input type="number" className="form-control" name="views" onChange={formik.handleChange} value={formik.values.views}/></dd>

                    <dt>Category</dt>
                    <dd>
                        <select className="form-select" name="categoryId" onChange={formik.handleChange} value={formik.values.categoryId}>
                            {
                                categories.map(category =>
                                    <option key={category.categoryId} value={category.categoryId}>
                                        {category.categoryName}
                                    </option>
                                )
                            }
                        </select>
                    </dd>

                    <dt>Comments</dt>
                    <dd>
                        <textarea className="form-control" name="Comments" rows="4" onChange={formik.handleChange} value={formik.values.Comments}></textarea>
                    </dd>
                </dl>
                <button type="submit" className="btn btn-success me-2">Save</button>
                <Link to="/admin-dashboard" className="btn btn-danger">Cancel</Link>
            </form>
        </div>
    );
}
