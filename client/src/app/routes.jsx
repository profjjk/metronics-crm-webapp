import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Customers, Dashboard, Inventory, Login, Register, Service, NotFoundPage } from "../pages";
import { SideNavbar, Toast } from '../components';

const Routes = () => {
    return (
        <Router>
            <Switch>
                <Route path='/' component={Login}/>
                <Route path='/login' component={Login}/>
                <>
                    <SideNavbar />
                    <Route path='/register' component={Register}/>
                    <Route path='/dashboard' component={Dashboard}/>
                    <Route path='/customers' component={Customers}/>
                    <Route path='/service' component={Service}/>
                    <Route path='/inventory' component={Inventory}/>
                </>
                <Route path='' component={NotFoundPage}/>
            </Switch>
        </Router>
    );
}

export default Routes;
