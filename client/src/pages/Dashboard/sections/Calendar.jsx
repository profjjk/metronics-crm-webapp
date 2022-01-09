import { useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';
import dayjs from 'dayjs';

const Calendar = ({ jobs }) => {
    const qc = useQueryClient();
    const [jobList, setJobList] = useState([]);
    const [days, setDays] = useState([]);
    const today = dayjs(new Date());

    useEffect(() => {
        setJobList(jobs);
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
    }, [jobs])

    // EVENT LISTENERS
    const selectJob = (job) => {
        qc.setQueryData('submissionType', 'edit');
        qc.setQueryData('selectedJob', job);
        qc.setQueryData('selectedCustomer', job.customer);
        qc.setQueryData('view', 'serviceForm');
    }

    return (
        <section className={"section-calendar"}>
            <h2>Schedule</h2>
            <div className={"upcoming"}>
                {days.map(day => (
                    <div className={"card-day"} key={day.number}>
                        <h3>
                            <span>{day.name}</span>
                            <span>{day.number}</span>
                        </h3>
                            <div>
                                {jobList.filter(job => (
                                    dayjs(job.serviceDate).format('dddd') === day.name &&
                                        dayjs(job.serviceDate) >= today
                                )).sort((job1, job2) => (
                                    job1.customer.address.city.charCodeAt(0) - job2.customer.address.city.charCodeAt(0)
                                )).map(job => (
                                    <p key={job._id} onClick={() => selectJob(job)}>
                                        {job.customer.businessName}<br/>
                                        <span>{job.customer.address.city}</span>
                                    </p>
                                ))}
                            </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Calendar;