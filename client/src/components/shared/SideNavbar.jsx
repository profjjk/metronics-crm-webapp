import { Link } from 'react-router-dom';

const SideNavbar = () => {
  return (
    <nav className="position-fixed top-0 start-0">
      <h1 className="text-center mt-5">Metronics</h1>
      <ul className="mx-auto">
        <li className="my-5">
          <Link to={'/'}>Dashboard</Link>
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
    </nav>
  )
}

export default SideNavbar;