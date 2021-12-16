import { useParts } from "../../../react-query";
import {useEffect, useState} from "react";
import './style.scss';

const PartsReorderTable = () => {
    const { status, data, error } = useParts(true);
    const [partList, setPartList] = useState([]);
    const headers = ["Part #", "Description", "In Stock"];

    useEffect(() => {
        if (status === 'success') setPartList(data.data.filter(part => part.stock <= part.minimum));
    }, [status]);

    switch (status) {
        case "loading":
            return <h1 className="text-center my-5">Loading</h1>;
        case "error":
            return <h4 className="text-center my-5">Error: {error.message()}</h4>;
        default:
            return (
                <section className="section-restock">
                    <div className="section-header">
                        <h2>Restock Inventory</h2>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                {headers.map(header => <th scope={"col"} key={header}>{header}</th>)}
                            </tr>
                        </thead>

                        <tbody>
                        {partList.map(part => (
                            <tr className={"table-item"} key={part._id}>
                                <td>{part.partNumber}</td>
                                <td>{part.description}</td>
                                <td>{part.stock}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    {partList.length < 1 ? <p className={"empty"}>** Inventory is fully stocked **</p> : <></>}
                </section>
            )
    }
}

export default PartsReorderTable;