import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export function AddVideo() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([{ categoryId: 0, categoryName: '' }]);

  // Fetch categories from backend
  useEffect(() => {
    axios.get("http://127.0.0.1:5050/get-categories")
      .then(response => {
        const data = response.data;
        data.unshift({ categoryId: 0, categoryName: "Select a Category" });
        setCategories(data);
      });
  }, []);

  // Formik setup
  const formik = useFormik({
    initialValues: {
      videoid: 0,
      Title: '',
      url: '',
      Description: '',
      Likes: 0,
      Dislikes: 0,
      views: 0,
      CategoryId: 0,
      Comments: ''
    },
    onSubmit: (values) => {
      // Wrap Comments in an array
      values.Comments = [values.Comments];

      axios.post("http://127.0.0.1:5050/add-video", values)
        .then(() => {
          alert("Video added successfully.");
          navigate("/admin-dashboard");
        });
    }
  });

  return (
    <div className="bg-light p-4 w-50 ms-5 rounded-4">
      <h2>Add Video</h2>
      <form onSubmit={formik.handleSubmit} className="overflow-auto" style={{ height: "400px" }}>
        <dl>
          <dt>Video ID</dt>
          <dd><input type="number" className="form-control" name="videoid" onChange={formik.handleChange} /></dd>

          <dt>Title</dt>
          <dd><input type="text" className="form-control" name="Title" onChange={formik.handleChange} /></dd>

          <dt>URL</dt>
          <dd><input type="text" className="form-control" name="url" onChange={formik.handleChange} /></dd>

          <dt>Description</dt>
          <dd><textarea className="form-control" name="Description" onChange={formik.handleChange}></textarea></dd>

          <dt>Likes</dt>
          <dd><input type="number" className="form-control" name="Likes" onChange={formik.handleChange} /></dd>

          <dt>Dislikes</dt>
          <dd><input type="number" className="form-control" name="Dislikes" onChange={formik.handleChange} /></dd>

          <dt>views</dt>
          <dd><input type="number" className="form-control" name="views" onChange={formik.handleChange} /></dd>

          <dt>Category</dt>
          <dd>
            <select className="form-select" name="CategoryId" onChange={formik.handleChange}>
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
            <textarea className="form-control" name="Comments" rows="4" onChange={formik.handleChange}></textarea>
          </dd>
        </dl>

        <button type="submit" className="btn btn-success me-2">Add Video</button>
        <Link to="/admin-dashboard" className="btn btn-danger">Cancel</Link>
      </form>
    </div>
  );
}
