import { useEffect } from "react";

import "./App.css";

import DashboardHeader
    from "./components/dashboardHeader";

import StatBadge
    from "./components/statBadge";

import SearchBar
    from "./components/searchBar";

import SortControls
    from "./components/sortControls";

import StudentCard
    from "./components/studentCard";

import AddStudentForm
    from "./components/addStudentForm";

import {
    useStudents
} from "./context/StudentContext";


function App() {

    const {
        students,
        query,
        sortType
    } = useStudents();


    // =====================================
    // Search
    // =====================================

    const filteredStudents =
        students.filter((student) => {

            const searchedValue =
                query.toLowerCase();


            return (

                student.name
                    .toLowerCase()
                    .includes(searchedValue)

                ||

                student.major
                    .toLowerCase()
                    .includes(searchedValue)

            );

        });


    // =====================================
    // Sort
    // =====================================

    const displayedStudents =
        [...filteredStudents];


    if (sortType === "name") {

        displayedStudents.sort(
            (studentA, studentB) => {

                const nameA =
                    studentA.name;

                const nameB =
                    studentB.name;


                return nameA.localeCompare(
                    nameB
                );

            }
        );

    }


    if (sortType === "gpa") {

        displayedStudents.sort(
            (studentA, studentB) => {

                const gpaA =
                    studentA.gpa;

                const gpaB =
                    studentB.gpa;


                return gpaB - gpaA;

            }
        );

    }


    // =====================================
    // Document title
    // =====================================

    useEffect(() => {

        document.title =
            `Dashboard — ${displayedStudents.length} Students`;

    }, [displayedStudents.length]);


    // =====================================
    // UI
    // =====================================

    return (

        <>

            <DashboardHeader
                dbHeader={{
                    title:
                        "Student Dashboard",

                    tagline:
                        "Track your academic journey in one place"
                }}
            />


            <main>

                {/* Statistics */}

                <div>

                    <StatBadge
                        badge={{
                            label:
                                "Total Students",

                            value:
                                students.length
                        }}
                    />


                    <StatBadge
                        badge={{
                            label:
                                "Showing",

                            value:
                                displayedStudents.length
                        }}
                    />


                    <StatBadge
                        badge={{
                            label:
                                "Total Courses",

                            value:
                                students.reduce(
                                    (
                                        total,
                                        student
                                    ) =>
                                        total +
                                        student.courses.length,
                                    0
                                )
                        }}
                    />

                </div>


                {/* Add Student */}

                <AddStudentForm />


                {/* Search */}

                <SearchBar />


                {/* Sort */}

                <SortControls />


                {/* Students */}

                <section id="students">

                    <h2>
                        Students
                    </h2>


                    {displayedStudents.length === 0 ? (

                        <p>
                            No students found.
                        </p>

                    ) : (

                        displayedStudents.map(
                            (student) => (

                                <StudentCard
                                    key={student.id}
                                    student={student}
                                />

                            )
                        )

                    )}

                </section>

            </main>

        </>

    );

}


export default App;