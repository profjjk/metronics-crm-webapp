import { useQueryClient } from 'react-query';

const Header = () => {
    const cache = useQueryClient();

    return (
        <div className={"main-header"}>
            <h1 onClick={() => {
                cache.setQueryData('view', 'overview');
            }}>Dashboard</h1>

            <div className={"button-area"}>
                <p className={"btn"} onClick={() => {
                    cache.setQueryData('view', 'overview')
                }}>Overview</p>

                <p className={"btn"} onClick={() => {
                    cache.setQueryData('view', 'messages')
                }}>View Messages</p>
            </div>
        </div>
    )
}

export default Header;
