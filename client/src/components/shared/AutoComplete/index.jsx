import { useState } from "react";
import { useCustomers } from "../../../hooks";
import './style.scss';

const AutoComplete = ({ setCustomer, setSubmissionType }) => {
  const { data } = useCustomers()
  const [activeSuggestion, setActiveSuggestion] = useState(0); // index of a selected suggestion
  const [filteredSuggestions, setFilteredSuggestions] = useState([]); // an array of suggestions matching user input
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [userInput, setUserInput] = useState("");

  const onChange = e => {
    const suggestions = data.data;
    const userInput = e.target.value;
    const filtered = suggestions.filter(suggestion => suggestion.businessName.toLowerCase().indexOf(userInput.toLowerCase()) > -1);
    setActiveSuggestion(0);
    setFilteredSuggestions(filtered);
    setShowSuggestions(true);
    setUserInput(e.target.value);
  }

  const onClick = e => {
    let customer = data.data.filter(customer => customer._id === e.target.dataset.id);
    setActiveSuggestion(0);
    setFilteredSuggestions([]);
    setShowSuggestions(false);
    setUserInput(customer[0].businessName)
    setSubmissionType("add");
    setCustomer(customer[0]);
  }

  const onKeyDown = e => {
    if (e.keyCode === 13) {
      setActiveSuggestion(0);
      setShowSuggestions(false);
      setUserInput(filteredSuggestions[activeSuggestion]);
    } else if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        return;
      }
      setActiveSuggestion(activeSuggestion - 1);
    } else if (e.keyCode === 40) {
      if (activeSuggestion - 1 === filteredSuggestions.length) {
        return;
      }
      setActiveSuggestion(activeSuggestion + 1);
    }
  }

  let suggestionsListComponent;

  if (showSuggestions && userInput) {
    if (filteredSuggestions.length) {
      suggestionsListComponent = (
        <ul className="suggestions">
          {filteredSuggestions.map((suggestion, index) => {
            let className;

            // Flag the active suggestion with a class
            if (index === activeSuggestion) {
              className = "suggestion-active";
            }
            return (
              <li className={className} key={suggestion._id} data-id={suggestion._id} onClick={onClick}>
                {suggestion.businessName} - {suggestion.address.street1}, {suggestion.address.city}
              </li>
            );
          })}
        </ul>
      );
    }
  }

  return (
      <>
        <input
            type="text"
            placeholder="Business Name"
            name={"businessName"}
            onChange={onChange}
            onKeyDown={onKeyDown}
            value={userInput}
            required
        />
        {filteredSuggestions.length ? suggestionsListComponent : ""}
      </>
  );
}

export default AutoComplete;
