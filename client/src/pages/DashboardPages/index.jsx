import { Redirect } from "react-router-dom";
import { useUser } from "../../hooks";
import { WaitListTable, PartsReorderTable } from "../../components";

const DashboardHome = () => {
    const { user } = useUser();

    // REDIRECTS
    if (!user) {
        return <Redirect to={'/login'} />
    }
    if (user.auth === 'public') {
        return <Redirect to={'/'} />
    }

    return (
        <>
            <main>
                <WaitListTable/>
                <PartsReorderTable />
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