import { Redirect } from "react-router-dom";
import { useAuth, useUser } from "../../hooks";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import './style.scss';

const Login = () => {
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
                    <FontAwesomeIcon className={"icon-faUser"} icon={faUser}/>
                    <label>
                        Username
                        <input
                            type={"text"}
                            name={"username"}
                            defaultValue={"metronics"}
                            required
                        />
                    </label>

                    <FontAwesomeIcon className={"icon-faLock"} icon={faLock}/>
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

export default Login;