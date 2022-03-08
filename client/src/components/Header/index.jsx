import { Link, useRouteMatch } from 'react-router-dom';
import './style.scss';

const Header = ({ pageTitle, links }) => {
	const { url } = useRouteMatch();

	return (
		<div className={'main-header'}>
			<h1>
				<Link className={'page-title'} to={links[0].path}>
					{pageTitle}
				</Link>
			</h1>

			<div className={'button-area'}>
				{links.map(link => (
					<Link key={link.name} className={'section-link'} to={link.path}>
						{link.name}
					</Link>
				))}
			</div>
		</div>
	)
}

export default Header;
