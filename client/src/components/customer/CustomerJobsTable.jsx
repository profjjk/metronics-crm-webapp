import { useMutation, useQueryClient } from 'react-query';
import useJobs from '../../hooks/useJobs';
import API from '../../API';
import { useEffect } from 'react';

const CustomerJobsTable = ({ customerId, setShowTable, setJobId }) => {
  const { status, data, error } = useJobs('customerId', customerId);

  // Mutations
  const queryClient = useQueryClient();
  const deleteJob = useMutation(id => API.deleteJob(id), {
    onSuccess: () => {
      queryClient.invalidateQueries("jobs");
      console.log("Job deleted!");
    },
  });

  useEffect(() => {
    queryClient.invalidateQueries("jobs");
  }, [setShowTable])

  // Event Handlers
  const viewHandler = e => {
    e.preventDefault();
    setJobId(e.target.dataset.id);
    setShowTable(false);
  };
  const deleteHandler = async e => {
    e.preventDefault();
    await deleteJob.mutate(parseInt(e.target.dataset.id));
  };

  switch (status) {
    case "loading":
      return <h1 className="text-center my-5">Loading</h1>;
    case "error":
      return <h4 className="text-center my-5">Error: {error.message}</h4>;
    default:
      return (
        <div className="mt-5">
          <h3 className="float-start">Service History:</h3>
          <table className="table">
            <thead>
              <tr>
                <th scope="col" className="text-center">Invoice #</th>
                <th scope="col" className="text-center">Date Completed</th>
                <th scope="col">Service Notes</th>
                <th scope="col" />
              </tr>
            </thead>
            <tbody>
              {data.map(job => (
                <tr key={job._id}>
                  <td className="text-center">
                    {job.invoiceNumber ? job.invoiceNumber : "--"}
                  </td>
                  <td className="text-center">
                    {job.dateCompleted ? job.dateCompleted : "--"}
                  </td>
                  <td>{job.repairNotes !== '' ? job.repairNotes : "No notes to display..."}</td>
                  <td>
                    <button
                      className="btn btn-warning"
                      data-id={job._id}
                      onClick={viewHandler}
                    >
                      view
                    </button>
                    <button
                      className="btn btn-danger ms-4"
                      data-id={job._id}
                      onClick={deleteHandler}
                    >
                      X
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
  }
};

export default CustomerJobsTable;
