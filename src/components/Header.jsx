import React from 'react'
import { connect } from 'react-redux'
import { signOutAPI } from '../actions'

function Header(props) {
    return (
        <div className='flex items-center justify-between px-28 fixed w-full h-16 bg-white z-40'>
            <div className='navLeft flex gap-2'>
                <img src="images\home-logo.svg" alt="" />

                <form className="max-w-md">
                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2200/svg" fill="none" viewBox="0 0 22 22">
                                <path stroke="currentCol cursor-pointeror" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <input
                            type="search"
                            id="default-search"
                            className="block w-80 p-2 pl-10 text-sm rounded focus:ring-blue-500 focus:border-blue-500 bg-gray-300"
                            placeholder="Search"
                            required
                        />
                    </div>
                </form>
            </div>

            <div className='navRight flex items-center justify-center gap-8'>
                <a className='flex items-center justify-center flex-col cursor-pointer'>
                    <img src="images/nav-home.svg" alt="Home" height={22} width={22} />
                    <span className='block text-sm'>Home</span>
                </a>
                <a className='flex items-center justify-center flex-col cursor-pointer'>
                    <img src="images/nav-network.svg" alt="Network" height={22} width={22} />
                    <span className='block text-sm'>My Network</span>
                </a>
                <a className='flex items-center justify-center flex-col cursor-pointer'>
                    <img src="images/nav-jobs.svg" alt="Jobs" height={22} width={22} />
                    <span className='block text-sm'>Jobs</span>
                </a>
                <a className='flex items-center justify-center flex-col cursor-pointer'>
                    <img src="images/nav-messaging.svg" alt="Messaging" height={22} width={22} />
                    <span className='block text-sm'>Messaging</span>
                </a>
                <a className='flex items-center justify-center flex-col cursor-pointer'>
                    <img src="images/nav-notifications.svg" alt="Notifications" height={22} width={22} />
                    <span className='block text-sm'>Notifications</span>
                </a>
                <a className='group flex items-center justify-center flex-col cursor-pointer'>
                    {
                        props.user && props.user.photoURL ? (
                            <img src={props.user.photoURL} alt="User" height={23} width={23} className='rounded-full object-cover' />
                        )
                            : (
                                <img src="images/user.svg" alt="User" height={23} width={23} className='rounded-full object-cover' />
                            )
                    }
                    <span className='text-sm flex gap-1'>Me <img src="images/down-icon.svg" alt="" /> </span>

                    <div className="absolute top-14" onClick={props.signOut}>
                        <a href="#" className="hidden border px-6 py-2 bg-white rounded-sm active:bg-gray-200 active:scale-95 transition-transform group-hover:block ">Logout</a>
                    </div>

                </a>

                <a className='flex items-center justify-center flex-col cursor-pointer pl-10'>
                    <img src="images\nav-work.svg" alt="Home" height={22} width={22} />
                    <span className='block text-sm'>Work</span>
                </a>
            </div>
        </div>
    )
}


const mapStateToProps = (state) => {
    return {
        user: state.userState.user
    }
}

const mapDispatchToProps = (dispatch) => ({
    signOut: () => dispatch(signOutAPI())
})


export default connect(mapStateToProps, mapDispatchToProps)(Header);