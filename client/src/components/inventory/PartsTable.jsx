import { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import API from '../../API';

const PartsTable = ({ setShowFormUpdate, setPartId, partId, searchTerm, parts }) => {
  const [partList, setPartList] = useState(parts);

  // Search for parts
  useEffect(() => {
    if (searchTerm === '') {
      setPartList(parts);
      return;
    }
    setPartList(parts.filter(part => {
      if (part.partNumber.toLowerCase().includes(searchTerm.toLowerCase())) {
        return true;
      } else if (part.description.toLowerCase().includes(searchTerm.toLowerCase())) {
        return true;
      } 
      return false;
    }))
  }, [searchTerm, parts]);

  // Mutations
  const queryClient = useQueryClient();
  const updatePart = useMutation(part => API.updatePart(part.id, part.data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['parts', 'all'])
      queryClient.invalidateQueries(['parts', partId])
      console.log("Part updated!")
    }
  })
  const deletePart = useMutation(id => API.deletePart(id), {
    onSuccess: () => {
      queryClient.invalidateQueries(['parts', 'all'])
      queryClient.invalidateQueries(['parts', partId])
      console.log("Part deleted!")
    }
  })

  // Event Handlers
  const editHandler = async part => await updatePart.mutate({ id: partId, data: part});
  const viewHandler = e => {
    e.preventDefault();
    setPartId(e.target.dataset.id);
    setShowFormUpdate(true);
  };
  const deleteHandler = async e => {
    e.preventDefault();
    await deletePart.mutate(e.target.dataset.id)
  }

  return (
    <div className="mt-5">
      <h3 className="float-start">Inventory Search Results:</h3>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Part #</th>
            <th scope="col">Description</th>
            <th scope="col" className="text-center">Purchase $</th>
            <th scope="col" className="text-center">Sale $</th>
            <th scope="col" className="text-center">In Stock</th>
            <th scope="col" className="text-center">Change stock</th>
            <th scope="col" />
          </tr>
        </thead>

        <tbody>
          {partList.map(part => (
            <tr key={part._id}>
              <td>{part.partNumber}</td>
              <td>{part.description}</td>
              <td className="text-center text-danger">{part.purchasePrice}</td>
              <td className="text-center text-success">{part.salePrice}</td>
              <td className="text-center">{part.stock}</td>
              <td className="d-flex justify-content-center">
                <button
                  className="btn btn-secondary"
                  data-id={part._id}
                  onClick={() => editHandler({ ...part, stock: part.stock + 1 })}
                  >+
                </button>
                <button
                  className="btn btn-secondary ms-4"
                  data-id={part._id}
                  onClick={() => editHandler({ ...part, stock: part.stock - 1 })}
                  >-
                </button>
              </td>
              <td>
                <div className="float-end">
                  <button
                    className="btn btn-warning"
                    data-id={part._id}
                    onClick={viewHandler}
                    >edit
                  </button>
                  <button
                    className="btn btn-danger ms-4"
                    data-id={part._id}
                    onClick={deleteHandler}
                    >X
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PartsTable;