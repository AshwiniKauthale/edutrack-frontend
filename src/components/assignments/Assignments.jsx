import React from "react";
import "./Assignments.css";

const Assignments = () => {
  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1>Assignments</h1>
          <p>Manage and track student assignments</p>
        </div>

        <button className="primary-btn">
          + Add Assignment
        </button>
      </div>

      <div className="content-card">
        <div className="empty-state">
          <div className="empty-icon">📚</div>

          <h2>Assignments</h2>

          <p>
            Create, manage and track assignments for your students.
          </p>

          <button className="primary-btn">
            + Add Assignment
          </button>
        </div>
      </div>
    </div>
  );
};

export default Assignments;