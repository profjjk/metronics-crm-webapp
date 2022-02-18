import { BrowserRouter as Router, Route, Switch, useRouteMatch } from "react-router-dom";
import { Customers, Dashboard, Inventory, Login, Register, Service, NotFoundPage } from "../pages";
import { ServiceForm } from '../pages/Service/sections';
import { SideNavbar } from '../components';

const routes = [
    { path: ['/', '/login'], component: Login },
    { path: '/register', component: Register },
    { path: '/dashboard', component: Dashboard },
    { path: '/customers', component: Customers },
    { path: '/service', component: Service, routes: [
            { path: '/service/form', component: ServiceForm }
        ]},
    { path: '/inventory', component: Inventory }
];

const NewRoutes = () => {
    return (
        <Router>
            <Switch>
                {routes.map(route => (
                    <Route
                        path={route.path}
                        // exact={route.exact}
                        component={route.component}
                    />
                ))}
            </Switch>
        </Router>
    )
}

const Routes = () => {
    return (
        <Router>
            <Switch>
                <Route exact path='/' component={Login}/>
                <Route exact path='/login' component={Login}/>
                <>
                    <SideNavbar />
                    <Route exact path='/register' component={Register}/>
                    <Route exact path='/dashboard' component={Dashboard}/>
                    <Route exact path='/customers' component={Customers}/>
                    <Route exact path='/service' component={Service}/>
                    <Route exact path='/inventory' component={Inventory}/>
                </>
            </Switch>
        </Router>
    );
}

export default Routes;
