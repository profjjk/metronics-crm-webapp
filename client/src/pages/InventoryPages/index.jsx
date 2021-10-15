import { useState } from "react";
import { Redirect } from "react-router-dom";
import { useQueryClient, useMutation } from "react-query";
import { useUser } from '../../hooks';
import { Searchbar, PartsTable, PartForm } from "../../components";
import API from '../../utils/API';

const InventoryHome = () => {
    const { user } = useUser();
    const [part, setPart] = useState();
    const [showForm, setShowForm] = useState(false);
    const [edit, setEdit] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    // MUTATIONS
    const queryClient = useQueryClient();
    const createPart = useMutation(part => API.createPart(part), {
        onSuccess: () => {
            queryClient.invalidateQueries('parts')
        }
    });
    const updatePart = useMutation(part => API.updatePart(part.id, part.data), {
        onSuccess: () => {
            queryClient.invalidateQueries('parts')
        }
    });
    const deletePart = useMutation(id => API.deletePart(id), {
        onSuccess: () => {
            queryClient.invalidateQueries('parts')
        }
    });

    // if (!user) {
    //     return <Redirect to={'/login'} />
    // }

    // EVENT HANDLERS
    const submitHandler = async e => {
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
            if (edit) {
                await updatePart.mutate({id: part._id, data: partData});
                setEdit(false);
                setShowForm(false);
                return
            }
            await createPart.mutate(partData);
            setShowForm(false);
        } catch (err) {
            console.error(err)
        }
    };
    const quantityHandler = e => {
        e.preventDefault();
        updatePart.mutate({id: e.target.dataset.id, data: part});
    }
    const selectionHandler = (e, part) => {
        e.preventDefault();
        setPart(part);
        setEdit(true);
        setShowForm(true);
    };
    const deleteHandler = e => {
        e.preventDefault();
        let answer = window.confirm("Are you sure you want to delete?\nThis cannot be undone.")
        if (answer) deletePart.mutate(e.target.dataset.id);
    }

    if (showForm) {
        return (
            <main>
                <PartForm
                    part={edit ? part[0] : null}
                    submitHandler={submitHandler}
                    setShowForm={setShowForm}
                />
            </main>
        )
    } else {
        return (
            <main>
                <Searchbar
                    heading="Inventory Search"
                    subheading="Search by description or part #"
                    placeholder="Description or part #"
                    setSearch={setSearchTerm}
                />
                <button
                    className="btn btn-success me-3 mt-5"
                    onClick={() => {
                        setEdit(false);
                        setShowForm(true);
                    }}
                >Add Part to Inventory
                </button>
                <PartsTable
                    searchTerm={searchTerm}
                    selectionHandler={selectionHandler}
                    quantityHandler={quantityHandler}
                    deleteHandler={deleteHandler}
                />
            </main>
        )
    }
}

export default InventoryHome;