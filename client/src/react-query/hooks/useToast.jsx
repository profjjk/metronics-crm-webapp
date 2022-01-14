import { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import useData from './useData';

const useToasts = () => {
    const qc = useQueryClient();
    const toasts = useData('toasts');

    useEffect(() => {
        if (toasts) {
            if (toasts.length > 5) {
                qc.setQueryData('toasts', toasts.slice(1));
            }

            const interval = setInterval(() => {
                qc.setQueryData('toasts', toasts.slice(1));
            }, 3000);
            return () => clearInterval(interval);
        }
    }, [toasts]);

    const addToast = message => {
        const newToast = { id: (Math.floor(Math.random() * 1000)), msg: message }
        if (toasts) {
            qc.setQueryData('toasts', [...toasts, newToast]);
        } else {
            qc.setQueryData('toasts', [newToast]);
        }

    }

    const deleteToast = id => {
        qc.setQueryData('toasts', toasts.filter(toast => toast.id !== id));
    }

    return { toasts, addToast, deleteToast }
}

export default useToasts;