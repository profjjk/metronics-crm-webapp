import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {SideNavbar} from "../components";
import {CustomerHome, DashboardHome, InventoryHome, LandingPage, LoginPage, ServiceHome} from "../pages";

const Routes = () => {
    return (
        <Router>
            <SideNavbar />
            <Switch>
                <Route exact path='/' component={LandingPage}/>
                <Route exact path='/login' component={LoginPage}/>
                <Route exact path='/dashboard' component={DashboardHome}/>
                <Route exact path='/customers' component={CustomerHome}/>
                <Route exact path='/service' component={ServiceHome}/> 
                <Route exact path='/inventory' component={InventoryHome}/>
            </Switch>
        </Router>
    );
}

export default Routes;
