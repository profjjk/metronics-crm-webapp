import "./App.css";
import { CustomerPage, HomePage, InventoryPage, ServicePage } from "./pages";
import { SideNavbar } from "./components";
import { ReactQueryDevtools } from "react-query/devtools";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const queryClient = new QueryClient();

const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <Router>
                <SideNavbar />
                <Switch>
                    <Route exact path="/" component={HomePage} />
                    <Route exact path="/customers" component={CustomerPage} />
                    <Route exact path="/service" component={ServicePage} />
                    <Route exact path="/inventory" component={InventoryPage} />
                </Switch>
            </Router>
            <ReactQueryDevtools />
        </QueryClientProvider>
    );
};

export default App;
