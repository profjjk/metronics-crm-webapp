import { useState, useEffect } from "react";
import { useParts } from "../../../react-query";
import { Searchbar } from '../../index';
import { useMutation, useQueryClient } from 'react-query';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import API from '../../../utils/API';

const PartsTable = () => {
    const queryClient = useQueryClient();
    const { status, data, error } = useParts();
    const [partList, setPartList] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    // Search for parts
    useEffect(() => {
        if (status === 'success') {
            if (searchTerm === '') {
                setPartList(data.data);
                return;
            }
            setPartList(
                data.data.filter(part => {
                    return part.partNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        part.description.toLowerCase().includes(searchTerm.toLowerCase());
                })
            );
        }
    }, [searchTerm, status, data]);


    // MUTATIONS
    const updatePart = useMutation(part => API.updatePart(part.id, part.data), {
        onSuccess: () => {
            queryClient.invalidateQueries('parts');
        }
    });

    const changeStock = (e, part) => {
        const operator = e.target.innerHTML;
        if (operator === '+') {
            updatePart.mutate({ id: part._id,  data: {...part, stock: part.stock + 1} });
        } else {
            updatePart.mutate({ id: part._id,  data: {...part, stock: part.stock - 1} });
        }
    }

    switch (status) {
        case "loading":
            return <h1 className="text-center my-5">Loading</h1>;
        case "error":
            return <h4 className="text-center my-5">Error: {error.message}</h4>;
        default:
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
                                <td className={"text-center"}>{part.stock}</td>
                                <td className={"inventory-buttons"}>
                                    <div className={"quantity"} onClick={e => changeStock(e, part)}>&#43;</div>
                                    <div className={"quantity"} onClick={e => changeStock(e, part)}>&#8722;</div>
                                </td>
                                <td className={"inventory-buttons"}>
                                    <div className={"select"} onClick={() => {
                                        queryClient.setQueryData('submissionType', 'edit');
                                        queryClient.setQueryData('selectedPart', part);
                                        queryClient.setQueryData('showPartForm', true);
                                    }}><FontAwesomeIcon icon={faEdit}/></div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </section>
            );
    }
}

export default PartsTable;