import { useEffect, useState } from 'react'
import './App.css'
import StudentCard from './components/studentCard'
import StatBadge from './components/statBadge'
import DashboardHeader from './components/dashboardHeader'
import SearchBar from './components/searchBar'
import LoadingSpinner from './components/loadingSpinner'
import SortControls from './components/sortControls'


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
type SortType = "default" | "name" | "gpa";


function App() {

  const studentsArray: Student[] = [
        {
          name: "John Smith",
          id: 2023001,
          avatar: "https://i.pravatar.cc/150?img=12",
          gpa: 3.8,
          major: "Computer Science",
          // credits: 90,
          courses: [
            { courseName: "React", color: "#61dafb" },
            { courseName: "Database", color: "#f59e0b" },
            { courseName: "AI", color: "#8b5cf6" },
          ],
        },

        {
          name: "Sarah Johnson",
          id: 2023002,
          avatar: "https://i.pravatar.cc/150?img=47",
          gpa: 3.9,
          major: "Software Engineering",
          // credits: 84,
          courses: [
            { courseName: "Java", color: "#ef4444" },
            { courseName: "Algorithms", color: "#3b82f6" },
            { courseName: "Web Tech", color: "#10b981" },
          ],
        },

        {
          name: "Michael Brown",
          id: 2023003,
          avatar: "https://i.pravatar.cc/150?img=11",
          gpa: 3.6,
          major: "Information Technology",
          // credits: 78,
          courses: [
            { courseName: "Networking", color: "#6366f1" },
            { courseName: "Security", color: "#ec4899" },
            { courseName: "Cloud", color: "#14b8a6" },
          ],
        },

        {
          name: "Emily Davis",
          id: 2023004,
          avatar: "https://i.pravatar.cc/150?img=45",
          gpa: 4.0,
          major: "Computer Science",
          // credits: 96,
          courses: [
            { courseName: "Python", color: "#f97316" },
            {
              courseName: "Machine Learning",
              color: "#8b5cf6",
            },
            {
              courseName: "Data Science",
              color: "#06b6d4",
            },
          ],
        },
      ];

  const [query, setQuery] = useState("");
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortType, setSortType] = useState<SortType>("default");

  useEffect(()=>{
    const timer = setTimeout(()=>{
      const studentsData : Student[] = studentsArray;
      setStudents(studentsData);
      setLoading(false);
    }, 1500)
    return () => clearTimeout(timer);
  },[])

  

  const filteredStudent = students.filter((st) => {
    const searchedValue = query.toLowerCase();
    return(
      st.name.toLowerCase().includes(searchedValue) ||
      st.major.toLowerCase().includes(searchedValue) 
    )
  })

  useEffect(()=>{
    document.title = `Dashboard — ${filteredStudent.length} Students`;
  },[filteredStudent.length]);


  const toggleFavorite = (id: number) =>{
    const isAlreadyExist: boolean = favoriteIds.includes(id);

    if(isAlreadyExist){
      const updatedFavorites = favoriteIds.filter((stId)=>{
        return stId != id
      })
      setFavoriteIds(updatedFavorites);
    }
    else{
      const updatedFavorites = [
        ...favoriteIds,
        id
      ]
      setFavoriteIds(updatedFavorites);
    }
  }

  const displayedStudents = [...filteredStudent];
  

  if (sortType === "name") {
    displayedStudents.sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  }

  if (sortType === "gpa") {
    displayedStudents.sort(
      (a, b) => b.gpa - a.gpa
    );
  }

  


  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <DashboardHeader dbHeader={{title:"Student Dashboard",
                                tagline:"Track your academic journey in one place"}}  />
      <br/><br/>
      <div>
        <StatBadge badge={{label:"Total Student", value:displayedStudents.length}}/>
        <StatBadge badge={{label:"Total Courses", value:"12"}}/>
        <StatBadge badge={{label:"Average GPA", value:3.45}}/>
      </div>
      <div>
        <SearchBar search={{query:query,onSearchChnage:setQuery}}/>
      </div>
      <br/>
      <SortControls sortType={sortType} onSortChange={setSortType}/>
      <br/>
      <br/>
      {
        displayedStudents && displayedStudents.map((st)=><StudentCard student={st} isFavorite={favoriteIds.includes(st.id)} onToggleFavorite={toggleFavorite}/>)
      }
    </>
  )
}


export default App
