import { Link } from 'react-router-dom';
import { FaQuestion } from 'react-icons/fa';
const AboutPageIcon = () => {
  return (
    <div className='about-link'>
      <Link to='/about'>
        {/* this will show the question mark in the right left button */}
        <FaQuestion size={30} />
        {/* we are using fontawesome for this. fa=Font Awesome */}
      </Link>
      {/* Used Link instead of a tag because it will not refresh the entire page. It will change in DOM only, so it will give user a feel that they are in same page. */}
    </div>
  );
};

export default AboutPageIcon;
