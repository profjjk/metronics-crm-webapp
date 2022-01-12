

const Modal = ({ message }) => {
    return (
        <div id="service-modal"
             style="display:none;">
            <div className="modal-content">
                <div className="close modalToggle">&times;</div>
                <p>{message}</p>
            </div>
        </div>
    )
}

export default Modal;