import React from 'react';
import FeedbackItem from './FeedbackItem';
import { AnimatePresence, motion } from 'framer-motion';
import { useContext } from 'react';
import FeedbackContext from '../context/FeedbackContext';
const FeedbackList = () => {
  // feedback => Global state from context file where all the updated feedback is stored.
  const { feedback } = useContext(FeedbackContext);
  // if there is no feedback it will show the below message instead of nothing.
  if (!feedback || feedback.length === 0) {
    // !we can display an error page instead of this.
    return <p>No Feedback Yet</p>;
  }
  return (
    <div className='feedback-list'>
      <AnimatePresence>
        {feedback.map((item) => {
          return (
            // this will fade in and out the items in DOM whenever something is added as well delete. Means whenever it render it will fade out and in the items.
            <motion.div
              key={item.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* this will loop through whole feedback array and calls the FeedbackItem which will return the JSX for feedback item to be displayed. */}
              <FeedbackItem item={item} key={item.id} />
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default FeedbackList;
