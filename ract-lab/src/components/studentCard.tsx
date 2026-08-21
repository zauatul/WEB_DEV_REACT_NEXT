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



function StudentCard(props : {student: Student}) {
    const {name, id, avatar, gpa, major, courses} = props.student;


  return (
    <>
        <div>
            <p>Name: {name}</p>
            <p>Id: {id}</p>
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