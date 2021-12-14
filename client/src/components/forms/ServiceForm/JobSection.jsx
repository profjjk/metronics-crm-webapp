import {faChevronDown} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

const JobSection = () => {
    return (
        <div className={"job-section"}>
            <label>
                Service Date
                <input type={"date"} name={"serviceDate"} />
            </label>
            <label>
                Status
                <div className={"dropdown"}>
                    <FontAwesomeIcon className={"faChevronDown"} icon={faChevronDown}/>
                    <select >
                        <option>Waiting</option>
                        <option>Scheduled</option>
                        <option>Completed</option>
                        <option>Canceled</option>
                    </select>
                </div>
            </label>

            <label>
                Invoice #
                <input type={"text"} name={"invoice"} />
            </label>
            <label>
                Total Bill
                <input type={"number"} name={"totalBill"} />
            </label>
            <label className={"text-center"}>
                Paid?
                <input className={"checkbox"} type={"checkbox"} name={"isPaid"} />
            </label>
        </div>
    )
}

export default JobSection;