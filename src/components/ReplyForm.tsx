'use client';
import React, { useState } from 'react';

interface Props {
  onSubmit: (text: string) => void;
}

const ReplyForm: React.FC<Props> = ({ onSubmit }) => {
  const [text, setText] = useState('');

  return (
    <div className="mt-2">
      <textarea
        className="w-full border rounded p-2"
        placeholder="Write your reply here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        className="mt-2 bg-blue-600 text-white px-4 py-1 rounded"
        onClick={() => {
          if (text.trim()) {
            onSubmit(text);
            setText('');
          }
        }}
      >
        Submit Reply
      </button>
    </div>
  );
};

export default ReplyForm;