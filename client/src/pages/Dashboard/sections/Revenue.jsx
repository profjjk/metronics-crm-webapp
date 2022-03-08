import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

const Revenue = ({ jobs }) => {
    // STATE
    const [revenue, setRevenue] = useState(0);
    const [outstanding, setOutstanding] = useState(0);
    // VARIABLES
    const year = dayjs(new Date()).format('YYYY');
    const dollarUSLocale = Intl.NumberFormat('en-US');

    // LIFECYCLE EVENTS
    useEffect(() => {
        addRevenue();
        addOutstanding();
    }, [jobs]);

    // FUNCTIONS
    const addRevenue = () => {
        let totalRevenue = 0;
        for (let job of jobs) {
            if (dayjs(job.serviceDate).format('YYYY') === year && job.isPaid) {
                totalRevenue += job.totalBill;
            }
        }
        setRevenue(dollarUSLocale.format(totalRevenue));
    }
    const addOutstanding = () => {
        let unpaid = 0;
        for (let job of jobs) {
            if (dayjs(job.serviceDate).format('YYYY') <= year  && !job.isPaid) {
                unpaid += job.totalBill;
            }
        }
        setOutstanding(dollarUSLocale.format(unpaid));
    }

    // RETURNED COMPONENT
    return (
        <section className={"section-revenue"}>
            <h2>YTD SERVICE REVENUE</h2>

            <p className={"revenue"}>
                ${revenue}
            </p>

            <Link className={"outstanding"} to={'/service/unpaid'}>
                ${outstanding} outstanding
            </Link>
        </section>
    )
}

export default Revenue;