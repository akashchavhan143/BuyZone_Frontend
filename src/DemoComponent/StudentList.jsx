import React, { useState, useEffect } from "react";
import StudentCard from "./StudentCard";
import axios from "axios";

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/v1/api/students/getAll"
        );
        setStudents(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  if (loading) return <div className="loading">Loading students...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="student-list">
      {students.length > 0 ? (
        students.map((student) => (
          <StudentCard key={student.id} student={student} />
        ))
      ) : (
        <p>No students found</p>
      )}
    </div>
  );
};

export default StudentList;
