import React, { useState } from "react";
import StudentList from "./DemoComponent/StudentList";
import AddStudentForm from "./DemoComponent/AddStudentForm";
import "./App.css";

function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleStudentAdded = () => {
    setRefreshKey((prevKey) => prevKey + 1);
  };

  return (
    <div className="app">
      <header>
        <h1>Student Management System</h1>
      </header>
      <main>
        <AddStudentForm onStudentAdded={handleStudentAdded} />
        <StudentList key={refreshKey} />
        <hr />
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <img
                src={
                  "http://localhost:8080/v1/api/product/fdd50fe7-e817-4de3-b006-563694b270a7.jpg"
                }
                className="img-fluid"
                alt="Banner"
                height={"300px"}
              />
            </div>
          </div>
        </div>
        {/* http://localhost:8080/v1/api/product/fdd50fe7-e817-4de3-b006-563694b270a7.jpg */}
      </main>
    </div>
  );
}

export default App;