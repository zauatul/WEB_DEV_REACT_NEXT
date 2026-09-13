import {
    useStudents,
    type SortType
} from "../context/StudentContext";


function SortControls() {

    const {
        sortType,
        setSortType
    } = useStudents();


    return (

        <div>

            <span>
                Sort by:
            </span>


            <button
                onClick={() =>
                    setSortType("default")
                }
            >
                Default
            </button>


            <button
                onClick={() =>
                    setSortType("name")
                }
            >
                Name A-Z
            </button>


            <button
                onClick={() =>
                    setSortType("gpa")
                }
            >
                GPA High-Low
            </button>

        </div>

    );

}


export default SortControls;