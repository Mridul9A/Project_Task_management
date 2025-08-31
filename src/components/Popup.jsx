import React, { useState } from 'react';

function Popup({ isOpen, onClose, task }) {
  const [activeTab, setActiveTab] = useState('Description');
  const [description, setDescription] = useState('');
  const [notes, setNotes] = useState('');
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  // Initialize description when task changes
  React.useEffect(() => {
    if (task) {
      setDescription(task.desc || '');
    }
  }, [task]);

  if (!isOpen || !task) return null;

  const handleSave = () => {
    if (activeTab === 'Description') {
      // Save description logic
      alert('Description saved successfully!');
    } else if (activeTab === 'Notes') {
      // Save notes logic
      alert('Notes saved successfully!');
    }
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment = {
        id: Date.now(),
        text: newComment,
        author: 'Current User',
        timestamp: new Date().toLocaleString(),
      };
      setComments([...comments, comment]);
      setNewComment('');
    }
  };

  const handleDeleteComment = (commentId) => {
    setComments(comments.filter(c => c.id !== commentId));
  };

  const formatText = (type) => {
    const textarea = document.querySelector('.description-textarea');
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = description.substring(start, end);
    
    if (selectedText) {
      let formattedText = selectedText;
      switch (type) {
        case 'bold':
          formattedText = `**${selectedText}**`;
          break;
        case 'italic':
          formattedText = `*${selectedText}*`;
          break;
        case 'underline':
          formattedText = `__${selectedText}__`;
          break;
        default:
          break;
      }
      
      const newDescription = description.substring(0, start) + formattedText + description.substring(end);
      setDescription(newDescription);
    }
  };

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Description':
        return (
          <div className="description-section">
            <div className="description-toolbar">
              <button onClick={() => formatText('bold')} title="Bold">B</button>
              <button onClick={() => formatText('italic')} title="Italic">I</button>
              <button onClick={() => formatText('underline')} title="Underline">U</button>
              <button title="Align">≡</button>
              <button title="Attach">📎</button>
              <button className="save-btn" onClick={handleSave}>Save</button>
            </div>
            <textarea 
              className="description-textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter task description..."
            />
          </div>
        );

      case 'Notes':
        return (
          <div className="notes-section">
            <div className="description-toolbar">
              <button onClick={() => formatText('bold')} title="Bold">B</button>
              <button onClick={() => formatText('italic')} title="Italic">I</button>
              <button onClick={() => formatText('underline')} title="Underline">U</button>
              <button title="Align">≡</button>
              <button title="Attach">📎</button>
              <button className="save-btn" onClick={handleSave}>Save</button>
            </div>
            <textarea 
              className="description-textarea"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add your notes here..."
            />
          </div>
        );

      case 'Events':
        return (
          <div className="events-section">
            <div className="event-list">
              <div className="event-item">
                <div className="event-icon">📅</div>
                <div className="event-details">
                  <p><strong>Task Created</strong></p>
                  <p className="event-time">29 Jul 2024, 10:30 AM</p>
                  <p className="event-desc">Task was created by tariq rasheed</p>
                </div>
              </div>
              <div className="event-item">
                <div className="event-icon">🔄</div>
                <div className="event-details">
                  <p><strong>Status Changed</strong></p>
                  <p className="event-time">29 Jul 2024, 2:15 PM</p>
                  <p className="event-desc">Status changed from "New" to "{task.status}"</p>
                </div>
              </div>
              <div className="event-item">
                <div className="event-icon">👤</div>
                <div className="event-details">
                  <p><strong>Assigned</strong></p>
                  <p className="event-time">29 Jul 2024, 3:45 PM</p>
                  <p className="event-desc">Task assigned to current owner</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'Tickets':
        return (
          <div className="tickets-section">
            <div className="tickets-header">
              <h4>Related Tickets</h4>
              <button className="add-ticket-btn">+ Add Ticket</button>
            </div>
            <div className="ticket-list">
              <div className="ticket-item">
                <div className="ticket-info">
                  <p><strong>#{task.id}-001</strong></p>
                  <p>Customer support ticket</p>
                  <p className="ticket-time">Created: 29 Jul 2024</p>
                </div>
                <span className="status completed">Resolved</span>
              </div>
              <div className="ticket-item">
                <div className="ticket-info">
                  <p><strong>#{task.id}-002</strong></p>
                  <p>Follow-up ticket</p>
                  <p className="ticket-time">Created: 30 Jul 2024</p>
                </div>
                <span className="status pending">Open</span>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className={`popup-container ${isExpanded ? 'expanded' : ''}`} onClick={(e) => e.stopPropagation()}>
        <div className="popup-header">
          <div className="popup-title">
            <div className="popup-avatar">A</div>
            <span>{task.customer} - {task.id}</span>
          </div>
          <div className="popup-actions">
            <button className="popup-expand" onClick={handleExpand} title={isExpanded ? 'Minimize' : 'Expand'}>
              {isExpanded ? '⤡' : '⤢'}
            </button>
            <button className="popup-close" onClick={onClose} title="Close">×</button>
          </div>
        </div>

        <div className="popup-content">
          <div className="popup-main-info">
            <h3>Task name: {task.title}</h3>
            
            <div className="popup-details">
              <div className="detail-item">
                <span className="detail-label">Due date:</span>
                <span className="detail-value">29 Jul 2024</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Created date:</span>
                <span className="detail-value">29 Jul 2024</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Status:</span>
                <span className={`status ${task.status.toLowerCase()}`}>{task.status}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Priority:</span>
                <span className={`priority ${task.priority.toLowerCase()}`}>{task.priority}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Owner:</span>
                <div className="owner-info">
                  <div className="owner-avatar">T</div>
                  <span>tariq@Mailsrr...</span>
                </div>
              </div>
            </div>
          </div>

          <div className="popup-tabs">
            <div className="popup-tab-buttons">
              <button 
                className={`popup-tab ${activeTab === 'Description' ? 'active' : ''}`}
                onClick={() => setActiveTab('Description')}
              >
                Description
              </button>
              <button 
                className={`popup-tab ${activeTab === 'Notes' ? 'active' : ''}`}
                onClick={() => setActiveTab('Notes')}
              >
                Notes
              </button>
              <button 
                className={`popup-tab ${activeTab === 'Events' ? 'active' : ''}`}
                onClick={() => setActiveTab('Events')}
              >
                Events
              </button>
              <button 
                className={`popup-tab ${activeTab === 'Tickets' ? 'active' : ''}`}
                onClick={() => setActiveTab('Tickets')}
              >
                Tickets
              </button>
            </div>

            <div className="popup-tab-content">
              {renderTabContent()}

              {/* Comments Section - Show on all tabs */}
              <div className="comments-section">
                <div className="comments-header">
                  <h4>Comments</h4>
                </div>
                
                {comments.length === 0 ? (
                  <div className="no-comments">
                    <div className="comment-icon">💬</div>
                    <p>No comments yet</p>
                    <p>Be the first to add a comment</p>
                  </div>
                ) : (
                  <div className="comments-list">
                    {comments.map((comment) => (
                      <div key={comment.id} className="comment-item">
                        <div className="comment-avatar">U</div>
                        <div className="comment-content">
                          <div className="comment-header">
                            <span className="comment-author">{comment.author}</span>
                            <span className="comment-time">{comment.timestamp}</span>
                            <button 
                              className="comment-delete"
                              onClick={() => handleDeleteComment(comment.id)}
                            >
                              🗑️
                            </button>
                          </div>
                          <p className="comment-text">{comment.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="add-comment">
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment..."
                    className="comment-input"
                  />
                  <button 
                    className="add-comment-btn"
                    onClick={handleAddComment}
                    disabled={!newComment.trim()}
                  >
                    Add Comment
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Popup;