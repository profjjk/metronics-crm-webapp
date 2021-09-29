import { WaitListTable, PartsReorderTable, SideNavbar } from "../components";

const HomePage = () => {
    return (
        <>
            <SideNavbar/>
            <main>
                <WaitListTable/>
                <PartsReorderTable />
            </main>
        </>
    )
}

export default HomePage;
