import { useCustomers } from '../hooks';

const CustomerPage = () => {
    const { status, data, error } = useCustomers();

    switch (status) {
        case "loading":
            return <h1 className="text-center my-5">Loading</h1>;
        case "error":
            return <h4 className="text-center my-5">Error: {error.message}</h4>;
        default:
            console.log(data.data);
            return (
                <h1 className="text-center my-5"> Data Load Successful</h1>
            )
    }
}

export default CustomerPage;
