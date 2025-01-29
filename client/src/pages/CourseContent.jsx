import { Stack, For } from "@chakra-ui/react";
import Course from "@/components/Course";
import React, { useEffect, useState, useContext } from "react";
import { SearchContext } from "@/context/SearchContext";

export default function CourseContent() {
    const { searchTerm } = useContext(SearchContext);

    const [courses, setCourses] = useState([]);
    const [initialCourses, setInitialCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchInitialCourses = async () => {
        setLoading(true);
        try {
            const response = await fetch("http://localhost:3000/api/courses");
            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }
            const result = await response.json();

            setCourses(result);
            setInitialCourses(result);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchSearchedCourses = async () => {
        setLoading(true);
        try {
            const response = await fetch(
                `http://localhost:3000/api/courses?search=${searchTerm}`
            );
            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }
            const result = await response.json();

            setCourses(result);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Завантаження початкових курсів при першому рендері
    useEffect(() => {
        fetchInitialCourses();
    }, []);

    // Виконання пошуку
    useEffect(() => {
        console.log("searchTerm:", searchTerm);
        if (searchTerm.trim() === "") {
            setCourses(initialCourses);
        } else {
            fetchSearchedCourses();
        }
    }, [searchTerm]); // Слухаємо зміни searchTerm

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <Stack>
            <For each={courses}>
                {(course) => (
                    <Course
                        key={course.id}
                        id={course.id}
                        courseData={course}
                    />
                )}
            </For>
        </Stack>
    );
}

// http://localhost:3000/api/displayCourses
