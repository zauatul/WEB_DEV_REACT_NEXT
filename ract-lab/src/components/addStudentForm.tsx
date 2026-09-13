import { useEffect, useState } from "react";
import { z } from "zod";

import { useStudents } from "../context/StudentContext";


const studentSchema = z.object({

    name: z
        .string()
        .min(1, "Name is required"),

    id: z
        .string()
        .min(1, "Student ID is required")
        .regex(
            /^[0-9]+$/,
            "Student ID must be numeric"
        ),

    major: z
        .string()
        .min(1, "Major is required"),

    gpa: z
        .string()
        .min(1, "GPA is required")
        .refine(
            (value) => {
                const number =
                    Number(value);
                return (
                    !isNaN(number) &&
                    number >= 0 &&
                    number <= 4
                );
            },
            {
                message: "GPA must be between 0 and 4.0"
            }
        ),

    courses: z
        .string()
        .optional()

});


function AddStudentForm() {

    const { students, addStudent } = useStudents();
    const [name, setName] = useState("");
    const [id, setId] = useState("");
    const [major, setMajor] = useState("");
    const [gpa, setGpa] = useState("");
    const [courses, setCourses] = useState("");
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [success, setSuccess] = useState("");

    useEffect(() => {

        if (!success) {
            return;
        }
        const timer =
            setTimeout(() => {

                setSuccess("");

            }, 3000);
        return () => {
            clearTimeout(timer);
        };

    }, [success]);


    const handleSubmit = ( e: React.FormEvent<HTMLFormElement> ) => {

        e.preventDefault();
        setErrors({});
        setSuccess("");

        const result =
            studentSchema.safeParse({
                name,
                id,
                major,
                gpa,
                courses
            });



        if (!result.success) {

            const validationErrors:
                Record<string, string> = {};

            result.error.issues.forEach(
                (issue) => {
                    const field =
                        issue.path[0] as string;
                    validationErrors[field] =
                        issue.message;
                }
            );
            setErrors(validationErrors);

            return;
        }

        const numericId = Number(id);


        const idAlreadyExists = students.some(
                                    (student) =>
                                        student.id === numericId );


        if (idAlreadyExists) {
            setErrors({
                id: "Student ID already exists"
            });

            return;
        }



        const courseList = courses
                            .split(",")
                            .map((course) =>
                                course.trim())
                            .filter(
                                (course) =>
                                    course.length > 0 );


        const newStudent = {

            name: name,
            id: numericId,
            avatar: "https://i.pravatar.cc/150?img=68",
            gpa: Number(gpa),
            major: major,
            courses: courseList.map(
                (course) => ({

                    courseName: course,
                    color: "#6366f1"
                })
            )
        };

        addStudent(newStudent);

        setName("");
        setId("");
        setMajor("");
        setGpa("");
        setCourses("");

        setSuccess( "Student added successfully!" );
    };


    return (

        <div className="add-student-form">
            <h2>
                Add New Student
            </h2>

            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Full Name
                    </label>
                    <input type="text" value={name}  onChange={(e) => setName(e.target.value) }/>
                    {errors.name && (

                        <p className="error">
                            {errors.name}
                        </p>

                    )}
                </div>

                <div>
                    <label>
                        Student ID
                    </label>

                    <input type="text" value={id} onChange={(e) => setId(e.target.value) }/>

                    {errors.id && (
                        <p className="error">
                            {errors.id}
                        </p>
                    )}

                </div>

                <div>
                    <label>
                        Major
                    </label>
                    <input type="text" value={major} onChange={(e) => setMajor(e.target.value) } />

                    {errors.major && (

                        <p className="error">
                            {errors.major}
                        </p>

                    )}

                </div>

                <div>
                    <label>
                        GPA
                    </label>
                    <input type="number" step="0.01" min="0" max="4" value={gpa} onChange={(e) => setGpa(e.target.value) } />

                    {errors.gpa && (

                        <p className="error">
                            {errors.gpa}
                        </p>

                    )}

                </div>

                <div>
                    <label>
                        Courses
                    </label>
                    <input type="text" placeholder="React, Node.js, Database" value={courses} onChange={(e) => setCourses(e.target.value) }/>

                    <small>
                        Separate courses with commas
                    </small>

                </div>


                <button type="submit">
                    Add Student
                </button>

            </form>

            {success && (

                <p className="success">
                    {success}
                </p>

            )}

        </div>

    );

}


export default AddStudentForm;