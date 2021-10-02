const SaveButton = ({ setShowForm }) => {
    return (
        <div className="mt-4 px-3">
            <button className="btn btn-primary me-3 form-btn" type="submit">
                Save
            </button>
            <button
                className="btn btn-secondary form-btn"
                onClick={() => setShowForm(false)}
            >Cancel
            </button>
        </div>
    )
}

export default SaveButton;