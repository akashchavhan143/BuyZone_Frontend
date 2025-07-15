import React from "react";

const StudentCard = ({ student }) => {
  return (
    <div className="student-card">
      <div className="student-image-container">
        {student.profileImageUrl ? (
          <img
            src={student.profileImageUrl}
            alt={`${student.name}'s profile`}
            className="student-image"
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/150";
            }}
          />
        ) : (
          <div className="student-image-placeholder">
            <span>{student.name.charAt(0)}</span>
          </div>
        )}
      </div>
      <div className="student-details">
        <h3>{student.name}</h3>
        <p>
          <strong>Address:</strong> {student.address}
        </p>
        <p>
          <strong>Education:</strong> {student.education}
        </p>
      </div>
    </div>
  );
};

export default StudentCard;
