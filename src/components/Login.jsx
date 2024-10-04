import React from 'react'
import { connect } from 'react-redux'
import { signInAPI } from '../actions'
import { Navigate } from 'react-router-dom';

function Login(props) {
  return (
    <div>

      {props.user && <Navigate to="/home" />}

      <nav className='flex items-center justify-between py-4 px-5 flex-nowrap'>
        <div className='left'><a href="#"><img width={140} src="./images/login-logo.svg" alt="LinkedIn" /></a></div>
        <div className='right flex items-center gap-5'>
          <a href="#" className='block hover:bg-slate-200 py-2 px-4 rounded-lg transition duration-200 ease-out'>Join Now</a>
          <a href="#" className='block bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1.5 px-4 border border-blue-500 hover:border-transparent rounded transition duration-200 ease-out'>Sign in</a>
        </div>
      </nav>
      <div className='hero px-5 flex items-center justify-between'>
        <div className=''>
          <h1 className='text-blue-600 text-5xl w-[600px]'>Welcome to your professional community</h1>
          <button className='mt-10 text-xl flex items-center justify-center border border-blue-700 text-white  bg-blue-500 py-3 px-5 rounded-lg hover:bg-slate-700 transition duration-200 ease-out' onClick={() => props.signIn()}>
            <img src="/images/google.svg" alt="Google" className="w-6 h-6 mr-3" />
            Sign in with Google
          </button>

        </div>
        <img src="./images/login-hero.svg" alt="Error" width={610} />
      </div>
    </div >
  )
}

// Mapping Redux state to props and logging state
const mapStateToProps = (state) => {
  // console.log(state.userState.user);
  return {
    user: state.userState.user
  };
};


// Mapping the signIn dispatch action to props
const mapDispatchToProps = (dispatch) => ({
  signIn: () => dispatch(signInAPI())
})


// Connecting the Login component to Redux store
export default connect(mapStateToProps, mapDispatchToProps)(Login);