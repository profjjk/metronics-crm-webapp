import { useJobs, useParts } from '../hooks';
import { WaitListTable, PartsReorderTable, SideNavbar } from "../components";

const HomePage = () => {
    const jobs = useJobs();
    const parts = useParts();

    switch ( jobs.status || parts.status) {
        case "loading":
            return <h1 className="text-center my-5">Loading</h1>;
        case "error":
            return <h4 className="text-center my-5">Oops, something went wrong!</h4>;
        default:
            return (
                <>
                    <SideNavbar />
                    <main>
                        <WaitListTable jobs={jobs.data} />
                        <PartsReorderTable parts={parts.data.data} />
                    </main>
                </>

            )
    }
}

export default HomePage;
