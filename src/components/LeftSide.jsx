import React from 'react'
import { connect } from 'react-redux'

function LeftSide(props) {
    return (
        <div className='container overflow-hidden border  rounded-sm bg-white h-[465px]'>
            <div className='artCart border-buttom'>
                <img src="images/card-bg.svg" alt="" />
                <a href="#" className='flex justify-center items-center flex-col -my-11 mb-2'>
                    <div className='bg-white h-20 w-20 rounded-full flex items-center justify-center overflow-hidden'>
                        <img className="object-cover" src="/images/photo.svg" alt="Profile Picture" />
                    </div>
                    <h5 className='font-semibold mt-3 text-xl'>
                        Welcome {props.user ? props.user.displayName : "there"}!
                    </h5>
                </a>
                <a href="#" className='text-center block text-blue-600 pb-3'>
                    Add a photo
                </a>
            </div>

            <div className='widget border-buttom'>
                <a href="" className='flex items-center justify-between px-2 hover:bg-gray-200'>
                    <div className='flex flex-col text-left font-semibold py-2'>
                        <span className='text-gray-500'>Connections</span>
                        <span>Grow Your Network</span>
                    </div>
                    <img src="/images/widget-icon.svg" alt="" />
                </a>
            </div>

            <div className='items border-buttom'>
                <span className=' flex gap-1 font-semibold py-3 px-1 hover:bg-gray-200'>
                    <img src="/images/item-icon.svg" alt="" />
                    My Items
                </span>
            </div>

            <div className='communityCard flex flex-col'>
                <a href="" className='py-1 px-1 hover:text-blue-600'>
                    <span>Groups</span>
                </a>
                <a href="" className='flex items-center justify-between py-1 px-1 hover:text-blue-600 '>
                    <span>Events</span>
                    <img src="/images/plus-icon.svg" alt="" />
                </a>
                <a href="" className='py-1 px-1 hover:text-blue-600 border-buttom pb-2'>
                    <span>Follow Hashtags</span>
                </a>
                <a href="" className='py-3 px-1 hover:bg-gray-200 text-gray-500'>
                    <span>Discover More</span>
                </a>
            </div>
        </div>
    )
}


const mapStateToProps = (state) => {
    return {
        user: state.userState.user
    };
}

export default connect(mapStateToProps)(LeftSide)