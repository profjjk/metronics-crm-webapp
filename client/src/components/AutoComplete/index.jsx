import { useState } from "react";
import { useQueryClient } from 'react-query';
import { useCustomers } from "../../react-query";
import './style.scss';

const AutoComplete = () => {
  const queryClient = useQueryClient();
  const { data } = useCustomers()
  const [activeSuggestion, setActiveSuggestion] = useState(0);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
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
    queryClient.setQueryData('submissionType', 'add');
    queryClient.setQueryData('selectedCustomer', customer[0]);
    setUserInput(customer[0].businessName);
    setActiveSuggestion(0);
    setFilteredSuggestions([]);
    setShowSuggestions(false);
  }

  /* const onKeyDown = e => {
    if (e.keyCode === 13) {
      let customer = filteredSuggestions[activeSuggestion];
      queryClient.setQueryData('submissionType', 'add');
      queryClient.setQueryData('selectedCustomer', filteredSuggestions[activeSuggestion]);
      setUserInput(customer.businessName);
      setActiveSuggestion(0);
      setShowSuggestions(false);
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
  } */

  let suggestionsListComponent;

  if (showSuggestions && userInput) {
    if (filteredSuggestions.length) {
      suggestionsListComponent = (
        <ul className="suggestions">
          {filteredSuggestions.map((suggestion, index) => {
            let className;

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
            // onKeyDown={onKeyDown}
            value={userInput}
            required
        />
        {filteredSuggestions.length ? suggestionsListComponent : ""}
      </>
  );
}

export default AutoComplete;

// BUG: if AutoComplete suggestion selected using a click event && then user hits the 'enter' key to submit form... crash and burn.