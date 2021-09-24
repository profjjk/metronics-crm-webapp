import { useRef } from "react";
import { useMutation, useQueryClient } from "react-query";
import usePart from '../../hooks/usePart';
import API from '../../API';

const PartFormUpdate = ({ setShowFormUpdate, partId }) => {
  const { status, data, error } = usePart(partId);

  // Capture form input for part
  let part_number = useRef(''); let description = useRef(''); let purchase_price = useRef(''); 
  let sale_price = useRef(''); let stock = useRef('');

  // Mutations
  const queryClient = useQueryClient();
  const editPart = useMutation(part => API.updatePart(part), {
    onSuccess: () => {
      queryClient.invalidateQueries('parts')
      queryClient.invalidateQueries(['part', partId])
      console.log("Part updated!")
    }
  });

  // Event Handlers
  const handleSubmit = async e => {
    e.preventDefault();

    const partInfo = {
      _id: partId,
      part_number: part_number.current.value, 
      description: description.current.value, 
      purchase_price: parseFloat(purchase_price.current.value), 
      sale_price: parseFloat(sale_price.current.value), 
      stock: parseInt(stock.current.value)
    }

    await editPart.mutate(partInfo);

    setShowFormUpdate(false);
  };

  switch (status) {
    case "loading":
      return <h4 className="text-center my-5">Loading</h4>;
    case "error":
      return <h4 className="text-center my-5">Error: {error.message}</h4>;
    default:
      return (
        <>
          <form className="p-5" onSubmit={handleSubmit}>
            <h1 className="text-primary text-center mb-5">Edit Part Form</h1>

            <div className="my-3">
              <div className="px-3">
                <h6>Part Information</h6>
                <input
                  type="text"
                  className="form-control"
                  name="part_number"
                  placeholder={"part #"}
                  defaultValue={data.data.part_number || ""}
                  ref={part_number}
                />
                <input
                  type="text"
                  className="form-control my-2"
                  name="description"
                  placeholder={"description"}
                  defaultValue={data.data.description || ""}
                  ref={description}
                />
                <input
                  type="number"
                  className="form-control"
                  name="purchase_price"
                  placeholder={"purchase $"}
                  defaultValue={data.data.purchase_price || 0}
                  ref={purchase_price}
                />
                <input
                  type="number"
                  className="form-control my-2"
                  name="sale_price"
                  placeholder={"sale $"}
                  defaultValue={data.data.sale_price || 0}
                  ref={sale_price}
                />
                <input
                  type="number"
                  className="form-control"
                  name="stock"
                  placeholder={"# in stock"}
                  defaultValue={data.data.stock || 0}
                  ref={stock}
                />
              </div>
            </div>

            <div className="mt-4 px-3">
              <button className="btn btn-primary me-3 form-btn" type="submit">
                Update
              </button>
              <button
                className="btn btn-secondary form-btn"
                onClick={() => setShowFormUpdate(false)}
                >Cancel
              </button>
            </div>
          </form>
        </>
      );
  }
}

export default PartFormUpdate;
