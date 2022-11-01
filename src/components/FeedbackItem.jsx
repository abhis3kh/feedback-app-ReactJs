import PropTypes from 'prop-types';
import { FaTimes, FaEdit } from 'react-icons/fa';
import Card from './shared/Card';
import { useContext } from 'react';
import FeedbackContext from '../context/FeedbackContext';
function FeedbackItem({ item }) {
  // deleteFeedback => deletes the feedback from backend with REST DELETE method and set the new updated Array in the DOM to render the updated data.
  // handleUpdate => It updates the feedbackEdit global state with item data and edit value as true whenever user click on edit button for any available feedback.
  const { deleteFeedback, handleUpdate } = useContext(FeedbackContext);
  return (
    //this reverse attribute changes the color of the text in card items. See the Card.jsx and index.css for coloring info.
    <Card reverse={true}>
      <div className='num-display'>{item.rating}</div>
      {/* this button gives delete UI on screen and deleteFeedback will delete the item from DOM as well Backend server. */}
      <button className='close' onClick={() => deleteFeedback(item)}>
        <FaTimes color='purple' />
      </button>
      {/* this button gives Edit UI on screen and handleUpdate will set feedbackEdit state with the item data from DOM and set the edit value as true. */}
      <button className='edit' onClick={() => handleUpdate(item)}>
        <FaEdit color='yellow' />
      </button>
      {/* this where the feedback text will be displayed. */}
      <div className='text-display'>{item.text}</div>
    </Card>
  );
}

FeedbackItem.propTypes = {
  item: PropTypes.object.isRequired,
};

export default FeedbackItem;
