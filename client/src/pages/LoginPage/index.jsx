import { useHistory, Redirect } from "react-router-dom";
import { useAuth, useUser } from "../../hooks";

const LoginPage = () => {
    const { user } = useUser();
    const { login } = useAuth();
    const history = useHistory();

    if (user) {
        return <Redirect to={'/dashboard'} />;
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
            window.location.reload();
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
                    defaultValue={"metronics"}
                    required
                />
                <input
                    className={"form-control m-3 w-25"}
                    type={"password"}
                    name={"password"}
                    defaultValue={"password"}
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