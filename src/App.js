import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FeedbackList from './components/FeedbackList';
import Header from './components/Header';
import FeedbackStats from './components/FeedbackStats';
import FeedbackForm from './components/FeedbackForm';
import AboutPage from './pages/AboutPage';
import AboutPageIcon from './components/AboutPageIcon';
import { FeedbackProvider } from './context/FeedbackContext';
const App = () => {
  return (
    // for context API usage we have to call the provider
    <FeedbackProvider>
      {/* for having differnt routes in our application.*/}
      <Router>
        {/* for displaying the Feedback UI text in TOP of the page. */}
        <Header />
        <div className='container'>
          <Routes>
            {/* setting route for home page */}
            <Route
              exact
              path='/'
              element={
                <>
                  <FeedbackForm />
                  <FeedbackStats />
                  <FeedbackList />
                </>
              }
            ></Route>
            {/* setting route for about page */}
            <Route path='/about' element={<AboutPage />} />
          </Routes>
        </div>
        {/* for showcasing the question button in the buttom right of the page. */}
        <AboutPageIcon />
      </Router>
    </FeedbackProvider>
  );
};
export default App;
