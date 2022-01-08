import { useQueryClient } from 'react-query';

const Header = () => {
    const cache = useQueryClient();

    return (
        <div className={"main-header"}>
            <h1 onClick={() => {
                cache.setQueryData('view', 'inventory');
            }}>Inventory</h1>

            <div className={"button-area"}>
                <p className={"btn"} onClick={() => {
                    cache.refetchQueries('parts');
                    cache.setQueryData('showPartForm', false);
                    cache.setQueryData('view', 'inventory');
                }}>View All</p>

                <p className={"btn"} onClick={() => {
                    cache.setQueryData('showPartForm', false);
                    cache.setQueryData('view', 'restock');
                }}>View Low Stock</p>

                <p className={"btn"} onClick={() => {
                    cache.setQueryData('submissionType', 'new');
                    cache.setQueryData('view', 'newPart');
                }}>Create New</p>
            </div>
        </div>
    )
}

export default Header;