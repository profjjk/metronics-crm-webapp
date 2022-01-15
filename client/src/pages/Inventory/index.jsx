import { Redirect } from "react-router-dom";
import { useData, useUser, useParts } from '../../react-query';
import { Header, InventoryTable, RestockTable, PartForm } from './sections';
import './style.scss';

const InventoryPage = () => {
    const { user } = useUser();
    const { status, data: parts, error } = useParts();
    const view = useData('view');

    // REDIRECTS
    if (!user) {
        return <Redirect to={'/'} />
    }

    switch(status) {
        case "loading":
            return <h1 className="text-center">Loading</h1>;
        case "error":
            return <h4 className="text-center">Error: {error.message}</h4>;
        default:
            if (view === 'restock') {
                return (
                    <main className={"container"}>
                        <Header />
                        <RestockTable parts={parts.data} />
                    </main>
                )
            } else if (view === 'newPart') {
                return (
                    <main className={"container"}>
                        <Header />
                        <PartForm />
                    </main>
                )
            } else {
                return (
                    <main className={"container"}>
                        <Header />
                        <InventoryTable parts={parts.data} />
                    </main>
                )
            }
    }
}

export default InventoryPage;
