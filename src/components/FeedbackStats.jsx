import React from 'react';
import { useContext } from 'react';
import FeedbackContext from '../context/FeedbackContext';
const FeedbackStats = () => {
  // feedback => Global state from context file where all the updated feedback is stored.
  const { feedback } = useContext(FeedbackContext);
  // this average variable hold the average of all rating of feedback.
  let average =
    feedback.reduce((acc, cur) => {
      return acc + cur.rating;
    }, 0) / feedback.length;
  // acc is set by default to 0 & curr take each item in feedback array and we take the rating part from it. and after reduce return the sum of all rating we are then dividing it by number of element left in the array so we will get the average
  average = average.toFixed(1);
  // to show only one decimal point.
  return (
    <div className='feedback-stats'>
      {/* to show how many review are there in DB */}
      <h4>{feedback.length} Reviews</h4>
      {/* if the average is not a number then it will 0 instead of giving programatic error. */}
      <h4>Average Rating {isNaN(average) ? 0 : average}</h4>
    </div>
  );
};

export default FeedbackStats;
