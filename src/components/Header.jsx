import PropTypes from 'prop-types';
function Header({ text, bgColor, textColor }) {
  // we are taking this values from hedder prop. If nothing comes from component, then it will get the values set by default in below lines of code. Header.defaultProps will set the props a value if nothing comes from parent compoent
  const headerStyles = {
    backgroundColor: bgColor,
    color: textColor,
  };

  return (
    // giving the styles here as dynamic styling
    <header style={headerStyles}>
      <div className='container'>
        <h2>{text}</h2>
      </div>
    </header>
  );
}

Header.defaultProps = {
  text: 'Feedback UI',
  bgColor: 'rgba(0,0,0,0.4)',
  textColor: '#ff6a95',
};
// this checking the types means all of the below props which is coming from parent should be as follows. If they are not string, then it should give error.
// this is compile time checking.
Header.propTypes = {
  text: PropTypes.string,
  bgColor: PropTypes.string,
  textColor: PropTypes.string,
};

export default Header;
