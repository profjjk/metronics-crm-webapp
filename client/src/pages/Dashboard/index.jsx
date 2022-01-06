import { Redirect } from "react-router-dom";
import { useUser } from "../../react-query";
import { WaitListTable, RestockTable, Messages } from "../../components";
import { SideNavbar } from "../../components";
// import './style.scss';

const DashboardHome = () => {
    const { user } = useUser();

    // REDIRECTS
    if (!user) {
        return <Redirect to={'/login'} />
    }

    const Header = () => {
        return (
            <div className={"main-header"}>
                <h1 onClick={() => window.location.reload()}>Dashboard</h1>

                <div className={"button-area"}>
                    <p className={"btn"} onClick={() => {
                        console.log("Overview");
                    }}>Overview</p>

                    <p className={"btn"} onClick={() => {
                        console.log("View Messages");
                    }}>View Messages</p>
                </div>
            </div>
        )
    }

    return (
        <>
            <header>
                <SideNavbar />
            </header>

            <main className={"container"} id={"dashboard"}>
                <Header />
                <Messages />
                <WaitListTable />
                <RestockTable />
            </main>
        </>
    )
}

export default DashboardHome;

// TODO: Add some interesting data on the top bar...
// - Number of jobs completed this year
// - Total number of customers
// - Unpaid invoices (need to add to data)
// - Total amount billed (need to add to data)