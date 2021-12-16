import { QueryClient } from 'react-query';

const defaultQueryClientOptions = {
    queries: {
        staleTime: 600000,
        cacheTime: 900000,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    },
}

const queryClient = new QueryClient({
    defaultOptions: defaultQueryClientOptions,
});

export default queryClient;
