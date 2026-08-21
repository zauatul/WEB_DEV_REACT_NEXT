import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import StudentCard from './components/studentCard'
import type { Badge } from './components/statBadge'
import StatBadge from './components/statBadge'
import DashboardHeader from './components/dashboardHeader'


type Course = {
    courseName : string,
    color : string
}

type Student = {
    name:string,
    id:number,
    avatar:string,
    gpa:number,
    major:string,
    courses:Course[]
}



function App() {

  const students: Student[] = [
    {
      name:"Nahid",
      id:1,
      avatar:"\assets\hero.png",
      gpa:3.55,
      major:"Information System",
      courses:[
        { courseName: "React", color: "#61dafb" },
        { courseName: "Database", color: "#f59e0b" },
        { courseName: "AI", color: "#8b5cf6" },
      ]
    },
    {
      name:"Nahid",
      id:2,
      avatar:"\assets\hero.png",
      gpa:3.55,
      major:"Information System",
      courses: [
        { courseName: "Java", color: "#ef4444" },
        { courseName: "Algorithms", color: "#3b82f6" },
        { courseName: "Web Tech", color: "#10b981" },
      ],
    },
    {
      name:"Nahid",
      id:3,
      avatar:"\assets\hero.png",
      gpa:3.55,
      major:"Information System",
      courses: [
        { courseName: "Networking", color: "#6366f1" },
        { courseName: "Security", color: "#ec4899" },
        { courseName: "Cloud", color: "#14b8a6" },
      ],
    },
    {
      name:"Nahid",
      id:4,
      avatar:"\assets\hero.png",
      gpa:3.55,
      major:"Information System",
      courses: [
        { courseName: "Python", color: "#f97316" },
        { courseName: "Machine Learning", color: "#8b5cf6" },
        { courseName: "Data Science", color: "#06b6d4" },
      ],
    },
  ]



  return (
    <>
      <DashboardHeader dbHeader={{title:"Student Dashboard",
                                tagline:"Track your academic journey in one place"}}  />
      <br/><br/>
      <div>
        <StatBadge badge={{label:"Total Student", value:students.length}}/>
        <StatBadge badge={{label:"Total Courses", value:"12"}}/>
        <StatBadge badge={{label:"Average GPA", value:3.45}}/>
      </div>
      <br/>
      <br/>
      {
        students && students.map((st)=><StudentCard student={st} />)
      }
    </>
  )
}

export default App
