import React,{useState} from 'react'
import classes from "./search.module.css"

const Search = (props) => {

  const [searchKey, setSearchKey] = useState("");

    const handleClick = () => {
        props.filterMovies(searchKey)
    }  

    return (
        <div className={classes.searchDiv}>
             <input
          name="searchKey"
          value={searchKey}
          onChange={(e) => setSearchKey(e.target.value)}
          type="text"
          placeholder="Search your favourite movie"
        />
        <button onClick={handleClick}>Search</button> 
        </div>
    )
}

export default Search
