import { useEffect, useState } from 'react';
import { useToast } from '../../react-query';
import './style.scss';

const Toast = () => {
    const { toasts, deleteToast } = useToast();
    const [toastList, setToastList] = useState([]);

    useEffect(() => {
        if (toasts) {
            setToastList(toasts)
        }
    }, [toasts]);

    return (
        <footer className={"toast-container"}>
            {toastList.map(toast => (
                <div className={"toast-card"} key={toast.id}>
                    <button onClick={() => deleteToast(toast.id)}>
                        X
                    </button>
                    <p className={"toast-message"}>{toast.msg}</p>
                </div>
            ))}
        </footer>
    )
}

export default Toast;