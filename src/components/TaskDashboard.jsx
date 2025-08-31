import React, { useState, useMemo } from "react";
import Popup from "./Popup";


const allTasks = [
  {
    customer: "AVF",
    code: "V2N-1234",
    id: "TS-0465",
    title: "Test task",
    status: "Canceled",
    priority: "Medium",
    type: "Support",
    desc: "This is a test task by tariq rasheed",
    owner: "Tariq Rasheed",
    dueDate: "2024-07-30",
    createdDate: "2024-07-29"
  },
  {
    customer: "AVF",
    code: "V2N-1234",
    id: "TS-6408",
    title: "Test ticket for account care",
    status: "Completed",
    priority: "Low",
    type: "Maintenance",
    desc: "This is a test ticket",
    owner: "John Doe",
    dueDate: "2024-07-28",
    createdDate: "2024-07-25"
  },
  {
    customer: "AVF",
    code: "V2N-1234",
    id: "TS-6476",
    title: "ShashankTesting",
    status: "Pending",
    priority: "Medium",
    type: "Development",
    desc: "asdsad",
    owner: "Shashank Kumar",
    dueDate: "2024-08-05",
    createdDate: "2024-07-30"
  },
  {
    customer: "AVF",
    code: "V3N-1234",
    id: "TS-6488",
    title: "as test",
    status: "Pending",
    priority: "Critical",
    type: "Bug Fix",
    desc: "cjd",
    owner: "Alice Smith",
    dueDate: "2024-07-25",
    createdDate: "2024-07-20"
  },
  {
    customer: "TechCorp",
    code: "TC-5678",
    id: "TS-7001",
    title: "Database optimization",
    status: "Pending",
    priority: "High",
    type: "Performance",
    desc: "Optimize database queries for better performance",
    owner: "Mike Johnson",
    dueDate: "2024-08-10",
    createdDate: "2024-08-01"
  },
  {
    customer: "StartupX",
    code: "SX-9999",
    id: "TS-7002",
    title: "UI/UX improvements",
    status: "Completed",
    priority: "Medium",
    type: "Design",
    desc: "Improve user interface design",
    owner: "Sarah Wilson",
    dueDate: "2024-07-20",
    createdDate: "2024-07-10"
  },
  {
    customer: "DataSys",
    code: "DS-3456",
    id: "TS-7003",
    title: "Security audit",
    status: "Overdue",
    priority: "Critical",
    type: "Security",
    desc: "Conduct comprehensive security audit",
    owner: "David Brown",
    dueDate: "2024-07-15",
    createdDate: "2024-07-01"
  },
  {
    customer: "CloudNet",
    code: "CN-7890",
    id: "TS-7004",
    title: "Server migration",
    status: "Pending",
    priority: "High",
    type: "Infrastructure",
    desc: "Migrate servers to new data center",
    owner: "Emma Davis",
    dueDate: "2024-08-15",
    createdDate: "2024-08-02"
  },
  
];

