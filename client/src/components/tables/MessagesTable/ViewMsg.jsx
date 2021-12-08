const ViewMsg = ({ message }) => {
    // console.log(message)
    return (
        <h2 className={"section-messages"}>Message: {message.message}</h2>
    )
}

export default ViewMsg;