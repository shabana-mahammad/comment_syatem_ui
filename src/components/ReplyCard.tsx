'use client';
import React from 'react';

function getInitials(name: string): string {
  const parts = name.trim().split(' ');
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

interface Props {
  name: string;
  company: string;
  text: string;
  timestamp: string;
  votes: number;
}

const ReplyCard: React.FC<Props> = ({ name, company, text, timestamp, votes }) => {
  return (
    <div className="flex items-start gap-3 border-l-2 pl-4 mt-2">
      <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
        {getInitials(name)}
      </div>
      <div>
        <div className="font-semibold text-blue-700">{name}</div>
        <div className="text-sm text-blue-500">{company}</div>
        <p className="text-gray-700 mt-1">{text}</p>
        <div className="text-xs text-gray-400 mt-1">
          {new Date(timestamp).toLocaleString()}
        </div>
        <div className="text-xs text-gray-500 mt-1">Votes: {votes}</div>
        <div className="flex gap-2 text-sm text-blue-600 mt-1">
          <button>Edit</button>
          <button>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default ReplyCard;