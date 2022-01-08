import { useQueryClient } from 'react-query';

const Header = () => {
    const qc = useQueryClient();

    return (
        <div className={"main-header"}>
            <h1 onClick={() => {
                qc.setQueryData('view', 'default');
            }}>Dashboard</h1>

            <div className={"button-area"}>
                <p className={"btn"} onClick={() => {
                    qc.setQueryData('view', 'overview')
                }}>Overview</p>

                <p className={"btn"} onClick={() => {
                    qc.setQueryData('view', 'messages')
                }}>View Messages</p>
            </div>
        </div>
    )
}

export default Header;
