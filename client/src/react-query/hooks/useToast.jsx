import { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';

const useToasts = () => {
    const qc = useQueryClient();
    const [toasts, setToasts] = useState([]);

    useEffect(() => {
        if (toasts.length) {
            const interval = setInterval(() => {
                setToasts(toasts.slice(1));
                qc.setQueryData('toasts', toasts.slice(1));
            }, 5000);

            return () => clearInterval(interval);
        }
    }, [toasts]);

    useQuery('toasts', () => {}, {
        onSuccess: data => {
            data === undefined ? setToasts([]) : setToasts(data)
        }
    });

    const addToast = message => {
        const newToast = { id: toasts.length, msg: message }
        setToasts([...toasts, newToast])
        qc.setQueryData('toasts', [...toasts, newToast]);
    }

    const deleteToast = id => {
        setToasts(toasts.filter(toast => toast.id !== id));
        qc.setQueryData('toasts', toasts.filter(toast => toast.id !== id));
    }

    return { toasts, addToast, deleteToast }
}

export default useToasts;