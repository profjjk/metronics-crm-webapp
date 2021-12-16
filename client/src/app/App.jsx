import { ReactQueryDevtools } from 'react-query/devtools';
import { QueryClientProvider } from 'react-query';
import { queryClient } from '../hooks';
import Routes from "./routes";
import './main.scss';

const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <Routes />
            <ReactQueryDevtools/>
        </QueryClientProvider>
    );
};

export default App;
