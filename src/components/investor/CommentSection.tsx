import React, { useState } from 'react';
import Avatar from '../ui/Avatar';
import Button from '../ui/Button';
import { Comment } from '../../types';
import { format } from 'date-fns';
import { Send } from 'lucide-react';
import { currentUser } from '../../data/mockData';

interface CommentSectionProps {
  comments: Comment[];
  projectId: string;
}

const CommentSection: React.FC<CommentSectionProps> = ({ comments, projectId }) => {
  const [newComment, setNewComment] = useState('');
  const [localComments, setLocalComments] = useState<Comment[]>(comments);
  
  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newComment.trim()) return;
    
    const comment: Comment = {
      id: `temp-${Date.now()}`,
      projectId,
      userId: currentUser.id,
      userName: currentUser.name,
      userAvatar: currentUser.avatar,
      content: newComment.trim(),
      date: new Date().toISOString(),
    };
    
    setLocalComments([comment, ...localComments]);
    setNewComment('');
  };
  
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-neutral-200 p-6">
        <h3 className="text-lg font-semibold mb-4">Discussion</h3>
        
        <form onSubmit={handleSubmitComment} className="mb-6">
          <div className="flex items-start space-x-4">
            <Avatar
              src={currentUser.avatar}
              alt={currentUser.name}
              size="md"
            />
            <div className="min-w-0 flex-1">
              <div className="border border-neutral-300 rounded-lg shadow-sm overflow-hidden focus-within:border-primary-500 focus-within:ring-1 focus-within:ring-primary-500">
                <textarea
                  rows={3}
                  name="comment"
                  id="comment"
                  className="block w-full resize-none border-0 py-3 px-4 focus:ring-0 sm:text-sm"
                  placeholder="Add a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                ></textarea>
                <div className="py-2 px-3 bg-neutral-50 flex justify-end">
                  <Button
                    type="submit"
                    size="sm"
                    disabled={!newComment.trim()}
                    icon={<Send className="h-4 w-4" />}
                  >
                    Submit
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </form>
        
        <div className="space-y-6">
          {localComments.length === 0 ? (
            <p className="text-center text-neutral-500 py-6">No comments yet. Be the first to comment!</p>
          ) : (
            localComments.map((comment) => (
              <div key={comment.id} className="flex items-start space-x-4">
                <Avatar
                  src={comment.userAvatar}
                  alt={comment.userName}
                  size="md"
                />
                <div className="flex-1 min-w-0">
                  <div className="bg-neutral-50 rounded-lg px-4 py-3">
                    <div className="flex justify-between items-center mb-1">
                      <h4 className="text-sm font-medium text-neutral-900">{comment.userName}</h4>
                      <span className="text-xs text-neutral-500">
                        {format(new Date(comment.date), 'MMM d, yyyy • h:mm a')}
                      </span>
                    </div>
                    <p className="text-sm text-neutral-700 whitespace-pre-wrap">{comment.content}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentSection;