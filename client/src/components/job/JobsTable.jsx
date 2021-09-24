import { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import API from '../../API';

const JobsTable = ({ setShowFormUpdate, setJobId, searchTerm, jobs }) => {
  const [jobList, setJobList] = useState(jobs)
  const [jobStatus, setJobStatus] = useState("");

  // Filter by status
  useEffect(() => {
    if (jobStatus === "Waiting") {
      setJobList(jobs.filter(job => job.status === "waiting"));
    } else if (jobStatus === "Scheduled") {
      setJobList(jobs.filter(job => job.status === "scheduled"));
    } else if (jobStatus === "Completed") {
      setJobList(jobs.filter(job => job.status === "completed"));
    } else if (jobStatus === "Canceled") {
      setJobList(jobs.filter(job => job.status === "canceled"));
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
      if (job.customer.business_name.toLowerCase().includes(searchTerm.toLowerCase())) {
        return true;
      } else if (job.date_completed !== null && job.date_completed.includes(searchTerm)) {
        return true;
      } else if (job.invoice_number !== null && job.invoice_number.includes(searchTerm)) {
        return true;
      } else {
        return false;
      }
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
  const selectionHandler = e => {
    e.preventDefault();
    setJobStatus(e.target.value);
  };
  const viewHandler = e => {
    e.preventDefault();
    setJobId(parseInt(e.target.dataset._id));
    setShowFormUpdate(true);
  };
  const deleteHandler = async e => {
    e.preventDefault();
    await deleteJob.mutate(parseInt(e.target.dataset._id))
  }

  return (
    <div className="mt-5">
      <h3 className="float-start">Service Job Search Results:</h3>

      <div className="float-end">
        <select className="form-select" onChange={selectionHandler}>
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
            <th scope="col"></th>
          </tr>
        </thead>

        <tbody>
          {jobList.map(job => (
            <tr key={job._id}>
              <td className="text-center">
                {job.invoice_number ? job.invoice_number : "--"}
              </td>
              <td className="text-center">
                {job.date_completed ? job.date_completed : "--"}
              </td>
              <td>{job.customer.business_name}</td>
              <td>{job.customer.city}</td>
              <td>{job.type}</td>
              <td>{job.status}</td>
              <td>
                <div className="float-end">
                  <button
                    className="btn btn-warning"
                    data-id={job._id}
                    onClick={viewHandler}
                    >view
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
