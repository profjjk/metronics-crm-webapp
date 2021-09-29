import { useParts } from "../../../hooks";

const PartsReorderTable = () => {
    const { status, data, error } = useParts(true);
    const headers = ["Part #", "Description", "In Stock"];

    switch (status) {
        case "loading":
            return <h1 className="text-center my-5">Loading</h1>;
        case "error":
            return <h4 className="text-center my-5">Error: {error.message()}</h4>;
        default:
            return (
                <div className="my-5">
                    <h4 className="pt-5"><strong>Parts that need to be re-ordered</strong></h4>
                    <table className="table">
                        <thead>
                        <tr>
                            {headers.map(header => <th scope={"col"} key={header}>{header}</th>)}
                            <td />
                        </tr>
                        </thead>
                        <tbody>
                        {data.map(part => (
                            <tr key={part._id}>
                                <td>{part.partNumber}</td>
                                <td>{part.description}</td>
                                <td>{part.stock}</td>
                                <td>
                                    <button
                                        className={"btn btn-success"}
                                        data-id={part._id}
                                    >&#10162;
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )
    }
}

export default PartsReorderTable;