import { Link, useHistory } from 'react-router-dom';
import { useAuth, useUser } from "../../../hooks";
import { useState, useEffect } from "react";
import ReactTooltip from 'react-tooltip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUserFriends, faTools, faWarehouse, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import './navbar.scss';

const SideNavbar = () => {
    const { user } = useUser();
    const [isLoggedIn, setIsLoggedIn] = useState(!!user)
    const { logout } = useAuth();
    const history = useHistory();

    const logOut = () => {
        if (isLoggedIn) {
            logout();
            setIsLoggedIn(false);
            history.push('/login')
            window.location.reload();
        }
    }

    useEffect(() => {
        const links = document.getElementsByClassName('nav-item');
        for (let link of links) {
            link.children[0].classList.remove('active');
        }

        const page = window.location.pathname;
        switch (page) {
            case '/dashboard':
                links[0].children[0].classList.add('active');
                break;
            case '/customers':
                links[1].children[0].classList.add('active');
                break;
            case '/service':
                links[2].children[0].classList.add('active');
                break;
            case '/inventory':
                links[3].children[0].classList.add('active');
                break;
        }
    })

    return (
        <nav className="navbar">
            <ul>
                <li className="nav-item">
                    <Link to={'/dashboard'}>
                        <FontAwesomeIcon icon={faHome} data-tip data-for='dashboard' />
                        <ReactTooltip id={"dashboard"} effect={"solid"}>
                            <span>Dashboard</span>
                        </ReactTooltip>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to={'/customers'}>
                        <FontAwesomeIcon icon={faUserFriends} data-tip data-for='customers' />
                        <ReactTooltip id={"customers"} effect={"solid"}>
                            <span>Customers</span>
                        </ReactTooltip>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to={'/service'}>
                        <FontAwesomeIcon icon={faTools} data-tip data-for='service' />
                        <ReactTooltip id={"service"} effect={"solid"}>
                            <span>Service Jobs</span>
                        </ReactTooltip>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to={'/inventory'} >
                        <FontAwesomeIcon icon={faWarehouse} data-tip data-for='inventory' />
                        <ReactTooltip id={"inventory"} effect={"solid"} place={"right"}>
                            <span>Inventory</span>
                        </ReactTooltip>
                    </Link>
                </li>
            </ul>
            {isLoggedIn ? (
                <button
                    className={"btn-signOut"}
                    onClick={logOut}>
                    <FontAwesomeIcon icon={faSignOutAlt} data-tip data-for='sign-out'/>
                    <ReactTooltip id={"sign-out"} effect={"solid"} place={"right"} type={"error"}>
                        <span>Sign Out</span>
                    </ReactTooltip>
                </button>
            ) : (<></>)}
        </nav>
    )
}

export default SideNavbar;