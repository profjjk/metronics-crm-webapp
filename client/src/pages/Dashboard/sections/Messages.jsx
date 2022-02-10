import { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import API from '../../../utils/API';
import dayjs from 'dayjs';

const Messages = ({ messages }) => {
    const qc = useQueryClient();
    const [msgList, setMsgList] = useState(messages);
    const [read, setRead] = useState(false);

    useEffect(() => {
            if (read === false) {
                setMsgList(messages.filter(msg => msg.read === false));
            } else {
                setMsgList(messages.filter(msg => msg.read === true));
            }
    }, [read, messages]);

    // DATA MUTATIONS
    const editMessage = useMutation(msg => API.updateMessage(msg.id, msg.data), {
        onSuccess: () => {
            qc.invalidateQueries('messages');
        }
    });

    // EVENT LISTENERS
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

export default Messages;