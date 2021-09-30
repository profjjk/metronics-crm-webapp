import { useState } from "react";
import { useParts } from '../hooks';
import { PartsTable, Searchbar, PartFormNew, PartFormUpdate } from "../components";

const InventoryPage = () => {
    const { status, data, error, isFetching } = useParts(false);

    const [searchTerm, setSearchTerm] = useState('');
    const [partId, setPartId] = useState('');
    const [showFormNew, setShowFormNew] = useState(false);
    const [showFormUpdate, setShowFormUpdate] = useState(false);

    switch (status) {
        case "loading":
            return <h1 className="text-center my-5">Loading</h1>;
        case "error":
            return <h4 className="text-center my-5">Error: {error.message}</h4>;
        default:
            if (!showFormNew && !showFormUpdate) {
                return (
                    <main>
                        <Searchbar
                            heading={"Inventory Search"}
                            subheading={"Search by part # or description"}
                            placeholder={"Part # or description"}
                            setSearch={setSearchTerm}
                        />
                        <button
                            className="btn btn-success me-3 mt-5"
                            onClick={() => setShowFormNew(true)}
                            >Add New Part
                        </button>
                        <PartsTable
                            searchTerm={searchTerm}
                            setShowFormUpdate={setShowFormUpdate}
                            setPartId={setPartId}
                            partId={partId}
                        />
                        {isFetching ? <p className="text-center my-5">Getting information from database...</p> : ""}
                    </main>
                )
            }

            if (showFormNew) {
                return (
                    <main>
                        <div className="p-5">
                            <PartFormNew
                                setShowFormNew={setShowFormNew}
                            />
                            { isFetching ? <p className="text-center my-5">Getting information from database...</p> : "" }
                        </div>
                    </main>
                )
            }

            if (showFormUpdate) {
                return (
                    <main>\
                        <div className="p-5">
                            <PartFormUpdate
                                setShowFormUpdate={setShowFormUpdate}
                                partId={partId}
                            />
                            { isFetching ? <p className="text-center my-5">Getting information from database...</p> : "" }
                        </div>
                    </main>
                )
            }
    }
}

export default InventoryPage;
