import { useEffect, useState } from "react";
import { useMessages } from "../../react-query";
import { useMutation, useQueryClient } from 'react-query';
import API from '../../utils/API';
import dayjs from "dayjs";

const Messages = () => {
    const queryClient = useQueryClient();
    const { status, data, error } = useMessages();
    const [msgList, setMsgList] = useState([]);
    const [read, setRead] = useState(false);

    useEffect(() => {
        if (status === 'success') {
            if (read === false) {
                setMsgList(data.data.filter(msg => msg.read === false));
            } else {
                setMsgList(data.data.filter(msg => msg.read === true));
            }
        }
    }, [status, read, data]);

    // MUTATION
    const editMessage = useMutation(msg => API.updateMessage(msg.id, msg.data), {
        onSuccess: () => {
            queryClient.invalidateQueries('messages');
        }
    });

    const markRead = msg => {
        let boolean = msg.read === false;
        editMessage.mutate({ id: msg._id, data: {...msg, read: boolean} });
    }

    const toggleReadUnread = async e => {
        e.preventDefault();
        const toggleBtns = document.getElementsByClassName('toggle-btn');
        for (let btn of toggleBtns) {
            btn.classList.remove('active');
        }
        e.currentTarget.classList.add('active');
        e.currentTarget.innerHTML === 'Read' ? setRead(true) : setRead(false);
    }

    switch (status) {
        case "loading":
            return <h1>Loading</h1>;
        case "error":
            return <h4>Error: {error.message}</h4>;
        default:
            return (
                <section className={"section-messages"}>
                    <div className={"read-toggle"}>
                        <div className={"toggle-btn left active"} onClick={e => toggleReadUnread(e)}>
                            Unread
                        </div>
                        <div className={"toggle-btn right"} onClick={e => toggleReadUnread(e)}>
                            Read
                        </div>
                    </div>

                    {msgList.map(msg => (
                        <div className={"message"} key={msg._id}>
                            <div className={"msg-header"}>
                                <p>From: <strong>{msg.name}</strong></p>
                                <p>{msg.email}</p>
                                <p>{dayjs(msg.createdAt).format("MMM D, YYYY")}</p>
                            </div>
                            <p>{msg.message}</p>
                            <p className={"mark-read text-right"} onClick={() => markRead(msg)}>
                                {msg.read === false ? "Mark as read" : "Mark as unread"}
                            </p>
                        </div>
                    ))}
                    {msgList.length < 1 ? <p className={"empty"}>** No messages to display **</p> : <></>}
                </section>
            )
    }
}

export default Messages;