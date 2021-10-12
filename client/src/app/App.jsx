import "./App.css";
import { ReactQueryDevtools } from "react-query/devtools";
import { QueryClient, QueryClientProvider } from "react-query";
import { PrivateRoutes, PublicRoutes } from "./routes";
import { useEffect, useState } from "react";

const queryClient = new QueryClient();

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // useEffect(() => {
    //     const storedUser = localStorage.getItem('metronics');
    //     storedUser ? setIsLoggedIn(true) : setIsLoggedIn(false);
    // }, [setIsLoggedIn])

    // useEffect(() => {
    //     const token = localStorage.getItem('metronics')
    //     if (token) {
    //         console.log(token)
    //     }
    // })

    return (
        <QueryClientProvider client={queryClient}>
            {/*{isLoggedIn ? <PrivateRoutes /> : <PublicRoutes />}*/}
            <PublicRoutes />
            <PrivateRoutes />
            <ReactQueryDevtools />
        </QueryClientProvider>
    );
};

export default App;
