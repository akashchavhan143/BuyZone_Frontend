import React, { useState } from "react";
import axios from "axios";

const AddStudentForm = ({ onStudentAdded }) => {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    setIsUploading(true);

    const formData = new FormData();
    formData.append("profileImage", file);

    try {
      const response = await axios.post(
        "http://localhost:8080/v1/api/students/add",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      onStudentAdded(response.data);
      setFile(null);
    } catch (error) {
      console.error("Error uploading student:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="add-student-form">
      <h2>Add New Student</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="profileImage">Profile Image:</label>
          <input
            type="file"
            id="profileImage"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
        <button type="submit" disabled={!file || isUploading}>
          {isUploading ? "Uploading..." : "Add Student"}
        </button>
      </form>
    </div>
  );
};

export default AddStudentForm;
