import { useHistory } from 'react-router-dom';
import './style.scss';

const NotFoundPage = () => {
    const history = useHistory();

    return (
        <main id={"notFound"}>
            <h1>Page Not Found</h1>
            <h4 onClick={() => {
                history.push("/dashboard")
            }}>
                Click here to return to the dashboard.
            </h4>
        </main>
    )

}

export default NotFoundPage;