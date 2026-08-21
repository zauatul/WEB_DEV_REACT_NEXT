import React from 'react'
import CourseTag from './courseTag'

type Student = {
    name:string,
    id:number,
    avatar:string,
    gpa:number,
    major:string,
    courses:any
}

type StudentCard = {
    student: Student,
    isFavorite:boolean,
    onToggleFavorite:(id:number) => void;

}



function StudentCard({student, isFavorite, onToggleFavorite} : StudentCard) {
    const {name, id, avatar, gpa, major, courses} = student;


  return (
    <>
        <div>
            <p>Name: {name}</p>
            <p>Id: {id}</p>
            <button onClick={()=> onToggleFavorite(id)}>{isFavorite ? "❤️" : "🤍"}</button>
            <p>Avatar: {avatar}</p>
            <p>GPA: {gpa}</p>
            <p>Major: {major}</p>

            <h4>Enrolled Courses</h4>
            {
                courses && courses.map((cr:any) => <CourseTag course={cr} />)
            }
        </div>
    </>
  )
}

export default StudentCard;