function TaskDashboard() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [activeTab, setActiveTab] = useState("All Tasks");
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    owner: "",
    customer: "",
    status: "",
    priority: ""
  });

  const tasksPerPage = 5;

  // Filter and paginate tasks
  const filteredTasks = useMemo(() => {
    let filtered = allTasks.filter(task => {
      // Tab filtering
      if (activeTab === "Completed Tasks" && task.status !== "Completed") return false;
      if (activeTab === "Pending Tasks" && task.status !== "Pending") return false;
      if (activeTab === "Overdue Tasks" && task.status !== "Overdue") return false;

      // Dropdown filtering
      if (filters.owner && !task.owner.toLowerCase().includes(filters.owner.toLowerCase())) return false;
      if (filters.customer && task.customer !== filters.customer) return false;
      if (filters.status && task.status !== filters.status) return false;
      if (filters.priority && task.priority !== filters.priority) return false;

      return true;
    });

    return filtered;
  }, [activeTab, filters]);

  const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);
  const paginatedTasks = filteredTasks.slice(
    (currentPage - 1) * tasksPerPage,
    currentPage * tasksPerPage
  );

  // Update summary cards based on filtered data
  const updatedSummaryCards = useMemo(() => {
    const pending = allTasks.filter(t => t.status === "Pending").length;
    const overdue = allTasks.filter(t => t.status === "Overdue").length;
    const today = allTasks.filter(t => t.dueDate === new Date().toISOString().split('T')[0]).length;
    const approaching = allTasks.filter(t => {
      const due = new Date(t.dueDate);
      const today = new Date();
      const diffTime = due - today;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays <= 3 && diffDays > 0 && t.status !== "Completed";
    }).length;

    return [
      { label: "Pending Tasks", value: pending, color: "blue" },
      { label: "Overdue Tasks", value: overdue, color: "red" },
      { label: "Due For Today", value: today, color: "yellow" },
      { label: "Approaching Breach Tasks", value: approaching, color: "green" },
    ];
  }, []);

  const handleCustomerCodeClick = (task) => {
    setSelectedTask(task);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedTask(null);
  };

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
    setCurrentPage(1); // Reset to first page when changing tabs
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedTasks(paginatedTasks.map(task => task.id));
    } else {
      setSelectedTasks([]);
    }
  };

  const handleSelectTask = (taskId, isChecked) => {
    if (isChecked) {
      setSelectedTasks([...selectedTasks, taskId]);
    } else {
      setSelectedTasks(selectedTasks.filter(id => id !== taskId));
    }
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
    setCurrentPage(1); // Reset to first page when filtering
  };

  const handleReset = () => {
    setFilters({
      owner: "",
      customer: "",
      status: "",
      priority: ""
    });
    setActiveTab("All Tasks");
    setCurrentPage(1);
    setSelectedTasks([]);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleActionClick = (task, e) => {
    e.stopPropagation();
    // Create action menu
    const actions = ['Edit', 'Delete', 'Duplicate', 'Assign'];
    const action = prompt(`Choose action for ${task.id}:\n${actions.map((a, i) => `${i + 1}. ${a}`).join('\n')}`);
    
    if (action) {
      const actionIndex = parseInt(action) - 1;
      if (actionIndex >= 0 && actionIndex < actions.length) {
        alert(`${actions[actionIndex]} action for task ${task.id}`);
      }
    }
  };

  // Get unique values for filter dropdowns
  const uniqueOwners = [...new Set(allTasks.map(task => task.owner))];
  const uniqueCustomers = [...new Set(allTasks.map(task => task.customer))];
  const uniqueStatuses = [...new Set(allTasks.map(task => task.status))];
  const uniquePriorities = [...new Set(allTasks.map(task => task.priority))];

  const isAllSelected = paginatedTasks.length > 0 && selectedTasks.length === paginatedTasks.length;
  const isIndeterminate = selectedTasks.length > 0 && selectedTasks.length < paginatedTasks.length;

  return (
    <div>
      {/* Summary Cards */}
      <div className="summary-cards">
        {updatedSummaryCards.map((card, idx) => (
          <div key={idx} className={`summary-card ${card.color}`}>
            <p className="value">{card.value}</p>
            <p className="label">{card.label}</p>
          </div>
        ))}
      </div>

      {/* Tabs + Filters */}
      <div className="task-filters">
        <div className="tabs">
          <button 
            className={`tab ${activeTab === "All Tasks" ? "active" : ""}`}
            onClick={() => handleTabClick("All Tasks")}
          >
            All Tasks ({allTasks.length})
          </button>
          <button 
            className={`tab ${activeTab === "Completed Tasks" ? "active" : ""}`}
            onClick={() => handleTabClick("Completed Tasks")}
          >
            Completed Tasks ({allTasks.filter(t => t.status === "Completed").length})
          </button>
          <button 
            className={`tab ${activeTab === "Pending Tasks" ? "active" : ""}`}
            onClick={() => handleTabClick("Pending Tasks")}
          >
            Pending Tasks ({allTasks.filter(t => t.status === "Pending").length})
          </button>
          <button 
            className={`tab ${activeTab === "Overdue Tasks" ? "active" : ""}`}
            onClick={() => handleTabClick("Overdue Tasks")}
          >
            Overdue Tasks ({allTasks.filter(t => t.status === "Overdue").length})
          </button>
        </div>

        <div className="filters">
          <select 
            value={filters.owner} 
            onChange={(e) => handleFilterChange('owner', e.target.value)}
          >
            <option value="">Task Owner</option>
            {uniqueOwners.map(owner => (
              <option key={owner} value={owner}>{owner}</option>
            ))}
          </select>
          <select 
            value={filters.customer} 
            onChange={(e) => handleFilterChange('customer', e.target.value)}
          >
            <option value="">Customer</option>
            {uniqueCustomers.map(customer => (
              <option key={customer} value={customer}>{customer}</option>
            ))}
          </select>
          <select 
            value={filters.status} 
            onChange={(e) => handleFilterChange('status', e.target.value)}
          >
            <option value="">Status</option>
            {uniqueStatuses.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
          <select 
            value={filters.priority} 
            onChange={(e) => handleFilterChange('priority', e.target.value)}
          >
            <option value="">Priority</option>
            {uniquePriorities.map(priority => (
              <option key={priority} value={priority}>{priority}</option>
            ))}
          </select>
          <button className="reset-btn" onClick={handleReset}>Reset</button>
        </div>
      </div>

      {/* Selected Tasks Actions */}
      {selectedTasks.length > 0 && (
        <div className="bulk-actions">
          <span>{selectedTasks.length} task(s) selected</span>
          <button onClick={() => alert(`Bulk delete ${selectedTasks.length} tasks`)}>
            Delete Selected
          </button>
          <button onClick={() => alert(`Bulk update ${selectedTasks.length} tasks`)}>
            Update Status
          </button>
          <button onClick={() => alert(`Export ${selectedTasks.length} tasks`)}>
            Export
          </button>
        </div>
      )}

      {/* Task Table */}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>
                <input 
                  type="checkbox" 
                  checked={isAllSelected}
                  ref={input => {
                    if (input) input.indeterminate = isIndeterminate;
                  }}
                  onChange={handleSelectAll}
                />
              </th>
              <th>Customer Name</th>
              <th>Customer Code</th>
              <th>Task ID</th>
              <th>Title</th>
              <th>Status</th>
              <th>Priority</th>
              <th>Type</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedTasks.length === 0 ? (
              <tr>
                <td colSpan="10" className="no-data">
                  No tasks found matching your criteria
                </td>
              </tr>
            ) : (
              paginatedTasks.map((task) => (
                <tr key={task.id} className={selectedTasks.includes(task.id) ? 'selected-row' : ''}>
                  <td>
                    <input 
                      type="checkbox" 
                      checked={selectedTasks.includes(task.id)}
                      onChange={(e) => handleSelectTask(task.id, e.target.checked)}
                    />
                  </td>
                  <td>{task.customer}</td>
                  <td>
                    <span 
                      className="customer-code-link" 
                      onClick={() => handleCustomerCodeClick(task)}
                    >
                      {task.code}
                    </span>
                  </td>
                  <td>
                    <span 
                      className="task-id-link"
                      onClick={() => handleCustomerCodeClick(task)}
                    >
                      {task.id}
                    </span>
                  </td>
                  <td>{task.title}</td>
                  <td>
                    <span className={`status ${task.status.toLowerCase()}`}>
                      {task.status}
                    </span>
                  </td>
                  <td>
                    <span className={`priority ${task.priority.toLowerCase()}`}>
                      {task.priority}
                    </span>
                  </td>
                  <td>{task.type}</td>
                  <td className="description-cell">{task.desc}</td>
                  <td>
                    <button 
                      className="action-btn" 
                      onClick={(e) => handleActionClick(task, e)}
                      title="More actions"
                    >
                      ⋮
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="pagination">
        <button 
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          ‹
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
          <button 
            key={page}
            className={currentPage === page ? "active" : ""}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </button>
        ))}
        <button 
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          ›
        </button>
        <span className="pagination-info">
          Showing {((currentPage - 1) * tasksPerPage) + 1}-{Math.min(currentPage * tasksPerPage, filteredTasks.length)} of {filteredTasks.length} tasks
        </span>
      </div>

      {/* Popup */}
      <Popup 
        isOpen={isPopupOpen} 
        onClose={handleClosePopup} 
        task={selectedTask} 
      />
    </div>
  );
}

export default TaskDashboard;