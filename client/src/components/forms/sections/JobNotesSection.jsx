const JobNotesSection = ({ job }) => {
    return (
        <div id="notes-area" className="my-3 px-3">
            <h6>Problem Description</h6>
            <textarea
                className="form-control"
                name="issueNotes"
                defaultValue={job ? job.issueNotes : ""}
            />
            <h6 className="mt-3">Repair Notes</h6>
            <textarea
                className="form-control"
                name="repairNotes"
                defaultValue={job ? job.repairNotes : ""}
            />
        </div>
    )
}

export default JobNotesSection;