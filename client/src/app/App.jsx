import { ReactQueryDevtools } from 'react-query/devtools';
import { QueryClientProvider } from 'react-query';
import { queryClient } from '../react-query';
import { Toast } from '../components';
import Routes from "./routes";
import './style/main.scss';

const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <Routes />
            <Toast />
            <ReactQueryDevtools/>
        </QueryClientProvider>
    );
};

export default App;
