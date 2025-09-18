import comments from '../mock/comments.json';
import users from '../mock/user.json';

export const getEnrichedComments = () => {
  return comments.map(comment => {
    const user = users.find(u => u.email === comment.email);
    return {
      ...comment,
      company: user?.company?.name || 'Unknown Company',
      votes: 0, // Static to avoid hydration mismatch
      timestamp: comment.timestamp || '2025-09-18T12:00:00', // Use static or prefilled
    };
  });
};