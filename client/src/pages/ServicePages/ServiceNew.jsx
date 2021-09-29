import { ServiceForm } from '../../components'
import { useHistory } from "react-router-dom";
import AutoCompleteSearch from "../../components/job/AutoCompleteSearch";
import {useMutation, useQueryClient} from "react-query";
import API from "../../API";

const ServiceNew = () => {

    switch (status) {
        case "loading":
            return <h1 className="text-center my-5">Loading</h1>;
        case "error":
            return <h4 className="text-center my-5">Error: {error.message}</h4>;
        default:
            return (
                <main>

                </main>
            )
    }
}

export default ServiceNew;