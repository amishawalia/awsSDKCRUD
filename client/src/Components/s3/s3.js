import { Link, Outlet } from "react-router-dom";

const S3 = () => {
    return <>
        <nav className="navbar navbar-expand-lg ">
            <div className="container-fluid">
                <ul className="navbar-nav mr-auto">
                    <li className="navbar-item" style={{marginRight:'1rem',textDecoration:'none'}}>
                        <Link to='createbucket'>Create Buckets</Link>
                    </li>
                    <li className="navbar-item" style={{marginRight:'1rem'}}>
                        <Link to='listbucket'>List Buckets</Link>
                    </li>
                    <Outlet/>
                </ul>
                
            </div>
        </nav>
    </>
};

export default S3;
