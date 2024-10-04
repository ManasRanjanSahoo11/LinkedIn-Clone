import React from 'react'
import LeftSide from './LeftSide'
import Main from './Main'
import RightSide from './RightSide'
import { Navigate } from 'react-router-dom'
import { connect } from 'react-redux'

function Home(props) {
  // Redirect to the login page if the user is not logged in
  if (!props.user) {
    return <Navigate to="/" />;
  }

  return (
    <div className='container pt-20 mx-auto'>
      <div className='section w-full flex gap-1 items-center justify-center underline'>
        <h5 className='font-bold text-blue-600'><a href="https://www.upwork.com">Hiring in a hurry ? -</a></h5>
        <p className='font-semibold'>Find a talent pros in record time with Upwork and keep business moving.</p>
      </div>

      {/* Main layout */}
      <div className='layout grid-layout pt-5'>
        <LeftSide />
        <Main />
        <RightSide />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.userState.user
  };
};

export default connect(mapStateToProps)(Home);
