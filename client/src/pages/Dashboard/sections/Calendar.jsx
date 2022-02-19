import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useQueryClient } from 'react-query';
import { useJobs } from '../../../react-query';
import dayjs from 'dayjs';

const Calendar = () => {
    const qc = useQueryClient();
    const { status, data: jobs, error } = useJobs();
    const [jobList, setJobList] = useState([]);
    const [days, setDays] = useState([]);
    const today = dayjs(new Date());

    useEffect(() => {
        if (status === 'success') {
            setJobList(jobs.data.filter(job => job.status !== 'Canceled'));
            setDays(() => {
                const days = [];
                for (let i = 0; i < 5; i++) {
                    days.push({
                        name: dayjs(today).add(i, 'day').format('dddd'),
                        number: dayjs(today).add(i, 'day').format('DD')
                    })
                }
                return days;
            })
        }
    }, [jobs])

    // EVENT LISTENERS
    const selectJob = (job) => {
        qc.setQueryData('submissionType', 'edit');
        qc.setQueryData('selectedJob', job);
        qc.setQueryData('selectedCustomer', job.customer);
    }

    switch (status) {
        case 'loading':
            return <h1 className="text-center">Loading</h1>;
        case 'error':
            return <h1 className="text-center">Error: { error.message }</h1>;
        default:
            return (
                <section className={"section-calendar"}>
                    <h2>5 DAY SCHEDULE</h2>
                    <div className={"calendar"}>
                        {days.map(day => (
                            <div className={"calendar-day"} key={day.number}>
                                <h3>
                                    <span>{day.name}</span>
                                    <span>{day.number}</span>
                                </h3>

                                <div>
                                    {jobList.filter(job => (
                                        dayjs(job.serviceDate).format('dddd') === day.name &&
                                        dayjs(job.serviceDate) > today.subtract(1, 'day') &&
                                        dayjs(job.serviceDate) < today.add(5, 'day')
                                    )).sort((job1, job2) => (
                                        job1.customer.address.city.charCodeAt(0) - job2.customer.address.city.charCodeAt(0)
                                    )).map(job => (
                                        <p key={job._id} className={'calendar-job'} onClick={() => selectJob(job)}>
                                            <Link to={'/service/form'}>
                                                {job.customer.businessName}<br/>
                                                <span>{job.customer.address.city}</span>
                                            </Link>
                                        </p>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )
    }
}

export default Calendar;