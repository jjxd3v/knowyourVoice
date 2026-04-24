import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageCircleIcon,
  AlertCircleIcon,
  UserIcon,
  FlagIcon,
  CheckCircleIcon } from
'lucide-react';
import { useAppContext } from '../store/AppContext';
interface CommentSectionProps {
  postId: string;
}
const harmfulPatterns = [
'hate',
'kill',
'stupid',
'idiot',
'shut up',
'dumb',
'ugly',
'h4te',
'k1ll',
'stup1d',
'id1ot',
'dum8',
'die',
'loser',
'worthless',
'trash',
'disgusting'];

export const CommentSection: React.FC<CommentSectionProps> = ({ postId }) => {
  const { comments } = useAppContext();
  const [reportedComments, setReportedComments] = useState<Set<string>>(
    new Set()
  );
  const postComments = comments.filter((c) => c.postId === postId);
  const handleReport = (commentId: string) => {
    setReportedComments((prev) => new Set(prev).add(commentId));
  };
  return (
    <div className="mt-16 pt-10 border-t border-gray-200 dark:border-gray-700">
      <h3 className="font-serif text-2xl font-bold mb-8 flex items-center text-text dark:text-text">
        <MessageCircleIcon className="mr-2 text-primary" />
        Discussion ({postComments.length})
      </h3>

      {/* Comments List */}
      <div className="space-y-6">
        {postComments.length > 0 ?
        postComments.map((comment, index) =>
        <motion.div
          initial={{
            opacity: 0,
            y: 10
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            delay: index * 0.1
          }}
          key={comment.id}
          className="bg-surface dark:bg-surface p-5 rounded-2xl border border-gray-100 dark:border-gray-700">
          
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400">
                    <UserIcon size={16} />
                  </div>
                  <div>
                    <div className="font-medium text-sm text-gray-900 dark:text-gray-100">
                      {comment.author}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {new Date(comment.date).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                    </div>
                  </div>
                </div>

                {/* Report Button */}
                <AnimatePresence mode="wait">
                  {reportedComments.has(comment.id) ?
              <motion.span
                initial={{
                  opacity: 0,
                  scale: 0.8
                }}
                animate={{
                  opacity: 1,
                  scale: 1
                }}
                className="flex items-center text-xs text-green-600 dark:text-green-400 font-medium">
                
                      <CheckCircleIcon size={14} className="mr-1" />
                      Reported
                    </motion.span> :

              <button
                onClick={() => handleReport(comment.id)}
                className="flex items-center text-xs text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                title="Report this comment">
                
                      <FlagIcon size={14} className="mr-1" />
                      Report
                    </button>
              }
                </AnimatePresence>
              </div>
              <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                {comment.text}
              </p>
            </motion.div>
        ) :

        <div className="text-center py-10 text-gray-500 dark:text-gray-400">
            No comments yet. Be the first to share your thoughts!
          </div>
        }
      </div>
    </div>);

};