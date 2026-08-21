
type Bar = {
    query: string,
    onSearchChnage: (value: string) => void
}
function SearchBar(props : {search : Bar}) {
    const {query, onSearchChnage} = props.search;
  return (
    <div>
        <input type="text" placeholder="search by name or major...." value={query} 
                onChange={(e) => onSearchChnage(e.target.value)}></input>
    </div>
  )
}

export default SearchBar