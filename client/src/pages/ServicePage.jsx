import { useState } from 'react';
import { useJobs } from '../hooks';
import { SideNavbar, JobsTable, Searchbar, JobFormNew, JobFormUpdate } from "../components";

const ServicePage = () => {
    const { status, data, error, isFetching } = useJobs();
    const [searchTerm, setSearchTerm] = useState('');
    const [jobId, setJobId] = useState('');
    const [showFormUpdate, setShowFormUpdate] = useState(false);
    const [showFormNew, setShowFormNew] = useState(false);

    switch (status) {
        case "loading":
            return <h1 className="text-center my-5">Loading</h1>;
        case "error":
            return <h4 className="text-center my-5">Error: {error.message}</h4>;
        default:
            if(!showFormNew && !showFormUpdate) {
                return (
                    <>
                        <main>
                            <Searchbar
                                heading={"Service Job Search"}
                                subheading={"Search by invoice #, date, or customer"}
                                placeholder={"Invoice #, date, or customer"}
                                setSearch={setSearchTerm}
                            />
                            <button
                                className="btn btn-success me-3 mt-5"
                                onClick={() => setShowFormNew(true)}
                                >Create New Service Job
                            </button>
                            <JobsTable
                                jobs={data}
                                setJobId={setJobId}
                                searchTerm={searchTerm}
                                setShowFormUpdate={setShowFormUpdate}
                            />
                            {isFetching ? <p className="text-center my-5">Getting information from database...</p> : "" }
                        </main>
                    </>
                )
            }
            if (showFormNew) {
                return (
                    <main>
                        <div className="p-5">
                            <SideNavbar />
                            <JobFormNew
                                setShowFormNew={setShowFormNew}
                            />
                            {isFetching ? <p className="text-center my-5">Getting information from database...</p> : "" }
                        </div>
                    </main>
                );
            }
            if (showFormUpdate) {
                return (
                    <main>
                        <div className="p-5">
                            <SideNavbar />
                            <JobFormUpdate
                                setShowFormUpdate={setShowFormUpdate}
                                jobId={jobId}
                            />
                            {isFetching ? <p className="text-center my-5">Getting information from database...</p> : "" }
                        </div>
                    </main>
                );
            }
    }
}

export default ServicePage;