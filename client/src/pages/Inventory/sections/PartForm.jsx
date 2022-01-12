import { useData, useToast } from '../../../react-query';
import { useMutation, useQueryClient } from 'react-query';
import API from '../../../utils/API';

const PartForm = () => {
    const queryClient = useQueryClient();
    const { addToast } = useToast();
    const part = useData('selectedPart');
    const submissionType = useData('submissionType');

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
            const formData = Object.fromEntries(new FormData(e.target));
            const partData = {
                partNumber: formData.partNumber.toUpperCase().trim(),
                description: formData.description.trim(),
                stock: parseInt(formData.stock),
                minimum: parseInt(formData.minimum)
            }
            if (submissionType === 'edit') {
                await updatePart.mutate({id: part._id, data: partData});
                queryClient.setQueryData('showPartForm', false);
                return
            }
            if (submissionType === 'new') {
                await createPart.mutate(partData);
                queryClient.setQueryData('showPartForm', false);
            }
        } catch (err) { console.error(err) }
    };

    const removePart = (id) => {
        let answer = window.confirm("Are you sure you want to delete?\nThis cannot be undone.");
        if (answer) deletePart.mutate(id);
        addToast("Part Deleted");
    }

    return (
        <section>
            <form id={"form-part"} onSubmit={submit}>
                <div>
                    <label className={"text-center"}>
                        Part #
                        <input className={"text-center"} type={"text"} name={"partNumber"}
                               placeholder={"Part #"}
                               defaultValue={part ? part.partNumber : ""}
                        />
                    </label>
                    <label>
                        Description
                        <input type={"text"} name={"description"}
                               placeholder={"Description"}
                               defaultValue={part ? part.description : ""}
                        />
                    </label>
                    <label className={"text-center"}>
                        In Stock
                        <input className={"text-center"} type={"text"} name={"stock"}
                               placeholder={"#"}
                               defaultValue={part ? part.stock : ""}
                        />
                    </label>
                </div>

                <div>
                    <label className={"stock-notification"}>
                        Notify me when stock drops below:
                        <input className={"text-center"} type={"text"} name={"minimum"}
                               placeholder={"#"}
                               defaultValue={part ? part.minimum : ""}
                        />
                    </label>
                </div>

                <div className={"button-area"}>
                    <button className={"btn-form"} type={"submit"}>
                        Save
                    </button>

                    <button
                        className={"btn-form"}
                        onClick={() => {
                            queryClient.removeQueries('selectedPart');
                            queryClient.setQueryData('view', 'inventory');
                        }}
                    >Cancel
                    </button>

                    {part && part._id ? (<button className={"btn-form delete"} onClick={() => {
                        removePart(part._id);
                        queryClient.removeQueries('selectedCustomer');
                        queryClient.removeQueries('selectedJob');
                        queryClient.setQueryData('view', 'inventory');
                    }}>
                        Delete
                    </button>) : <></>}
                </div>
            </form>
        </section>
    )
}

export default PartForm;