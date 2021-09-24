import { useRef } from "react";
import { useMutation, useQueryClient } from "react-query";
import useJob from '../../hooks/useJob';
import API from '../../API';

const CustomerJobEdit = ({ jobId, setShowTable, customerId }) => {
  const { status, data, error } = useJob(jobId);

  // Capture form input for job
  let jobStatus = useRef(''); let type = useRef(''); let date_completed = useRef(''); 
  let invoice_number = useRef(''); let issue_notes = useRef(''); let repair_notes = useRef('');

  // Mutations
  const queryClient = useQueryClient();
  const editJob = useMutation(job => API.updateJob(job), {
    onSuccess: () => {
      queryClient.invalidateQueries('jobs')
      queryClient.invalidateQueries(['job', jobId])
      queryClient.invalidateQueries('customers')
      queryClient.invalidateQueries(['customer', customerId])
      console.log("Job updated!")
    }
  });

  // Handlers
  const handleSubmit = async e => {
    e.preventDefault();
    const jobInfo = {
      _id: jobId,
      customerId: customerId, 
      status: jobStatus.current.value, 
      type: type.current.value, 
      date_completed: date_completed.current.value, 
      invoice_number: invoice_number.current.value, 
      issue_notes: issue_notes.current.value, 
      repair_notes: repair_notes.current.value
    }
    await editJob.mutate(jobInfo);
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
                  <option>{data.data.status}</option>
                  {data.data.status === "waiting" ? "" : <option>waiting</option>}
                  {data.data.status === "scheduled" ? "" : <option>scheduled</option>}
                  {data.data.status === "completed" ? "" : <option>completed</option>}
                  {data.data.status === "canceled" ? "" : <option>canceled</option>}
                </select>
              </div>
              <div className="px-3">
                <h6>Type</h6>
                <select className="form-select" name="type" ref={type}>
                  <option>{data.data.type}</option>
                  {data.data.type === "maintenance" ? "" : <option>maintenance</option>}
                  {data.data.type === "repair" ? "" : <option>repair</option>}
                  {data.data.type === "callback" ? "" : <option>callback</option>}
                  {data.data.type === "training" ? "" : <option>training</option>}
                </select>
              </div>
              <div className="px-3">
                <h6>Date Completed</h6>
                <input
                  type="text"
                  className="form-control"
                  name="date_completed"
                  defaultValue={data.data.date_completed || ""}
                  ref={date_completed}
                />
              </div>
              <div className="px-3">
                <h6>Invoice #</h6>
                <input
                  type="text"
                  className="form-control"
                  name="invoice_number"
                  defaultValue={data.data.invoice_number || ""}
                  ref={invoice_number}
                />
              </div>
            </div>

            <div id="notes-area" className="my-3 px-3">
              <h6>Problem Description</h6>
              <textarea
                className="form-control"
                name="issue_notes"
                defaultValue={data.data.issue_notes || ""}
                ref={issue_notes}
              />
              <h6 className="mt-3">Repair Notes</h6>
              <textarea
                className="form-control"
                name="repair_notes"
                defaultValue={data.data.repair_notes || ""}
                ref={repair_notes}
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
