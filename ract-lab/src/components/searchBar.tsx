import { useStudents } from "../context/StudentContext";


function SearchBar() {

    const {
        query,
        setQuery
    } = useStudents();

    return (
        <div>
            <input type="text" placeholder="Search by name or major..." value={query} onChange={(e) => setQuery(e.target.value) }/>
        </div>
    );

}

export default SearchBar;