import { useState, useEffect } from "react";
import { useParts } from "../../../react-query";
import { Searchbar } from '../../index';
import { useMutation, useQueryClient } from 'react-query';
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
    }, [searchTerm, status]);


    // MUTATIONS
    const createPart = useMutation(part => API.createPart(part), {
        onSuccess: () => {
            queryClient.invalidateQueries('parts');
        }
    });
    const updatePart = useMutation(part => API.updatePart(part.id, part.data), {
        onSuccess: () => {
            queryClient.invalidateQueries('parts');
        }
    });
    const deletePart = useMutation(id => API.deletePart(id), {
        onSuccess: () => {
            queryClient.invalidateQueries('parts');
        }
    });

    // EVENT HANDLERS
    const submit = async e => {
        try {
            e.preventDefault();
            const formData = Object.fromEntries(new FormData(e.target))
            const partData = {
                partNumber: formData.partNumber.toUpperCase().trim(),
                description: formData.description.trim(),
                purchasePrice: parseFloat(formData.purchasePrice.trim()),
                salePrice: parseFloat(formData.salePrice.trim()),
                stock: parseInt(formData.stock.trim()),
                minimum: parseInt(formData.minimum.trim())
            }
            // if (edit) {
            //     await updatePart.mutate({id: part._id, data: partData});
            //     // setEdit(false);
            //     // setShowForm(false);
            //     return
            // }
            // await createPart.mutate(partData);
            // setShowForm(false);
        } catch (err) {
            console.error(err)
        }
    };

    const changeStock = (e, part) => {
        const operator = e.target.innerHTML;
        const tdStock = document.getElementById(`${part._id}`);
        const value = tdStock.children[2];
        if (operator === '+') {
            value.innerHTML = (parseInt(value.innerHTML) + 1).toString();
        } else {
            value.innerHTML = (parseInt(value.innerHTML) - 1).toString();
        }
        // updatePart.mutate({ id: part._id,  data: part });
    }

    const removePart = e => {
        e.preventDefault();
        let answer = window.confirm("Are you sure you want to delete?\nThis cannot be undone.")
        if (answer) deletePart.mutate(e.target.dataset.id);
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
                        <tr>
                            <th>Part #</th>
                            <th>Description</th>
                            <th className={"text-center"}>In Stock</th>
                            <th className={"text-center"}>Change Quantity</th>
                            <th className={"text-center"}>Select</th>
                        </tr>
                        </thead>

                        <tbody>
                        {partList.map(part => (
                            <tr className={"table-item"} key={part._id} id={part._id}>
                                <td>{part.partNumber}</td>
                                <td>{part.description}</td>
                                <td className={"text-center"}>{part.stock}</td>
                                <td className={"inventory-buttons"}>
                                    <div className={"quantity"} onClick={e => changeStock(e, part)}>&#43;</div>
                                    <div className={"quantity"} onClick={e => changeStock(e, part)}>&#8722;</div>
                                </td>
                                <td className={"inventory-buttons"}>
                                    <div className={"select"} onClick={() => {
                                        queryClient.setQueryData('selectedPart', part);
                                        queryClient.setQueryData('showPartForm', true);
                                    }}>&#10162;</div>
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