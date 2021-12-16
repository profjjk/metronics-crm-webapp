import { useState } from 'react';
import { Redirect } from "react-router-dom";
import { useQueryClient } from "react-query";
import { useUser, useData } from "../../react-query";
import { ServiceTable, ServiceForm, SideNavbar } from "../../components";
import './style.scss';

const ServiceHome = () => {
    const queryClient = useQueryClient();
    const { user } = useUser();
    const showServiceForm = useData('showServiceForm');
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
                        queryClient.refetchQueries('jobs');
                        queryClient.setQueryData('showServiceForm', false);
                    }}>View All</p>

                    <p className={"btn"} onClick={() => {
                        queryClient.setQueryData('showServiceForm', false);
                        setViewUnpaid(false);
                        setViewRequests(true);
                    }}>View Online Requests</p>

                    <p className={"btn"} onClick={() => {
                        queryClient.setQueryData('showServiceForm', false);
                        setViewRequests(false);
                        setViewUnpaid(true);
                    }}>View Unpaid</p>

                    <p className={"btn"} onClick={() => {
                        setViewRequests(false);
                        setViewUnpaid(false);
                        queryClient.removeQueries('selectedCustomer');
                        queryClient.removeQueries('selectedJob');
                        queryClient.setQueryData('submissionType', 'new');
                        if (showServiceForm) {
                            const formFields = document.querySelectorAll('input, textarea');
                            for (let field of formFields) field.value = "";
                        } else {
                            queryClient.setQueryData('showServiceForm', true);
                        }
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
                {showServiceForm ? (
                    <ServiceForm viewRequests={viewRequests}/>
                ) : (
                    <ServiceTable viewRequests={viewRequests} viewUnpaid={viewUnpaid}/>
                )}
            </main>
        </>
    )
}

export default ServiceHome;
