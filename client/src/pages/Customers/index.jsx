import { Redirect } from "react-router-dom";
import { useQuery, useQueryClient } from "react-query";
import { useUser } from '../../hooks';
import { CustomersTable, CustomerForm, SideNavbar } from "../../components";
import CustomerHistory from './CustomerHistory';
import './style.scss';

const CustomerHome = () => {
    const queryClient = useQueryClient();
    const { user } = useUser();
    const customer = queryClient.getQueryData('selectedCustomer');
    const { data: showForm } = useQuery('showForm', () => {});

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
                        queryClient.setQueryData('showForm', true);
                    }}>Create New</p>
                </div>
            </div>
        )
    }

    if (!showForm) {
        return (
            <>
                <header>
                    <SideNavbar />
                </header>

                <main className={"container"}>
                    <Header />
                    <CustomersTable />
                </main>
            </>
        )
    }

    if (showForm) {
        return (
            <>
                <header>
                    <SideNavbar />
                </header>

                <main className={"container"}>
                    <Header />
                    <CustomerForm />
                    {customer ? <CustomerHistory /> : <></>}
                </main>
            </>
        )
    }
}

export default CustomerHome;
