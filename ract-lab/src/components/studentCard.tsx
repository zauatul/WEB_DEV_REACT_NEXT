import CourseTag from "./courseTag";

import {
    useStudents,
    type Student
} from "../context/StudentContext";


type StudentCardProps = {
    student: Student;
};


function StudentCard({ student }: StudentCardProps) {

    const { favoriteIds, toggleFavorite, removeStudent } = useStudents();
    const { name, id, avatar, gpa, major, courses } = student;

    const isFavorite = favoriteIds.includes(id);

    return (
        <div className="student-card">
            <img src={avatar} alt={name} width="100" />

            <p>Name: {name} </p>


            <p> ID: {id}  </p>


            <p> GPA: {gpa} </p>


            <p> Major: {major} </p>


            <button onClick={() => toggleFavorite(id) } >
                {isFavorite
                    ? "❤️"
                    : "🤍"
                }

            </button>


            <button onClick={() => removeStudent(id) } className="remove-button">
                Remove Student
            </button>

            <h4>
                Enrolled Courses
            </h4>

            <div>

                {courses.map((course) => (

                    <CourseTag
                        key={course.courseName}
                        course={course}
                    />
                ))}

            </div>

        </div>

    );

}


export default StudentCard;