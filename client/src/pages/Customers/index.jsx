import { useState } from 'react';
import { Redirect } from "react-router-dom";
import { useQueryClient } from "react-query";
import { useData, useUser } from '../../react-query';
import { CustomersTable, CustomerForm, SideNavbar, ServiceForm } from "../../components";
import './style.scss';

const CustomerHome = () => {
    const queryClient = useQueryClient();
    const { user } = useUser();
    const [showHistory, setShowHistory] = useState(true);
    const showCustomerForm = useData('showCustomerForm');

    // REDIRECT
    if (!user) {
        return <Redirect to={'/login'} />
    }

    const Header = () => {
        return (
            <div className={"main-header"}>
                <h1 onClick={() => window.location.reload()}>Customers</h1>

                <div className={"button-area"}>
                    <p className={"btn"} onClick={() => {
                        queryClient.setQueryData('submissionType', 'new')
                        queryClient.removeQueries('selectedCustomer');
                        setShowHistory(false);
                        if (showCustomerForm) {
                            const formFields = document.querySelectorAll('input, textarea');
                            for (let field of formFields) field.value = "";
                        } else {
                            queryClient.setQueryData('showCustomerForm', true);
                        }
                    }}>Create New</p>
                </div>
            </div>
        )
    }

    return (
        <>
            <main className={"container"}>
                <Header />
                {showCustomerForm ? (
                    <CustomerForm showHistory={showHistory} />
                ) : (
                    <CustomersTable setShowHistory={setShowHistory} />
                )}
            </main>
        </>
    )
}

export default CustomerHome;
