import { LoginPage, CustomerHome, DashboardHome, InventoryHome, ServiceHome, LandingPage } from "../pages";
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import { SideNavbar } from "../components";

const PrivateRoutes = () => {
    return (
        <Router>
            <SideNavbar />
            <Switch>
                <Route exact path="/dashboard" component={DashboardHome}/>
                <Route exact path="/customers" component={CustomerHome}/>
                <Route exact path="/service" component={ServiceHome}/>
                <Route exact path="/inventory" component={InventoryHome}/>
            </Switch>
        </Router>
    )
}

const PublicRoutes = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={LandingPage}/>
                <Route exact path="/login" component={LoginPage}/>
            </Switch>
        </Router>
    )
}

export {
    PrivateRoutes,
    PublicRoutes
}