import { useEffect, useState } from "react";

const OrderParts = ({ parts }) => {
  const [partsList, setPartsList] = useState(parts)

  useEffect(() => {
    setPartsList(parts.filter(part => part.stock <= 3))
  }, [parts])

  return (
    <div className="my-5">
      <h4 className="pt-5"><strong>Parts that need to be re-ordered</strong></h4>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Part #</th>
            <th scope="col">Description</th>
            <th scope="col"># In Inventory</th>
          </tr>
        </thead>
        <tbody>
          {partsList.map(part => (
            <tr key={part._id}>
              <td>{part.part_number}</td>
              <td>{part.description}</td>
              <td>{part.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default OrderParts;
