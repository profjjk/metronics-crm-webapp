import { useRef } from "react";
import { useMutation, useQueryClient } from "react-query";
import API from '../../API';

const PartFormNew = ({ setShowFormNew }) => {
  // Capture form input for part
  let part_number = useRef(''); let description = useRef(''); let purchase_price = useRef(''); 
  let sale_price = useRef(''); let stock = useRef('');

  // Mutations
  const queryClient = useQueryClient();
  const createPart = useMutation(part => API.createPart(part), {
    onSuccess: () => {
      queryClient.invalidateQueries('parts')
      console.log("Part added!")
    }
  });

  // Event Handlers
  const handleSubmit = async e => {
    e.preventDefault();

    const partInfo = {
      part_number: part_number.current.value, 
      description: description.current.value, 
      purchase_price: parseFloat(purchase_price.current.value), 
      sale_price: parseFloat(sale_price.current.value), 
      stock: parseInt(stock.current.value)
    }

    await createPart.mutate(partInfo);

    setShowFormNew(false);
  };

  return (
    <>
      <form className="p-5" onSubmit={handleSubmit}>
        <h1 className="text-primary text-center mb-5">New Part Form</h1>

        <div className="my-3">
          <div className="px-3">
            <h6>Part Information</h6>
            <input
              type="text"
              className="form-control"
              name="part_number"
              placeholder={"part #"}
              ref={part_number}
            />
            <input
              type="text"
              className="form-control my-2"
              name="description"
              placeholder={"description"}
              ref={description}
            />
            <input
              type="text"
              className="form-control"
              name="purchase_price"
              placeholder={"purchase $"}
              ref={purchase_price}
            />
            <input
              type="text"
              className="form-control my-2"
              name="sale_price"
              placeholder={"sale $"}
              ref={sale_price}
            />
            <input
              type="text"
              className="form-control"
              name="stock"
              placeholder={"# in stock"}
              ref={stock}
            />
          </div>
        </div>

        <div className="mt-4 px-3">
          <button className="btn btn-primary me-3 form-btn" type="submit">
            Save
          </button>
          <button
            className="btn btn-secondary form-btn"
            onClick={() => setShowFormNew(false)}
            >Cancel
          </button>
        </div>
      </form>
    </>
  );
}

export default PartFormNew;
