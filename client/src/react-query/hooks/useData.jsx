import { useQuery } from 'react-query';

const useData = (queryKey) => {
    const { data } = useQuery(queryKey, () => {});
    if (data === undefined || null) {
        return null;
    } else {
        return data;
    }
}

export default useData;