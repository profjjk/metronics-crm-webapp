import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from "../../react-query";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUserFriends, faTools, faWarehouse, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import './style.scss';

const SideNavbar = () => {
    const { logout } = useAuth();
    const history = useHistory();
    const [page, setPage] = useState("");

    useEffect(() => {
        const path = window.location.pathname;
        setPage(path)
    }, []);

    useEffect(() => {
        const links = document.querySelectorAll('svg')
        for (let link of links) {
            link.classList.remove('active');
        }

        switch (page) {
            case '/dashboard':
                links[0].classList.add('active');
                break;
            case '/customers':
                links[1].classList.add('active');
                break;
            case '/service':
                links[2].classList.add('active');
                break;
            case '/inventory':
                links[3].classList.add('active');
                break;
        }
    }, [page]);

    // EVENT LISTENERS
    const signOut = () => {
        logout();
        history.push('/login');
        window.location.reload();
    }

    return (
        <header>
            <nav className={"navbar"}>
                <ul>
                    <li className={"nav-item"} onClick={() => {
                        setPage('/dashboard');
                        history.push('/dashboard');
                    }}>
                        <FontAwesomeIcon icon={faHome}/>
                    </li>

                    <li className={"nav-item"} onClick={() => {
                        setPage('/customers');
                        history.push('/customers');
                    }}>
                        <FontAwesomeIcon icon={faUserFriends}/>
                    </li>

                    <li className={"nav-item"} onClick={() => {
                        setPage('/service');
                        history.push('/service');
                    }}>
                        <FontAwesomeIcon icon={faTools}/>
                    </li>

                    <li className={"nav-item"} onClick={() => {
                        setPage('/inventory');
                        history.push('/inventory');
                    }}>
                        <FontAwesomeIcon icon={faWarehouse}/>
                    </li>
                </ul>

                <button className={"signOut"} onClick={signOut}>
                    <FontAwesomeIcon icon={faSignOutAlt}/>
                </button>
            </nav>
        </header>
    )
}

export default SideNavbar;