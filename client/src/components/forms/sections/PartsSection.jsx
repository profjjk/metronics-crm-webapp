import API from "../../../utils/API";
import { useRef } from "react";

const PartsSection = ({ parts, setParts, removePartHandler }) => {
    let partNumber = useRef(); let partQuantity = useRef();

    const addPartHandler = async e => {
        try {
            e.preventDefault();
            let part = await API.searchParts('partNumber', partNumber.current.value.toUpperCase())
            const newPart = {
                partNumber: partNumber.current.value.toUpperCase(),
                description: part.data[0].description,
                quantity: parseInt(partQuantity.current.value) < 0 ? 0 : parseInt(partQuantity.current.value)
            }
            setParts([...parts, newPart]);
            partNumber.current.value = ""; partQuantity.current.value = "";
        } catch(err) { console.error(err) }
    }

    return (
        <div id={"parts-area"} className={"my-3 px-3"}>
            <div>
                <h6 className="">Add any parts that you used:</h6>
                <div className="part-form">
                    <input
                        className="form-control"
                        placeholder="Part #"
                        name="partNumber"
                        ref={partNumber}
                    />
                    <input
                        className="form-control"
                        type="number"
                        placeholder="Quantity"
                        name="partQuantity"
                        ref={partQuantity}
                    />
                    <div>
                        <button
                            className="btn btn-success"
                            onClick={addPartHandler}
                        >Add
                        </button>
                    </div>
                </div>
            </div>
            <div>
                <table className="table">
                    <thead>
                    <tr>
                        <th>Part #</th>
                        <th>Description</th>
                        <th># Used</th>
                        <th/>
                    </tr>
                    </thead>
                    <tbody>
                    {parts ? parts.map(part => (
                        <tr key={part.partNumber}>
                            <td>{part.partNumber}</td>
                            <td>{part.description}</td>
                            <td>{part.quantity}</td>
                            <td>
                                <button
                                    className="btn btn-warning"
                                    data-id={part.partNumber}
                                    onClick={removePartHandler}
                                >X
                                </button>
                            </td>
                        </tr>
                    )) : <></>}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default PartsSection;
