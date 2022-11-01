import React from 'react';
import Card from '../components/shared/Card';
import { Link } from 'react-router-dom';
const AboutPage = () => {
  return (
    <Card>
      <div className='about'>
        <h1>This about the project.</h1>
        <p>This is a project to take feedback from user for a product.</p>
        <p>Version : 1.0.0</p>
        <p>
          {/* Link doesn't need refresh, it reder the link to page if it within the internal component */}
          <Link to='/'>Back to Home</Link>
        </p>
      </div>
    </Card>
  );
};

export default AboutPage;
