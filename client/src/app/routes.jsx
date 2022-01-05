import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Customers, Dashboard, Inventory, Login, Register, Service } from "../pages";

const Routes = () => {
    return (
        <Router>
            <Switch>
                <Route exact path='/' component={Login}/>
                <Route exact path='/login' component={Login}/>
                <Route exact path='/register' component={Register}/>
                <Route exact path='/dashboard' component={Dashboard}/>
                {/*<Route exact path='/messages' component={Messages}/>*/}
                <Route exact path='/customers' component={Customers}/>
                <Route exact path='/service' component={Service}/>
                <Route exact path='/inventory' component={Inventory}/>
            </Switch>
        </Router>
    );
}

export default Routes;
