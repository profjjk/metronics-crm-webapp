import { useRef } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useJobs } from "../../hooks";
import API from '../../API';

const CustomerJobEdit = ({ jobId, setShowTable, customerId }) => {
  const { status, data, error } = useJobs('_id', jobId);

  // Capture form input for job
  let jobStatus = useRef(''); let type = useRef(''); let dateCompleted = useRef(''); 
  let invoiceNumber = useRef(''); let issueNotes = useRef(''); let repairNotes = useRef('');

  // Mutations
  const queryClient = useQueryClient();
  const editJob = useMutation(job => API.updateJob(job.id, job.data[0]), {
    onSuccess: () => {
      queryClient.invalidateQueries('jobs')
      queryClient.invalidateQueries('customers')
      console.log("Job updated!")
    }
  });

  // Handlers
  const handleSubmit = async e => {
    e.preventDefault();
    const jobInfo = {
      customerId: customerId, 
      status: jobStatus.current.value, 
      type: type.current.value, 
      dateCompleted: dateCompleted.current.value, 
      invoiceNumber: invoiceNumber.current.value, 
      issueNotes: issueNotes.current.value, 
      repairNotes: repairNotes.current.value
    }
    await editJob.mutate({ id: jobId, data: jobInfo});
    setShowTable(true);
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
            <h4>Service Job Info:</h4>
            <div id="dropdown-area" className="my-3">
              <div className="px-3">
                <h6>Status</h6>
                <select className="form-select" name="status" ref={jobStatus}>
                  <option>{data[0].status}</option>
                  {data[0].status === "Waiting" ? "" : <option>Waiting</option>}
                  {data[0].status === "Scheduled" ? "" : <option>Scheduled</option>}
                  {data[0].status === "Completed" ? "" : <option>Completed</option>}
                  {data[0].status === "Canceled" ? "" : <option>Canceled</option>}
                </select>
              </div>
              <div className="px-3">
                <h6>Type</h6>
                <select className="form-select" name="type" ref={type}>
                  <option>{data[0].type}</option>
                  {data[0].type === "Maintenance" ? "" : <option>Maintenance</option>}
                  {data[0].type === "Repair" ? "" : <option>Repair</option>}
                  {data[0].type === "Callback" ? "" : <option>Callback</option>}
                  {data[0].type === "Training" ? "" : <option>Training</option>}
                </select>
              </div>
              <div className="px-3">
                <h6>Date Completed</h6>
                <input
                  type="text"
                  className="form-control"
                  name="dateCompleted"
                  defaultValue={data[0].dateCompleted || ""}
                  ref={dateCompleted}
                />
              </div>
              <div className="px-3">
                <h6>Invoice #</h6>
                <input
                  type="text"
                  className="form-control"
                  name="invoiceNumber"
                  defaultValue={data[0].invoiceNumber || ""}
                  ref={invoiceNumber}
                />
              </div>
            </div>

            <div id="notes-area" className="my-3 px-3">
              <h6>Problem Description</h6>
              <textarea
                className="form-control"
                name="issueNotes"
                defaultValue={data[0].issueNotes || ""}
                ref={issueNotes}
              />
              <h6 className="mt-3">Repair Notes</h6>
              <textarea
                className="form-control"
                name="repairNotes"
                defaultValue={data[0].repairNotes || ""}
                ref={repairNotes}
              />
            </div>

            <div className="mt-4 px-3">
              <button className="btn btn-primary me-3 form-btn" 
                type="submit"
                >Update
              </button>
              <button className="btn btn-secondary form-btn"
                onClick={() => setShowTable(true)}
                >Cancel
              </button>
            </div>
          </form>
        </>
      );
  }
}

export default CustomerJobEdit;
