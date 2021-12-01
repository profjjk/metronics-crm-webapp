import './App.scss';
import { ReactQueryDevtools } from 'react-query/devtools';
import { QueryClient, QueryClientProvider } from 'react-query';
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
