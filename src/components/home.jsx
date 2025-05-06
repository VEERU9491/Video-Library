import {Link} from "react-router-dom";

export function Home(){
    return(
        <div className="d-flex justify-content-center align-items-center" style={{height:"90vh"}}>
            <Link to="/admin-login" className="btn btn-primary">Admin Login</Link>
            <Link to="/user-login" className="btn btn-warning ms-3">User Login</Link>
        </div>
    )
}