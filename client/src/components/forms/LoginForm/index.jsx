
const LoginForm = ({ submitHandler }) => {
    return (
        <form id={"login"} className={"p-5"} onSubmit={submitHandler}>
            <input
                className={"form-control m-3 w-25"}
                type={"text"}
                name={"username"}
                placeholder={"username"}
            />
            <input
                className={"form-control m-3 w-25"}
                type={"password"}
                name={"password"}
                placeholder={"password"}
            />
            <button className={"btn btn-primary m-3 form-btn"}>
                Login
            </button>
        </form>
    )
}

export default LoginForm;