const NotesSection = () => {
    return (
        <div className={"notes-section"}>
            <label>
                Description of Problem
                <textarea name={"issueNotes"} />
            </label>
            <label>
                Service Notes
                <textarea name={"serviceNotes"} />
            </label>
        </div>
    )
}

export default NotesSection;