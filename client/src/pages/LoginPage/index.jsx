import API from '../../utils/API';
import { useHistory } from "react-router-dom";

const LoginPage = () => {
    const history = useHistory();

    const login = async userData => {
        try {
            const response = await API.login(userData);
            if (response.data.accessToken) {
                localStorage.setItem('metronics', JSON.stringify(response.data.accessToken))
            }
        } catch(err) { console.error(err) }
    }

    const submitHandler = async e => {
        try {
            e.preventDefault();
            const formData = Object.fromEntries(new FormData(e.target));
            const userData = {
                username: formData.username,
                password: formData.password
            }
            await login(userData);
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