import { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import API from '../../API';

const JobsTable = ({ setShowFormUpdate, setJobId, searchTerm, jobs }) => {
  const [jobList, setJobList] = useState(jobs)
  const [jobStatus, setJobStatus] = useState('');

  // Filter by status
  useEffect(() => {
    if (jobStatus === "Waiting") {
      setJobList(jobs.filter(job => job.status === "Waiting"));
    } else if (jobStatus === "Scheduled") {
      setJobList(jobs.filter(job => job.status === "Scheduled"));
    } else if (jobStatus === "Completed") {
      setJobList(jobs.filter(job => job.status === "Completed"));
    } else if (jobStatus === "Canceled") {
      setJobList(jobs.filter(job => job.status === "Canceled"));
    } else {
      setJobList(jobs);
    }
  }, [jobStatus, jobs]);

  // Search for jobs
  useEffect(() => {
    if (searchTerm === '') {
      setJobList(jobs);
      return;
    }
    setJobList(jobs.filter(job => {
      if (job.customer.businessName.toLowerCase().includes(searchTerm.toLowerCase())) {
        return true;
      } else if (job.dateCompleted.toLowerCase() !== null && job.dateCompleted.toLowerCase().includes(searchTerm)) {
        return true;
      } else return job.invoiceNumber !== null && job.invoiceNumber.includes(searchTerm);
    }))
  }, [searchTerm, jobs]);

  // Mutations
  const queryClient = useQueryClient();
  const deleteJob = useMutation(id => API.deleteJob(id), {
    onSuccess: () => {
      queryClient.invalidateQueries('jobs')
      console.log("Job deleted!")
    }
  })

  // Event Handlers
  const statusHandler = e => {
    e.preventDefault();
    setJobStatus(e.target.value);
  };
  const selectionHandler = e => {
    e.preventDefault();
    setJobId(e.target.dataset.id);
    setShowFormUpdate(true);
  };
  const deleteHandler = async e => {
    e.preventDefault();
    let answer = window.confirm("Are you sure you want to delete?\nThis cannot be undone.")
    if (answer) {
      await deleteJob.mutate(e.target.dataset.id)
      return
    }
    console.log("Job not deleted");
  }

  return (
    <div className="mt-5">
      <h3 className="float-start">Service Jobs:</h3>

      <div className="float-end">
        <select className="form-select" onChange={statusHandler}>
          <option>Filter by status</option>
          <option>Waiting</option>
          <option>Scheduled</option>
          <option>Completed</option>
          <option>Canceled</option>
        </select>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th scope="col">Invoice #</th>
            <th scope="col">Date Completed</th>
            <th scope="col">Company Name</th>
            <th scope="col">City</th>
            <th scope="col">Type</th>
            <th scope="col">Status</th>
            <th scope="col" />
          </tr>
        </thead>

        <tbody>
          {jobList.map(job => (
            <tr key={job._id}>
              <td className="text-center">
                {job.invoiceNumber ? job.invoiceNumber : "--"}
              </td>
              <td className="text-center">
                {job.dateCompleted ? job.dateCompleted : "--"}
              </td>
              <td>{job.customer.businessName}</td>
              <td>{job.customer.address.city}</td>
              <td>{job.type}</td>
              <td>{job.status}</td>
              <td>
                <div className="float-end">
                  <button
                    className="btn btn-secondary"
                    data-id={job._id}
                    onClick={selectionHandler}
                    >&#10162;
                  </button>
                  <button
                    className="btn btn-danger ms-4"
                    data-id={job._id}
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

export default JobsTable;
