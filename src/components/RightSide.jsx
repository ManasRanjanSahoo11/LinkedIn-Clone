import React from 'react'

function RightSide() {
  return (
    <div className='followCard border h-60 rounded-md bg-white px-2'>
      <div className='title flex items-center justify-between my-2'>
        <h2 className='font-medium text-gray-500'>Add To Your Feed</h2>
        <img src="/images/feed-icon.svg" alt="" />
      </div>

      <div className='feedlist'>
        <li className='list-none flex items-center gap-3 '>
          <a href="">
            <img src="/images/hashtag-icon.png" alt="" width={50}/>
          </a>
          <div className='flex flex-col gap-1'>
            <span className='font-semibold text-xl'>#LinkedIn</span>
            <button className='border rounded-full bg-white py-1 px-4'>Follow</button>
          </div>
        </li>
        <li className='list-none flex items-center gap-3 mt-4'>
          <a href="">
            <img src="/images/hashtag-icon.png" alt="" width={50}/>
          </a>
          <div className='flex flex-col gap-1'>
            <span className='font-semibold text-xl'>#Video</span>
            <button className='border rounded-full bg-white py-1 px-4'>Follow</button>
          </div>
        </li>
      </div>

      <div className='recomendation flex items-center gap-1 text-blue-600 py-3 cursor-pointer'>
        View All Recommendation
        <img src="/images/right-icon.svg" alt="" />
      </div>
    </div>
  )
}

export default RightSide
