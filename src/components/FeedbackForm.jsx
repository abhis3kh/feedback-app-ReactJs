import React, { useEffect, useState } from 'react';
import Button from './shared/Button';
import Card from './shared/Card';
import RatingSelect from './RatingSelect';
import { useContext } from 'react';
// importing the context file where we are saving all global state and functions to manipulate the data. (Single source of Truth)
import FeedbackContext from '../context/FeedbackContext';

const FeedbackForm = () => {
  // exporting global functions and state from context file.
  // handleAdd=> Add new feedback,
  // feedbackEdit => Global State(Object is the data type) for storing the feedback data which need to be edited.
  //! update => it is the function which is used to update the feedback in backend.
  const { handleAdd, feedbackEdit, Update } = useContext(FeedbackContext);
  const [text, setText] = useState('');
  const [rating, setRating] = useState(10);
  // whenever we click on edit it should trigger an event, We will use  useEffect for the same. Here feedbackEdit is given in dependency array, so whenever anything changes in feedbackEdit, it will trigger this function.
  useEffect(() => {
    // additional checking before editing an item
    if (feedbackEdit.edit === true) {
      // feedbackEdit is global state from where we are getting the value and setting it to local state to render in edit form.
      setRating(feedbackEdit.item.rating);
      setText(feedbackEdit.item.text);
    }
  }, [feedbackEdit]);

  const handleTextChange = (e) => {
    // we are setting this as when the user submits the form, it should have the latest data into the variable.
    setText(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const newData = {
      text: text,
      rating: rating,
    };
    if (feedbackEdit.edit === true) {
      // update is a context Function, which is taking the id to find the item which need to be updated and pass the new data as a object form.
      Update(feedbackEdit.item.id, newData);
    } else {
      // if the given item doesn't have edit artribute as true, it will add the new item. Means this execute for all items except for those whose edit attribute is true.
      handleAdd(newData);
    }
    // setting the value to default after submitting
    setText('');
  };
  return (
    // Card is a styled compoent so wrapping it by Card to give a good view.
    // reverse => it changes the color between white and dark. (it accepts boolean value). For more info go Card component and index.css
    <Card reverse={true}>
      {/* handleSubmit will call any one function from the two function we have imported from global context field based on the edit value.  */}
      <form onSubmit={handleSubmit}>
        <h2>How you feel about us ? </h2>
        {/* this is a individual component to render rating. */}
        <RatingSelect select={(rating) => setRating(rating)} />
        <div className='input-group'>
          <input
            className='input'
            type='text'
            onChange={handleTextChange}
            placeholder='Write us a review.'
            // two way bidning of the data, so whatever user types it will show you that in real time in text input field.
            value={text}
          />
          <Button
            type='submit'
            version='secondary'
            // if the text which is entered by the user is less than 10 letters including spaces then we will not recieve the input.
            isDisabled={text.length >= 10 ? false : true}
          >
            Send
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default FeedbackForm;
