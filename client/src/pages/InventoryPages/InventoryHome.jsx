import { useParts } from '../../hooks';

const InventoryHome = () => {
    const { status, data, error } = useParts(false);

    switch (status) {
        case "loading":
            return <h1 className="text-center my-5">Loading</h1>;
        case "error":
            return <h4 className="text-center my-5">Error: {error.message}</h4>;
        default:
            return (
                <>
                    <main>

                    </main>
                </>
            )
    }
}

export default InventoryHome;
