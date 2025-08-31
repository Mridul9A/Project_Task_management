import React from "react";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import TaskDashboard from "./components/TaskDashboard";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="main-content">
        <Topbar />
        <main className="content-area">
          <TaskDashboard />
        </main>
      </div>
    </div>
  );
}

export default App;
