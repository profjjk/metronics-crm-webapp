import {useCustomers, useJobs, useParts, useJobQuery} from '../hooks';
import API from '../API';

const HomePage = () => {
    const customers = useCustomers();
    const jobs = useJobs();
    const parts = useParts();

    switch (customers.status || jobs.status || parts.status) {
        case "loading":
            return <h1 className="text-center my-5">Loading</h1>;
        case "error":
            return <h4 className="text-center my-5">Oops, something went wrong!</h4>;
        default:
            return (
                <h1 className="text-center my-5"> Data Load Successful</h1>
            )
    }
}

export default HomePage;
