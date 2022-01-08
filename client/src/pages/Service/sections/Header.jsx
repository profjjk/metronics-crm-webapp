import { useQueryClient } from 'react-query';
import { useData } from '../../../react-query';

const Header = () => {
    const qc = useQueryClient();
    const view = useData('view');
    
    return (
        <div className={"main-header"}>
            <h1 onClick={() => window.location.reload()}>Service Jobs</h1>

            <div className={"button-area"}>
                <p className={"btn"} onClick={() => {
                    qc.setQueryData('view', 'default');
                }}>View All</p>

                <p className={"btn"} onClick={() => {
                    qc.setQueryData('view', 'requests');
                }}>View Online Requests</p>

                <p className={"btn"} onClick={() => {
                    qc.setQueryData('view', 'unpaid');
                }}>View Unpaid</p>

                <p className={"btn"} onClick={() => {
                    qc.setQueryData('selectedCustomer', null);
                    qc.setQueryData('selectedJob', null);
                    qc.setQueryData('submissionType', 'new');
                    if (view === 'serviceForm') {
                        const formFields = document.querySelectorAll('input, textarea');
                        for (let field of formFields) field.value = "";
                    } else {
                        qc.setQueryData('view', 'serviceForm');
                    }
                }}>Create New</p>
            </div>
        </div>
    )
}

export default Header;