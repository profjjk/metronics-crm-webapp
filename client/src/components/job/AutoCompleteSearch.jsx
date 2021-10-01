import { useState } from "react";
import { useCustomers } from "../../hooks";

const AutoCompleteSearch = ({ setCustomer, setFound }) => {
  const { data } = useCustomers()
  const [activeSuggestion, setActiveSuggestion] = useState(0); // index of a selected suggestion
  const [filteredSuggestions, setFilteredSuggestions] = useState([]); // an array of suggestions matching user input
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [userInput, setUserInput] = useState("");

  const onChange = e => {
    const suggestions = data.data.map(customer => customer.businessName.toLowerCase());
    const userInput = e.target.value;
    const filtered = suggestions.filter(
      suggestion => suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );

    setActiveSuggestion(0);
    setFilteredSuggestions(filtered);
    setShowSuggestions(true);
    setUserInput(e.target.value);
  }

  const onClick = e => {
    setActiveSuggestion(0);
    setFilteredSuggestions([]);
    setShowSuggestions(false);
    setUserInput(e.target.innerText);
    setFound(true);
    let customer = data.data.filter(customer => customer.businessName.toLowerCase() === e.target.innerText.toLowerCase());
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
        <ul className="suggestions mx-auto">
          {filteredSuggestions.map((suggestion, index) => {
            let className;

            // Flag the active suggestion with a class
            if (index === activeSuggestion) {
              className = "suggestion-active";
            }
            return (
              <li className={className} key={suggestion} onClick={onClick}>
                {suggestion}
              </li>
            );
          })}
        </ul>
      );
    }
  } else {
    suggestionsListComponent = (
      <div className="no-suggestions text-center">
        <em>No suggestions available.</em>
      </div>
    );
  }

  return (
    <div id="search-bar">
      <h5 className="text-center">Customer Search</h5>
      <p className="text-center">Search for existing customers</p>
      <input
        className="form-control text-center w-50 mx-auto"
        type="text"
        placeholder="business name"
        onChange={onChange}
        onKeyDown={onKeyDown}
        value={userInput}
      />
      {filteredSuggestions.length ? suggestionsListComponent : ""}
    </div>
  );
}

export default AutoCompleteSearch;
