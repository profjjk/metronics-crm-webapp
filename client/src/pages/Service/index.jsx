import { useState } from 'react';
import { Redirect } from "react-router-dom";
import { useQueryClient, useQuery } from "react-query";
import { useUser } from "../../hooks";
import { ServiceTable, ServiceForm, SideNavbar } from "../../components";
import './style.scss';

const ServiceHome = () => {
    const queryClient = useQueryClient();
    const { user } = useUser();
    const { data: showForm } = useQuery('showForm', () => {});

    const [viewRequests, setViewRequests] = useState(false);
    const [viewUnpaid, setViewUnpaid] = useState(false);

    // REDIRECTS
    if (!user) {
        return <Redirect to={'/login'} />
    }

    const Header = () => {
        return (
            <div className={"main-header"}>
                <h1 onClick={() => window.location.reload()}>Service Jobs</h1>

                <div className={"button-area"}>
                    <p className={"btn"} onClick={() => {
                        setViewRequests(false);
                        setViewUnpaid(false);
                        queryClient.invalidateQueries('jobs');
                        queryClient.setQueryData('showForm', false);
                    }}>View All</p>

                    <p className={"btn"} onClick={() => {
                        queryClient.setQueryData('showForm', false);
                        setViewUnpaid(false);
                        setViewRequests(true);
                    }}>View Online Requests</p>

                    <p className={"btn"} onClick={() => {
                        queryClient.setQueryData('showForm', false);
                        setViewRequests(false);
                        setViewUnpaid(true);
                    }}>View Unpaid</p>

                    <p className={"btn"} onClick={() => {
                        setViewRequests(false);
                        setViewUnpaid(false);
                        queryClient.removeQueries(['selectedJob', 'selectedCustomer']);
                        queryClient.setQueryData('submissionType', 'new');
                        queryClient.setQueryData('showForm', true);
                    }}>Create New</p>
                </div>
            </div>
        )
    }

    return (
        <>
            <header>
                <SideNavbar/>
            </header>

            <main className={"container"}>
                <Header />
                {showForm ? (
                    <ServiceForm viewRequests={viewRequests}/>
                ) : (
                    <ServiceTable viewRequests={viewRequests} viewUnpaid={viewUnpaid}/>
                )}
            </main>
        </>
    )
}

export default ServiceHome;
