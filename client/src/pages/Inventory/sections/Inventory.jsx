import { useState, useEffect } from 'react';
import { useQueryClient, useMutation } from 'react-query';
import { Searchbar } from '../../../components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import API from '../../../utils/API';

const InventoryTable = ({ parts }) => {
    const qc = useQueryClient();
    const [partList, setPartList] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    // Search for parts
    useEffect(() => {
            if (searchTerm === "") {
                setPartList(parts);
                return;
            }
            setPartList(
                parts.filter(part => {
                    return part.partNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        part.description.toLowerCase().includes(searchTerm.toLowerCase());
                })
            );
    }, [searchTerm, parts]);

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
                <tr className={"tr-part"}>
                    <th>Part #</th>
                    <th>Description</th>
                    <th className={"text-center"}>In Stock</th>
                    <th className={"text-center"}>Change Quantity</th>
                    <th className={"text-center"}>Edit</th>
                </tr>
                </thead>

                <tbody>
                {partList.map(part => (
                    <tr className={"table-item tr-part"} key={part._id} id={part._id}>
                        <td>{part.partNumber}</td>
                        <td>{part.description}</td>
                        <td className={`text-center ${part.stock < part.minimum ? "red bold" : ""}`}>{part.stock}</td>
                        <td className={"inventory-buttons"}>
                            <div className={"quantity"} onClick={e => changeQuantity(e, part)}>&#43;</div>
                            <div className={"quantity"} onClick={e => changeQuantity(e, part)}>&#8722;</div>
                        </td>
                        <td className={"inventory-buttons"}>
                            <div className={"select"} onClick={() => {
                                qc.setQueryData('submissionType', 'edit');
                                qc.setQueryData('selectedPart', part);
                                qc.setQueryData('view', 'newPart');
                            }}><FontAwesomeIcon icon={faEdit}/></div>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            {partList.length < 1 ? <p className={"empty"}>** No parts to display **</p> : <></>}
        </section>
    );
}

export default InventoryTable;