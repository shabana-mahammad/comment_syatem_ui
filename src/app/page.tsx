'use client';
import { useState, useEffect } from 'react';
import users from '../mock/user.json';
import { getEnrichedComments } from '../utils/mergeComments';
import Comment from '../components/Comment';

type CommentType = {
  id: number;
  name: string;
  email: string;
  company: string;
  body: string;
  timestamp: string;
  votes: number;
};

export default function Page() {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [newComment, setNewComment] = useState('');
  const [selectedUser, setSelectedUser] = useState(users[0]);
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');

  useEffect(() => {
    setComments(getEnrichedComments());
  }, []);

  const handleSubmit = () => {
    if (!newComment.trim()) return;

    const newEntry: CommentType = {
      id: Date.now(),
      name: selectedUser.name,
      email: selectedUser.email,
      company: selectedUser.company.name,
      body: newComment,
      timestamp: new Date().toISOString(),
      votes: 0,
    };

    setComments([newEntry, ...comments]);
    setNewComment('');
  };

  const sortedComments = [...comments].sort((a, b) => {
    const timeA = new Date(a.timestamp).getTime();
    const timeB = new Date(b.timestamp).getTime();
    return sortOrder === 'newest' ? timeB - timeA : timeA - timeB;
  });

  return (
    <main className="flex justify-center px-4 py-6 min-h-screen bg-gradient-to-br from-blue-100 via-blue-300 to-blue-500">
      <div className="w-full max-w-2xl bg-white border border-blue-300 rounded-xl shadow-lg p-6">
        <h1 className="text-3xl font-extrabold text-center bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent underline decoration-blue-400 decoration-2 underline-offset-4 drop-shadow-md hover:scale-105 transition-transform duration-300">
          Comment System
        </h1>
        <p className="text-sm text-blue-900 mb-6 text-center">
          Share your thoughts and engage with the community. Join the conversation below!
        </p>

        {/* Add a Comment Section */}
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold text-blue-700 mb-2">Add a Comment</h2>

          <label className="block text-sm font-medium text-blue-900 mb-1">Select User</label>
          <select
            className="w-full border rounded p-2 mb-3 bg-white transition-colors duration-200"
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

          <p className="text-sm text-blue-800 mb-3">
            Commenting as <strong className="text-blue-700">{selectedUser.name}</strong> from <strong className="text-blue-700">{selectedUser.company.name}</strong>
          </p>

          <label className="block text-sm font-medium text-blue-900 mb-1">Comment</label>
          <textarea
            className="w-full border rounded-lg p-2 bg-white focus:ring-2 focus:ring-blue-400"
            placeholder="Write your comment here..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />

          <button
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 hover:shadow-md transition"
            onClick={handleSubmit}
          >
            Post Comment
          </button>
        </div>

        {/* Sort Options */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-blue-900">Comments ({comments.length})</h2>
          <div className="flex gap-2 text-sm">
            <button
              className={`px-2 py-1 rounded ${sortOrder === 'newest' ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-800'}`}
              onClick={() => setSortOrder('newest')}
            >
              Newest
            </button>
            <button
              className={`px-2 py-1 rounded ${sortOrder === 'oldest' ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-800'}`}
              onClick={() => setSortOrder('oldest')}
            >
              Oldest
            </button>
          </div>
        </div>

        {/* Render Comments */}
        {sortedComments.map(comment => (
          <Comment
            key={comment.id}
            name={comment.name}
            company={comment.company}
            body={comment.body}
            timestamp={comment.timestamp}
            initialVotes={comment.votes}
          />
        ))}
      </div>
    </main>
  );
}