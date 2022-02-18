import { Link } from 'react-router-dom';
import { useAuth } from '../../react-query';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUserFriends, faTools, faWarehouse, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import './style.scss';

const SideNavbar = () => {
	const { logout } = useAuth();

	const setActiveLink = e => {
		e.preventDefault();

		const links = document.querySelectorAll('svg')
		for (let link of links) {
			link.classList.remove('active');
		}

		e.currentTarget.children[0].children[0].classList.add('active');
	}

	const links = [
		{ path: '/dashboard', icon: faHome },
		{ path: '/customers', icon: faUserFriends },
		{ path: '/service', icon: faTools },
		{ path: '/inventory', icon: faWarehouse }
	]

	return (
		<header>
			<nav className={'navbar'}>
				<ul>
					{links.map(({ path, icon }) => (
						<li key={path} onClick={setActiveLink}>
							<Link className={'nav-item'} to={path}>
								<FontAwesomeIcon icon={icon}/>
							</Link>
						</li>
					))}

					<li onClick={logout}>
						<Link className={'nav-item signOut'} to={'/login'}>
							<FontAwesomeIcon icon={faSignOutAlt}/>
						</Link>
					</li>
				</ul>
			</nav>
		</header>
	)
}

export default SideNavbar;