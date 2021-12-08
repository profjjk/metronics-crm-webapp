import { Redirect } from "react-router-dom";
import { useAuth, useUser } from "../../hooks";
import './style.scss';

const LoginPage = () => {
    const { user } = useUser();
    const { login } = useAuth();

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
            <div id={"card-login"}>
                <h1>Metronics</h1>
                <form id={"form-login"} onSubmit={submitHandler}>
                    <label>
                        Username
                        <input
                            type={"text"}
                            name={"username"}
                            defaultValue={"metronics"}
                            required
                        />
                    </label>

                    <label>
                        Password
                        <input
                            type={"password"}
                            name={"password"}
                            defaultValue={"password"}
                            required
                        />
                    </label>

                    <button
                        className={"btn-login"}
                        type={"submit"}
                    >LOGIN
                    </button>
                </form>
            </div>
        </main>
    )
}

export default LoginPage;