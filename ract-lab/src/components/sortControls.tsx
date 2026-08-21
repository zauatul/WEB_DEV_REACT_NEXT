
export type SortType = "default" | "name" | "gpa";

type SortControl ={
    sortType:SortType,
    onSortChange: (sort: SortType) => void;
}
function SortControls({sortType, onSortChange} : SortControl) {
  return (
    <>
        <span>Sort by:</span>

        <button
            onClick={() => onSortChange("default")}
        >
            Default
        </button>

        <button
            onClick={() => onSortChange("name")}
        >
            Name A–Z
        </button>

        <button
            onClick={() => onSortChange("gpa")}
        >
            GPA High–Low
        </button>
    </>
  )
}

export default SortControls