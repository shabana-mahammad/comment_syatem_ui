'use client';
import React, { useState } from 'react';
import users from '../mock/user.json';
import ReplyCard from './ReplyCard';

function getInitials(name: string): string {
  const parts = name.trim().split(' ');
  return (parts[0][0] + (parts[1]?.[0] || '')).toUpperCase();
}

interface Props {
  name: string;
  company: string;
  body: string;
  timestamp: string;
  initialVotes: number;
}

const Comment: React.FC<Props> = ({ name, company, body, timestamp, initialVotes }) => {
  const [votes, setVotes] = useState(initialVotes);
  const [showReplies, setShowReplies] = useState(true);
  const [replies, setReplies] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState(users[0]);
  const [newComment, setNewComment] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editedBody, setEditedBody] = useState(body);

  const handleReplySubmit = (text: string) => {
    const newReply = {
      id: Date.now(),
      name: selectedUser.name,
      company: selectedUser.company.name,
      body: text,
      timestamp: new Date().toISOString(),
      votes: 0,
    };
    setReplies([...replies, newReply]);
  };

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this comment?')) {
      setEditedBody('[Deleted]');
    }
  };

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4 shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
          {getInitials(name)}
        </div>
        <div className="flex flex-col">
          <div className="text-sm font-semibold text-black">{name}</div>
          <div className="text-xs text-blue-600">{company}</div>
        </div>
        <div className="ml-auto text-xs text-blue-400">
          {new Date(timestamp).toLocaleString()}
        </div>
      </div>

      {/* Body */}
      {isEditing ? (
        <textarea
          className="w-full border rounded p-2 mt-2 ml-11 bg-white text-blue-900"
          value={editedBody}
          onChange={(e) => setEditedBody(e.target.value)}
        />
      ) : (
        <p className="text-blue-900 mt-2 ml-11">{editedBody}</p>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between mt-2 ml-11 text-sm text-blue-700">
        <div className="flex items-center gap-2 text-lg">
          <button onClick={() => setVotes(votes + 1)}>👍</button>
          <button onClick={() => setVotes(votes - 1)}>👎</button>
          <span className="text-xs text-blue-500">Votes: {votes}</span>
        </div>
        <div className="flex gap-4">
          <button onClick={() => setShowReplies(!showReplies)}>
            {showReplies ? 'Hide Replies' : 'Show Replies'}
          </button>
          <button onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? 'Save' : 'Edit'}
          </button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      </div>

      {/* Replies */}
      {showReplies && (
        <div className="mt-3 ml-11 space-y-2">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-blue-800">Replying as</label>
            <select
              className="border border-blue-300 rounded px-2 py-1 text-sm bg-white text-blue-900"
              value={selectedUser.email}
              onChange={(e) => {
                const user = users.find(u => u.email === e.target.value);
                if (user) setSelectedUser(user);
              }}
            >
              {users.map(user => (
                <option key={user.email} value={user.email}>
                  {user.name} ({user.company.name})
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              className="flex-1 border border-blue-300 rounded px-2 py-1 text-sm bg-white text-blue-900"
              placeholder="Write your reply..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button
              className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition"
              onClick={() => {
                if (newComment.trim()) {
                  handleReplySubmit(newComment);
                  setNewComment('');
                }
              }}
            >
              Reply
            </button>
          </div>

          {replies.map((reply, index) => (
            <ReplyCard
              key={index}
              name={reply.name}
              company={reply.company}
              text={reply.body}
              timestamp={reply.timestamp}
              votes={reply.votes}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Comment;