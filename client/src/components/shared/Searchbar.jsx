import { useRef } from "react";

const Searchbar = ({ heading, subheading, placeholder, setSearch }) => {
  const search = useRef();

  const searchJobs = e => {
    e.preventDefault();
    setSearch(search.current.value);
  }

  return (
    <div id="search-bar">
      <h5 className="text-center">{heading}</h5>
      <p className="text-center">{subheading}</p>
      <form onSubmit={searchJobs}>
        <input className="form-control text-center w-50 mx-auto" 
          type="text" 
          placeholder={placeholder}
          ref={search} />
      </form>
    </div>
  )
}

export default Searchbar;