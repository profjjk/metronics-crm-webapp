import { useQueryClient } from 'react-query';
import { useData } from '../../../react-query';

const Header = () => {
    const qc = useQueryClient();
    const view = useData('view');

    return (
        <div className={"main-header"}>
            <h1 onClick={() => {
                qc.setQueryData('view', 'default');
            }}>Customers</h1>

            <div className={"button-area"}>
                <p className={"btn"} onClick={() => {
                    qc.setQueryData('view', 'default');
                }}>View All</p>

                <p className={"btn"} onClick={() => {
                    qc.setQueryData('submissionType', 'new');
                    qc.setQueryData('selectedCustomer', null);

                    if (view === 'customerForm') {
                        const formFields = document.querySelectorAll('input, textarea');
                        for (let field of formFields) field.value = "";
                    } else {
                        qc.setQueryData('view', 'customerForm');
                    }
                }}>Create New</p>
            </div>
        </div>
    )
}

export default Header;