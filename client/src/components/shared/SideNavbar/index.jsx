import { Link, useHistory } from 'react-router-dom';
import { useAuth, useUser } from "../../../hooks";
import './style.css';
import { useState } from "react";

const SideNavbar = () => {
    const { user } = useUser();
    const [isLoggedIn, setIsLoggedIn] = useState(!!user)
    const { logout } = useAuth();
    const history = useHistory();

    const clickHandler = () => {
        if (isLoggedIn) {
            logout();
            setIsLoggedIn(false);
            history.push('/login')
            window.location.reload();
        }
    }


    return (
        <nav className="position-fixed top-0 start-0">
            <h1 className="text-center mt-5">Metronics</h1>
            <ul className="mx-auto">
                <li className="my-5">
                    <Link to={'/dashboard'}>Dashboard</Link>
                </li>
                <li className="my-5">
                    <Link to={'/customers'}>Customers</Link>
                </li>
                <li className="my-5">
                    <Link to={'/service'}>Service Jobs</Link>
                </li>
                <li className="my-5">
                    <Link to={'/inventory'}>Inventory</Link>
                </li>
            </ul>
            {isLoggedIn ? (
                <button
                    className={"btn btn-danger ms-4"}
                    onClick={clickHandler}
                    >Sign Out
                </button>
            ) : (<></>)}
        </nav>
    )
}

export default SideNavbar;