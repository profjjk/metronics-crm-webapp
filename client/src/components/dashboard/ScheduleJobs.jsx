import { useEffect, useState } from 'react';

const ScheduleJobs = ({ jobs }) => {
  const [jobList, setJobList] = useState(jobs);

  useEffect(() => {
    setJobList(jobs.filter(job => job.status === 'waiting'))
  }, [jobs])

  return (
    <div className="my-5">
      <h4 className="pt-5"><strong>Jobs that need to be scheduled</strong></h4>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Company Name</th>
            <th scope="col">Address</th>
            <th scope="col">Phone #</th>
            <th scope="col">Contact Name</th>
          </tr>
        </thead>
        <tbody>
          {jobList.map(job => (
            <tr key={job._id}>
              <td>{job.customer.business_name}</td>
              <td>
                {job.customer.street_1}
                {job.customer.street_2 !== "" ? ", " + job.customer.street_2 : ""}
                <br></br>
                {job.customer.city}, {job.customer.state} {job.customer.zipcode}
              </td>
              <td>{job.customer.phone}</td>
              <td>{job.customer.contact_name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ScheduleJobs;
