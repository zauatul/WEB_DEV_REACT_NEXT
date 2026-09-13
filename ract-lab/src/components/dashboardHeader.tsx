import { useTheme } from "../context/ThemeContext";
import { useStudents } from "../context/StudentContext";


type Header = {
    title: string;
    tagline: string;
};


function DashboardHeader(props: { dbHeader: Header}) 
{
    const { title, tagline } = props.dbHeader;
    const { theme, toggleTheme } = useTheme();
    const {favoriteIds} = useStudents();

    return (

        <div className="dashboard-header">

            <h1> {title}</h1>


            <p>{tagline}</p>

            <nav>
                <a href="#dashboard">
                    Dashboard
                </a>

                <a href="#students">
                    Students
                </a>

                <a href="#courses">
                    Courses
                </a>

                <a href="#profile">
                    Profile
                </a>
            </nav>


            <div>
                ❤️ Favorites:
                {" "}
                {favoriteIds.length}
            </div>

            <button onClick={toggleTheme}>
                {theme === "light"
                    ? "🌙 Dark Mode"
                    : "☀️ Light Mode"
                }
            </button>

        </div>

    );

}


export default DashboardHeader;