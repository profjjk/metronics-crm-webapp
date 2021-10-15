import './App.css';
import { ReactQueryDevtools } from 'react-query/devtools';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { LoginPage, CustomerHome, DashboardHome, InventoryHome, ServiceHome, LandingPage } from '../pages';
import { SideNavbar } from '../components';
import Routes from "./routes";

const queryClient = new QueryClient();

const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <Routes />
            <ReactQueryDevtools/>
        </QueryClientProvider>
    );
};

export default App;
