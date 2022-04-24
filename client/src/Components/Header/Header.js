import { Link } from "react-router-dom"
import './Header.css'
const Header = () => {
    return <>
        <nav className="navbar navbar-expand-lg bg-light">
            <div className="container-fluid">
                <Link to='/'>AWS SDK APP</Link>
                <ul className="navbar-nav mr-auto">
                    <li className="navbar-item" style={{marginRight:'1rem',textDecoration:'none'}}>
                        <Link to='/s3'>S3 Buckets</Link>
                    </li>
                    <li className="navbar-item" style={{marginRight:'1rem'}}>
                        <Link to='/ec2'>EC2 Instances</Link>
                    </li>
                    
                </ul>
                
            </div>
        </nav>
    </>
}
export default Header;

