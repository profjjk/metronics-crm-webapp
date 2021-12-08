import { useEffect, useState } from "react";
import { useMessages } from "../../../hooks";
import dayjs from "dayjs";
import ViewMsg from './ViewMsg';
import './style.scss';

const MessagesTable = () => {
    const { status, data, error, isFetching } = useMessages();
    const [msgList, setMsgList] = useState([]);
    const [viewMsg, setViewMsg] = useState(false);
    const [selectedMsg, setSelectedMsg] = useState(null);

    useEffect(() => {
        if (status === 'success') {
            const newMessages = data.data.filter(msg => msg.read === false);
            setMsgList(newMessages);
        }
    }, [status]);

    const selectionHandler = async e => {
        e.preventDefault();
        const msgId = e.currentTarget.getAttribute('data-id');
        await setSelectedMsg(data.data.filter(msg => msg._id === msgId));
        setViewMsg(true);
    }

    switch (status) {
        case "loading":
            return <h1>Loading</h1>;
        case "error":
            return <h4>Error: {error.message}</h4>;
        default:
            if (!viewMsg && msgList.length > 0) {
                return (
                    <table className={"section-messages"}>
                        <thead>
                        <tr>
                            <th>Messages</th>
                        </tr>
                        </thead>
                        <tbody>
                        {msgList.map(msg => (
                            <tr className={"message table-item"} key={msg._id} data-id={msg._id} onClick={selectionHandler}>
                                <td>
                                    {dayjs(msg.createdAt).format("MMM DD YYYY")}
                                </td>
                                <td>
                                    <strong>{msg.name}</strong>
                                </td>
                                <td>
                                    {msg.message.length <= 80 ? msg.message : msg.message.slice(0, 80) + " ..."}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                )
            } else if (!viewMsg && msgList.length === 0) {
                return (
                    <p className={"section-messages"}>No new messages to display</p>
                )
            } else {
                return (
                    <ViewMsg message={selectedMsg[0]} />
                )
    }
    }
}

export default MessagesTable;