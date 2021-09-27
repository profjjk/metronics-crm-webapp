import { useCustomers, useCustomer, useJob, useParts, usePart } from '../hooks';

const HomePage = () => {
    const customers = useCustomers();
    const customer = useCustomer('614f85bcf2a81871730a98ac');

    const job = useJob('614f85bcf2a81871730a98ab', '614f8844ae9dbd7f2d1b1c1c')

    const parts = useParts();
    const part = usePart('614f85bcf2a81871730a98a8')

    switch (customers.status || parts.status || customer.status) {
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
