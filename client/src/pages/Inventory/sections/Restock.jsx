import { useState, useEffect } from 'react';

const RestockTable = ({ parts }) => {
    const [partList, setPartList] = useState(parts);

    // Filter for parts below minimum stock
    useEffect(() => {
        setPartList(parts.filter(part => part.stock < part.minimum));
    }, [parts]);

    return (
        <section>
            <table>
                <thead>
                    <tr className={"tr-restock"}>
                        <th>Part #</th>
                        <th>Description</th>
                        <th className={"text-center"}>In Stock</th>
                        <th />
                    </tr>
                </thead>

                <tbody>
                {partList.map(part => (
                    <tr className={"table-item tr-restock"} key={part._id} id={part._id}>
                        <td>{part.partNumber}</td>
                        <td>{part.description}</td>
                        <td className={"text-center"}>{part.stock}</td>

                        <td className={"inventory-buttons"}>
                            <p className={"warning"}>
                                desired minimum: {part.minimum}
                            </p>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {partList.length < 1 ? <p className={"empty"}>** No parts to display **</p> : <></>}
        </section>
    );
}

export default RestockTable;