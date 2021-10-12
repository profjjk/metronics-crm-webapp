import {useState, useEffect} from "react";
import {useParts} from "../../../hooks";

const PartsTable = ({searchTerm, selectionHandler, quantityHandler, deleteHandler}) => {
    const {status, data, error, isFetching} = useParts();
    const [partList, setPartList] = useState([])

    // Search for parts
    useEffect(() => {
        if (status === 'success') {
            if (searchTerm === '') {
                setPartList(data.data);
                return;
            }
            setPartList(data.data.filter(part => {
                return part.partNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    part.description.toLowerCase().includes(searchTerm.toLowerCase());
            }))
        }
    }, [searchTerm, data]);

    switch (status) {
        case "loading":
            return <h1 className="text-center my-5">Loading</h1>;
        case "error":
            return <h4 className="text-center my-5">Error: {error.message}</h4>;
        default:
            return (
                <div className="mt-5">
                    <h3 className="float-start">Inventory Search Results:</h3>
                    <table className="table">
                        <thead>
                        <tr>
                            <th scope="col">Part #</th>
                            <th scope="col">Description</th>
                            <th scope="col" className="text-center">Purchase $</th>
                            <th scope="col" className="text-center">Sale $</th>
                            <th scope="col" className="text-center">In Stock</th>
                            <th scope="col" className="text-center">Change Quantity</th>
                            <th scope="col"/>
                        </tr>
                        </thead>

                        <tbody>
                        {partList.map(part => (
                            <tr key={part._id}>
                                <td>{part.partNumber}</td>
                                <td>{part.description}</td>
                                <td className="text-center text-danger">{part.purchasePrice}</td>
                                <td className="text-center text-success">{part.salePrice}</td>
                                <td className="text-center">{part.stock}</td>
                                <td className="d-flex justify-content-center">
                                    <button
                                        className="btn btn-secondary"
                                        data-id={part._id}
                                        onClick={e => quantityHandler(e, {...part, stock: part.stock + 1})}
                                    >+
                                    </button>
                                    <button
                                        className="btn btn-secondary ms-4"
                                        data-id={part._id}
                                        onClick={e => quantityHandler(e, {...part, stock: part.stock - 1})}
                                    >-
                                    </button>
                                </td>
                                <td>
                                    <div className="float-end">
                                        <button
                                            className="btn btn-warning"
                                            data-id={part._id}
                                            onClick={e => selectionHandler(e, part)}
                                        >edit
                                        </button>
                                        <button
                                            className="btn btn-danger ms-4"
                                            data-id={part._id}
                                            onClick={deleteHandler}
                                        >X
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            );
    }
}

export default PartsTable;