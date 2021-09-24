const QuickActions = ({ setShowCustomerForm, setShowJobForm, setShowPartForm }) => {

  return (
    <div className="my-5">
      <h4><strong>Quick Actions</strong></h4>
      <div className="d-flex justify-content-evenly">
        <button className="btn btn-success quick-btn"
          type="button"
          onClick={() => setShowCustomerForm(true)}
          >New Customer
        </button>
        <button className="btn btn-success quick-btn"
          type="button" 
          onClick={() => setShowJobForm(true)}
          >New Service Job
        </button>
        <button className="btn btn-success quick-btn"
          type="button"
          onClick={() => setShowPartForm(true)}
          >Add to Inventory
        </button>
      </div>
    </div>
  )
}

export default QuickActions;
