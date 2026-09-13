import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode
} from "react";


export type Course = {
    courseName: string;
    color: string;
};

export type Student = {
    name: string;
    id: number;
    avatar: string;
    gpa: number;
    major: string;
    courses: Course[];
};

export type SortType = | "default" | "name" | "gpa";


type StudentContextType = {

    students: Student[];
    query: string;
    sortType: SortType;
    favoriteIds: number[];
    setQuery: (query: string) => void;
    setSortType: (sort: SortType) => void;
    toggleFavorite: (id: number) => void;
    addStudent: (student: Student) => void;
    removeStudent: (id: number) => void;

};


const StudentContext = createContext< StudentContextType | undefined>(undefined);


const initialStudents: Student[] = [
    {
        name: "John Smith",
        id: 2023001,
        avatar: "https://i.pravatar.cc/150?img=12",
        gpa: 3.8,
        major: "Computer Science",

        courses: [
            {
                courseName: "React",
                color: "#61dafb"
            },
            {
                courseName: "Database",
                color: "#f59e0b"
            },
            {
                courseName: "AI",
                color: "#8b5cf6"
            }
        ]
    },

    {
        name: "Sarah Johnson",
        id: 2023002,
        avatar: "https://i.pravatar.cc/150?img=47",
        gpa: 3.9,
        major: "Software Engineering",

        courses: [
            {
                courseName: "Java",
                color: "#ef4444"
            },
            {
                courseName: "Algorithms",
                color: "#3b82f6"
            },
            {
                courseName: "Web Tech",
                color: "#10b981"
            }
        ]
    },


    {
        name: "Michael Brown",
        id: 2023003,
        avatar: "https://i.pravatar.cc/150?img=11",
        gpa: 3.6,
        major: "Information Technology",

        courses: [
            {
                courseName: "Networking",
                color: "#6366f1"
            },
            {
                courseName: "Security",
                color: "#ec4899"
            },
            {
                courseName: "Cloud",
                color: "#14b8a6"
            }
        ]
    },


    {
        name: "Emily Davis",
        id: 2023004,
        avatar: "https://i.pravatar.cc/150?img=45",
        gpa: 4.0,
        major: "Computer Science",

        courses: [
            {
                courseName: "Python",
                color: "#f97316"
            },
            {
                courseName: "Machine Learning",
                color: "#8b5cf6"
            },
            {
                courseName: "Data Science",
                color: "#06b6d4"
            }
        ]
    }

];


export function StudentProvider({ children }: { children: ReactNode}) {

    const [students, setStudents] =  useState<Student[]>([]);
    const [query, setQuery] = useState("");
    const [sortType, setSortType] = useState<SortType>("default");
    const [favoriteIds, setFavoriteIds] =  useState<number[]>([]);


    useEffect(() => {
        const savedStudents =
            localStorage.getItem("students");

        if (savedStudents) {
            const parsedStudents: Student[] =
                JSON.parse(savedStudents);
            setStudents(parsedStudents);
        }
        else {
            setStudents(initialStudents);
        }

    }, []);


    useEffect(() => {
        if (students.length > 0) {
            localStorage.setItem(
                "students",
                JSON.stringify(students)
            );
        }

    }, [students]);


    const toggleFavorite = (id: number) => {

        setFavoriteIds((previousFavorites) => {

            const alreadyFavorite =
                previousFavorites.includes(id);

            if (alreadyFavorite) {

                return previousFavorites.filter(
                    (studentId) => studentId !== id
                );
            }

            return [
                ...previousFavorites,
                id
            ];
        });
    };


    const addStudent = (student: Student) => {

        setStudents((previousStudents) => {
            return [...previousStudents, student ];
        });

    };

    const removeStudent = (id: number) => {

        setStudents((previousStudents) => {
            return previousStudents.filter(
                (student) => student.id !== id
            );
        });


        setFavoriteIds((previousFavorites) => {
            return previousFavorites.filter(
                (studentId) => studentId !== id
            );
        });

    };


    return (

        <StudentContext.Provider
            value={{ students, query, sortType, favoriteIds, setQuery, setSortType, toggleFavorite, addStudent, removeStudent }}>
            {children}
        </StudentContext.Provider>
    );

}


export function useStudents() {

    const context = useContext(StudentContext);

    if (!context) {
        throw new Error(
            "useStudents must be used inside StudentProvider"
        );
    }

    return context;

}