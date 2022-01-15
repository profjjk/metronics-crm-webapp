import { useHistory } from 'react-router-dom';
import { useAuth } from "../../react-query";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';

const Register = () => {
    const { register } = useAuth();
    const history = useHistory();

    const submitHandler = async e => {
        try {
            e.preventDefault();
            const formData = Object.fromEntries(new FormData(e.target));
            const newUser = await register({
                username: formData.username,
                password: formData.password
            });
            if (newUser.status === 201) history.push('/dashboard');
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
                            required
                        />
                    </label>

                    <FontAwesomeIcon className={"icon-faLock"} icon={faLock}/>
                    <label>
                        Password
                        <input
                            type={"password"}
                            name={"password"}
                            required
                        />
                    </label>

                    <button
                        className={"btn-login"}
                        type={"submit"}
                    >REGISTER
                    </button>
                </form>
            </div>
        </main>
    )
}

export default Register;