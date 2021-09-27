import { useParts } from '../hooks';

const InventoryPage = () => {
    const { status, data, error } = useParts();

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

export default InventoryPage;
