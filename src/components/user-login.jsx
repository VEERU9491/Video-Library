import axios from "axios";
import { useFormik } from "formik";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";

export function UserLogin() {
  let navigate = useNavigate();
const [cookie,setCookie,removeCookie]=useCookies(['usename']);

  const formik = useFormik({
    initialValues: {
      UserName: '',
      Password: ''
    },
    onSubmit: (user) => {
      axios.get("http://127.0.0.1:5050/get-users").then(response => {
        const matchedUser = response.data.find(item => item.UserName === user.UserName);

        if (matchedUser) {
          if (matchedUser.Password === user.Password) {
            setCookie('username',matchedUser.UserName)
            navigate("/user-dashboard");
          } else {
            alert("Invalid Password");
          }
        } else {
          alert("Invalid UserName");
        }
      }).catch(error => {
        console.error("Error fetching users:", error);
        alert("Something went wrong. Please try again later.");
      });
    }
  });

  return (
    <div className="d-flex justify-content-center">
      <div className="bg-light p-4 m-4 w-25 text-center rounded-3">
        <form onSubmit={formik.handleSubmit}>
          <h3>User Login</h3>
          <dl>
            <dt>UserId</dt>
            <dd>
              <input type="text" className="form-control" name="UserName" onChange={formik.handleChange} />
            </dd>
            <dt>Password</dt>
            <dd>
              <input type="password" className="form-control" name="Password" onChange={formik.handleChange} />
            </dd>
          </dl>
         <button className="btn btn-warning">Login</button>
          <Link to="/register-user" className="btn btn-primary ms-2">New user</Link>
        </form>
      </div>
    </div>
  );
}
