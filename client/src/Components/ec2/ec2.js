import { Link, Outlet } from "react-router-dom";

const EC2 = () => {
    return <>
        <nav className="navbar navbar-expand-lg ">
            <div className="container-fluid">
                <ul className="navbar-nav mr-auto">
                    <li className="navbar-item" style={{marginRight:'1rem',textDecoration:'none'}}>
                        <Link to='createinstance'>Create Instance</Link>
                    </li>
                    <li className="navbar-item" style={{marginRight:'1rem'}}>
                        <Link to='listinstance'>List Instances</Link>
                    </li>
                    <Outlet/>
                </ul>
                
            </div>
        </nav>
    </>
};

export default EC2;
