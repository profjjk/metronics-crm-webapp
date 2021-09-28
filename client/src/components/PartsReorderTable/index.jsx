import { useEffect, useState } from "react";

const PartsReorderTable = ({ parts }) => {
    const [partsList, setPartsList] = useState(parts)
    const headers = ["Part #", "Description", "In Stock"];

    useEffect(() => {
        setPartsList(parts.filter(part => part.stock <= part.minimum))
    }, [parts])

    return (
        <div className="my-5">
            <h4 className="pt-5"><strong>Parts that need to be re-ordered</strong></h4>
            <table className="table">
                <thead>
                    <tr>
                        {headers.map(header => <th scope="col">{header}</th>)}
                        <td />
                    </tr>
                </thead>
                <tbody>
                {partsList.map(part => (
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

export default PartsReorderTable;