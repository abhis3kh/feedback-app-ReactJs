import { createContext, useEffect, useState } from 'react';
// creating the context
const FeedbackContext = createContext();

// we need a provider to encapsulate our components which needs to use this context.
// children means all the nested component inside this FeedbackProvider
export const FeedbackProvider = ({ children }) => {
  //setting the feedback array as empty at first initialization.
  const [feedback, setFeedback] = useState([]);
  // we want to fetch our data from backend when page loaded for first time
  useEffect(() => {
    fetchData();
  }, []);

  // fetch the data from backend to populate the feedback state
  const fetchData = async () => {
    const response = await fetch(
      'http://localhost:5000/feedback?_sort=id&order=desc'
    );
    const data = await response.json(); //converting it to json data
    // setting it to context global state
    setFeedback(data);
  };
  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {}, //currently it will be null but once the edit button is clicked on the item, details will be here of that item.
    edit: false, //this will indicate that we are edit mode or not
    // false : not in edit mode
    // true : edit mode
  });
  const deleteFeedback = async (item) => {
    // deleting the value from backend using REST DELETE Method
    await fetch(`http://localhost:5000/feedback/${item.id}`, {
      method: 'DELETE',
    });
    // new array of feedback after deletion
    let newFeedback = [];
    feedback.forEach((element) => {
      // eliminating the element which got deleted.
      if (element.id !== item.id) newFeedback.push(element);
    });
    // setting the global context feedback to the new updated array after deletion.
    setFeedback(newFeedback);
  };
  const handleAdd = async (data) => {
    // adding it to backend data using POST
    const response = await fetch('http://localhost:5000/feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data), //converting it to string to append to object in db.json
    });
    // getting the newly added feedback in newAddedFeedback variable.
    const newAddedFeedback = await response.json();
    // using spread opearator to construct a new array and new assigning that new value to global context feedback variable using setFeedback
    setFeedback([newAddedFeedback, ...feedback]);
  };
  const handleUpdate = (item) => {
    // whenever edit button clicked on item, this will be triggered and it will set the feedbackEdit global context variable with item details(on which it got clicked) and the edit boolean will be true.
    setFeedbackEdit({ item, edit: true });
  };
  const Update = async (id, updItem) => {
    // this function will update the value in DB as well in DOM.
    // this is updating the existing feedbacking using PUT method in REST.
    const response = await fetch(`http://localhost:5000/feedback/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updItem),
    });
    //  we are getting the updated feedback details after doing the updation in backEnd.
    const data = await response.json();
    setFeedback(
      // we are construcing an array where are taking all the existing feedback but when we got the updated item id(which got edited), we update that value with the updated details after updation. so we will able to show the updated feedback details in real time.
      feedback.map((item) => {
        // updating with the existing item with new details.
        return item.id === id ? { ...data } : item;
      })
    );
  };
  return (
    <FeedbackContext.Provider
      value={{
        // we have to provide this value prop. By this only we can get the values using useContext() in different pages. It doesn't matter how many states or function you created in this page but if you don't provide in value prop, it will not be accessible outside of this file.
        // ? State Variable
        feedback: feedback,
        feedbackEdit: feedbackEdit, //the form needs to know which feedback it needs to update
        // ? Functions
        deleteFeedback: deleteFeedback,
        handleAdd: handleAdd,
        handleUpdate: handleUpdate,
        Update: Update,
        //  we can also use ES6 syntax like this
        // deleteFeedback,
        // handleAdd,
        // handleUpdate,
        // Update,
      }}
    >
      {/*  we then showing the children. */}
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContext;
