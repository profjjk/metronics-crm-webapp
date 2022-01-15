import { useState, useEffect } from 'react';
import { useQueryClient, useMutation } from 'react-query';
import { Searchbar } from '../../../components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import API from '../../../utils/API';

const RestockTable = ({ parts }) => {
    const qc = useQueryClient();
    const [partList, setPartList] = useState(parts);
    const [searchTerm, setSearchTerm] = useState("");

    // Filter for parts below minimum stock
    useEffect(() => {
        setPartList(parts.filter(part => part.stock < part.minimum));
    }, [parts]);

    // DATA MUTATIONS
    const update = useMutation(part => API.updatePart(part.id, part.data), {
        onSuccess: () => {
            qc.invalidateQueries('parts');
        }
    });

    // EVENT LISTENERS
    const changeQuantity = (e, part) => {
        const operator = e.target.innerHTML;
        if (operator === '+') {
            update.mutate({ id: part._id,  data: {...part, stock: part.stock + 1} });
        } else {
            update.mutate({ id: part._id,  data: {...part, stock: part.stock - 1} });
        }
    }

    return (
        <section>
            <div className={"section-header"}>
                <div>
                    <Searchbar
                        placeholder={"Search"}
                        setSearch={setSearchTerm}
                    />
                </div>
            </div>

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