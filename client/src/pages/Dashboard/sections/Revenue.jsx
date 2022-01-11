import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { useQueryClient } from 'react-query';
import { useHistory } from 'react-router-dom';

const Revenue = ({ jobs }) => {
    const qc = useQueryClient();
    const history = useHistory();
    const [revenue, setRevenue] = useState(0);
    const [outstanding, setOutstanding] = useState(0);
    const year = dayjs(new Date()).format('YYYY');

    useEffect(() => {
        let totalRevenue = 0;
        let unpaid = 0;
        for (let job of jobs) {
            if (dayjs(job.serviceDate).format('YYYY') === year && job.isPaid) {
                totalRevenue += job.totalBill;
            }
            if (dayjs(job.serviceDate).format('YYYY') <= year  && !job.isPaid) {
                unpaid += job.totalBill;
            }
        }
        setRevenue(totalRevenue);
        setOutstanding(unpaid);
    }, [jobs])

    return (
        <section className={"section-revenue"}>
            <h2>YTD SERVICE REVENUE</h2>
            <p className={"revenue"}>
                ${revenue}
            </p>
            <p className={"outstanding"} onClick={() => {
                qc.setQueryData('view', 'unpaid');
                history.push('/service');
            }}>
                ${outstanding} outstanding
            </p>
        </section>
    )
}

export default Revenue;