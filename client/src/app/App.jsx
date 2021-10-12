import "./App.css";
import { ReactQueryDevtools } from "react-query/devtools";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { LoginPage, CustomerHome, DashboardHome, InventoryHome, ServiceHome, LandingPage } from "../pages";
import {SideNavbar} from "../components";

const queryClient = new QueryClient();

const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <Router>
                <SideNavbar />
                <Switch>
                    <Route exact path="/" component={LandingPage}/>
                    <Route exact path="/login" component={LoginPage}/>
                    <Route exact path="/dashboard" component={DashboardHome}/>
                    <Route exact path="/customers" component={CustomerHome}/>
                    <Route exact path="/service" component={ServiceHome}/>
                    <Route exact path="/inventory" component={InventoryHome}/>
                </Switch>
            </Router>
            <ReactQueryDevtools/>
        </QueryClientProvider>
    );
};

export default App;
