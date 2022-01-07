import { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useUser } from '../../react-query';
import { WaitListTable, RestockTable, Messages, SideNavbar } from '../../components';

const DashboardHome = () => {
    const { user } = useUser();
    const [view, setView] = useState('overview');

    // REDIRECTS
    if (!user) {
        return <Redirect to={'/login'} />
    }


    const Header = () => {
        return (
            <div className={"main-header"}>
                <h1 onClick={() => window.location.reload()}>Dashboard</h1>

                <div className={"button-area"}>
                    <p className={"btn"} onClick={() => setView('overview')}>Overview</p>
                    <p className={"btn"} onClick={() => setView('messages')}>View Messages</p>
                </div>
            </div>
        )
    }

    switch(view) {
        case 'messages':
            return (
                <>
                    <header>
                        <SideNavbar />
                    </header>
                    <main className={"container"} id={"dashboard"}>
                        <Header />
                        <Messages />
                    </main>
                </>
            )
        default:
            return (
                <>
                    <header>
                        <SideNavbar />
                    </header>
                    <main className={"container"} id={"dashboard"}>
                        <Header />
                        <WaitListTable />
                        <RestockTable />
                    </main>

                </>
            )
    }
}

export default DashboardHome;

// TODO: Add some interesting data on the top bar...
// - Number of jobs completed this year
// - Total number of customers
// - Unpaid invoices (need to add to data)
// - Total amount billed (need to add to data)