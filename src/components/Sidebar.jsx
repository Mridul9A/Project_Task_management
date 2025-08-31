import React, { useState } from "react";
import { 
  Home, 
  Inbox, 
  BarChart2, 
  CreditCard, 
  FileText, 
  Briefcase, 
  Users, 
  HeartPulse, 
  Target, 
  Ticket, 
  ChevronDown, 
  ChevronRight, 
  Plus, 
  Settings, 
  Bell 
} from "lucide-react";

const menuItems = [
  { 
    label: "My Task", 
    icon: Home, 
    id: "my-task",
    badge: 12,
    notifications: true 
  },
  { 
    label: "My inbox", 
    icon: Inbox, 
    id: "my-inbox",
    badge: 5,
    notifications: true 
  },
  { 
    label: "Insight360", 
    icon: BarChart2, 
    id: "insight360" 
  },
  { 
    label: "DashBoard", 
    icon: BarChart2, 
    id: "dashboard" 
  },
  { 
    label: "Payment", 
    icon: CreditCard, 
    id: "payment" 
  },
  { 
    label: "Contract", 
    icon: FileText, 
    id: "contract" 
  },
  { 
    label: "Opportunity", 
    icon: Briefcase, 
    id: "opportunity",
    badge: 3 
  },
  { 
    label: "Customers", 
    icon: Users, 
    id: "customers" 
  },
  { 
    label: "Health", 
    icon: HeartPulse, 
    id: "health" 
  },
  { 
    label: "NIPS", 
    icon: Target, 
    id: "nips" 
  },
  { 
    label: "Tickets", 
    icon: Ticket, 
    id: "tickets",
    badge: 8 
  },
];

const viewItems = [
  { name: "Test", color: "#3b82f6", createdBy: "You" },
  { name: "Today's Work", color: "#10b981", createdBy: "Admin" },
  { name: "Digi", color: "#f59e0b", createdBy: "Team" },
  { name: "Help", color: "#ef4444", createdBy: "Support" },
];

function Sidebar({ onMenuSelect, activeMenuItem = "my-task" }) {
  const [isViewsExpanded, setIsViewsExpanded] = useState(true);
  const [selectedView, setSelectedView] = useState("");
  const [isAddingView, setIsAddingView] = useState(false);
  const [newViewName, setNewViewName] = useState("");
  const [customViews, setCustomViews] = useState(viewItems);

  const handleMenuClick = (item) => {
    if (onMenuSelect) {
      onMenuSelect(item);
    }
    
    // Show different notifications based on menu item
    switch (item.id) {
      case "my-inbox":
        alert(`Opening ${item.label} - You have ${item.badge} new messages`);
        break;
      case "opportunity":
        alert(`Opening ${item.label} - ${item.badge} new opportunities available`);
        break;
      case "tickets":
        alert(`Opening ${item.label} - ${item.badge} active tickets`);
        break;
      case "payment":
        alert("Opening Payment module - All payments up to date");
        break;
      case "dashboard":
        alert("Loading Dashboard analytics...");
        break;
      default:
        alert(`Opening ${item.label} module`);
    }
  };

  const toggleViews = () => {
    setIsViewsExpanded(!isViewsExpanded);
  };

  const handleViewClick = (view) => {
    setSelectedView(view.name);
    alert(`Switching to ${view.name} view (Created by: ${view.createdBy})`);
  };

  const handleAddView = () => {
    setIsAddingView(true);
  };

  const handleSaveNewView = () => {
    if (newViewName.trim()) {
      const newView = {
        name: newViewName.trim(),
        color: "#6366f1",
        createdBy: "You"
      };
      setCustomViews([...customViews, newView]);
      setNewViewName("");
      setIsAddingView(false);
      alert(`Created new view: ${newView.name}`);
    }
  };

  const handleCancelNewView = () => {
    setIsAddingView(false);
    setNewViewName("");
  };

  const handleDeleteView = (viewName, e) => {
    e.stopPropagation();
    if (confirm(`Delete view "${viewName}"?`)) {
      setCustomViews(customViews.filter(v => v.name !== viewName));
      if (selectedView === viewName) {
        setSelectedView("");
      }
      alert(`Deleted view: ${viewName}`);
    }
  };

  return (
    <aside className="sidebar">
      <div className="logo">
        <span className="logo-text">DEXKOR</span>
        <button className="logo-settings" title="Settings">
          <Settings size={16} />
        </button>
      </div>

      <nav className="menu">
        {menuItems.map((item) => (
          <div 
            key={item.id} 
            className={`menu-item ${activeMenuItem === item.id ? "active" : ""}`}
            onClick={() => handleMenuClick(item)}
          >
            <item.icon size={18} className="icon" />
            <span className="menu-label">{item.label}</span>
            {item.badge && (
              <span className="menu-badge">{item.badge}</span>
            )}
            {item.notifications && (
              <Bell size={12} className="notification-icon" />
            )}
          </div>
        ))}
      </nav>

      <div className="views-section">
        <div className="views-header" onClick={toggleViews}>
          <span>Views</span>
          <div className="views-actions">
            <button 
              className="add-view-btn" 
              onClick={(e) => {
                e.stopPropagation();
                handleAddView();
              }}
              title="Add new view"
            >
              <Plus size={14} />
            </button>
            {isViewsExpanded ? 
              <ChevronDown size={16} /> : 
              <ChevronRight size={16} />
            }
          </div>
        </div>

        {isViewsExpanded && (
          <div className="views-list">
            {customViews.map((view, idx) => (
              <div 
                key={idx}
                className={`view-item ${selectedView === view.name ? "active" : ""}`}
                onClick={() => handleViewClick(view)}
              >
                <div className="view-content">
                  <div 
                    className="view-indicator" 
                    style={{ backgroundColor: view.color }}
                  ></div>
                  <span className="view-name">{view.name}</span>
                </div>
                <div className="view-actions">
                  <span className="view-creator">{view.createdBy}</span>
                  {view.createdBy === "You" && (
                    <button 
                      className="delete-view-btn"
                      onClick={(e) => handleDeleteView(view.name, e)}
                      title="Delete view"
                    >
                      ×
                    </button>
                  )}
                </div>
              </div>
            ))}

            {isAddingView && (
              <div className="add-view-form">
                <input
                  type="text"
                  value={newViewName}
                  onChange={(e) => setNewViewName(e.target.value)}
                  placeholder="View name..."
                  className="view-input"
                  autoFocus
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') handleSaveNewView();
                    if (e.key === 'Escape') handleCancelNewView();
                  }}
                />
                <div className="view-form-actions">
                  <button 
                    className="save-view-btn" 
                    onClick={handleSaveNewView}
                    disabled={!newViewName.trim()}
                  >
                    ✓
                  </button>
                  <button 
                    className="cancel-view-btn" 
                    onClick={handleCancelNewView}
                  >
                    ×
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="sidebar-footer">
        <div className="user-info">
          <div className="user-avatar">S</div>
          <div className="user-details">
            <span className="user-name">Shashank</span>
            <span className="user-role">Admin</span>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;