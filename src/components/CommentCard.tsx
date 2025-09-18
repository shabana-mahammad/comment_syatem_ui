import React from 'react';

interface Props {
  name: string;
  company: string;
  body: string;
  timestamp: string;
  votes: number;
}

const CommentCard: React.FC<Props> = ({ name, company, body, timestamp, votes }) => {
  return (
    <div className="border p-4 rounded-md shadow-sm mb-4 bg-white">
      <div className="flex justify-between items-center">
        <div>
          <div className="font-semibold text-lg">{name}</div>
          <div className="text-sm text-gray-500">{company}</div>
        </div>
        <div className="text-xs text-gray-400">{new Date(timestamp).toLocaleString()}</div>
      </div>
      <p className="text-gray-700 mt-2">{body}</p>
      <div className="text-xs text-gray-500 mt-2">Votes: {votes}</div>
    </div>
  );
};

export default CommentCard;