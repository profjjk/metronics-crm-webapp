import { useState } from "react";
import { Redirect } from "react-router-dom";
import { useQueryClient, useMutation } from "react-query";
import { useUser } from '../../react-query';
import {Searchbar, PartsTable, PartForm, SideNavbar} from "../../components";
import API from '../../utils/API';
import './style.scss';

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

    // REDIRECTS
    if (!user) {
        return <Redirect to={'/login'} />
    }

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
    const quantityHandler = (part) => {
        updatePart.mutate({ id: part._id,  data: part });
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
            <>
                <header>
                    <SideNavbar/>
                </header>

                <main className={"container"}>
                    <PartForm
                        part={edit ? part : null}
                        submitHandler={submitHandler}
                        setShowForm={setShowForm}
                    />
                </main>
            </>
        )
    } else {
        return (
            <>
                <header>
                    <SideNavbar/>
                </header>

                <main className={"container"}>
                    <Searchbar
                        heading="Inventory Search"
                        subheading="Search by description or part #"
                        placeholder="Description or part #"
                        setSearch={setSearchTerm}
                    />
                    <button
                        className="btn-new"
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
            </>
        )
    }
}

export default InventoryHome;

// TODO: For some reason, 'parts' stopped refreshing when editing unless I hard reload the page. Something to do with authentication? It worked fine before.