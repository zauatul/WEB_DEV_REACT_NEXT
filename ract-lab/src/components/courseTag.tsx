
type Course = {
    courseName: string,
    color: string
}

function CourseTag(props : { course: Course}) {
    const {courseName, color} = props.course;
  return (
    <>
        <span style={{
            backgroundColor: color,
            padding: "5px 10px",
            borderRadius: "15px",
            marginRight: "5px",
            color: "white",
            display: "inline-block",
        }}>
            {courseName}
        </span>

    </>
  )
}

export default CourseTag