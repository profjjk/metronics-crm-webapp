import API from '../../utils/API';
import { setStoredUser } from "../../utils/storage";
import { useHistory } from "react-router-dom";

const LoginPage = () => {
    const history = useHistory();

    const login = async user => {
        try {
            const response = await API.login(user);
            if (response.data.accessToken) {
                setStoredUser(response.data.accessToken)
            }
        } catch(err) { console.error(err) }
    }

    const submitHandler = async e => {
        try {
            e.preventDefault();
            const formData = Object.fromEntries(new FormData(e.target));
            const user = {
                username: formData.username,
                password: formData.password
            }
            await login(user);
            history.replace('/dashboard')
        } catch(err) { console.error(err) }
    }

    return (
        <main>
            <form id={"login"} className={"p-5"} onSubmit={submitHandler}>
                <input
                    className={"form-control m-3 w-25"}
                    type={"text"}
                    name={"username"}
                    placeholder={"username"}
                    required
                />
                <input
                    className={"form-control m-3 w-25"}
                    type={"password"}
                    name={"password"}
                    placeholder={"password"}
                    required
                />
                <button
                    className={"btn btn-primary m-3 form-btn"}
                    type={"submit"}
                    >Login
                </button>
            </form>
        </main>
    )
}

export default LoginPage;