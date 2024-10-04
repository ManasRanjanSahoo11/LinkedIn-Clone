import { useState, useEffect } from 'react'
import React from 'react'
import PostModel from './PostModel'
import { connect } from 'react-redux'
import { getArticleAPI } from '../actions'
import ReactPlayer from 'react-player'

function Main(props) {
  const [showModel, setShowModel] = useState("close")

  useEffect(() => {
    props.getArticles()
  }, [])

  const handleClick = (e) => {
    e.preventDefault()
    switch (showModel) {
      case 'close':
        setShowModel('open')
        break;
      case 'open':
        setShowModel('close')
        break;
      default:
        setShowModel('close');
    }
  }

  return (
    <>
      <div className='container mb-9'>
        <div className='sharebox bg-white h-32 px-3 border rounded-md p-2'>
          <div className='flex gap-3 items-center'>
            {
              props.user && props.user.photoURL ? (
                <img src={props.user.photoURL} alt="" width={50} className="rounded-full" />
              ) : (
                <img src="/images/user.svg" alt="Default user" width={50} className="rounded-full" />
              )
            }

            <button onClick={handleClick} disabled={props.loading ? true : false} className='border py-2 w-full font-semibold rounded-full text-gray-500'>Start a post</button>
          </div>
          <div className='flex justify-between py-3 px-2'>
            <button className='flex items-center'>
              <i className="ri-image-fill text-xl"></i>
              <span className='font-semibold ml-1 text-blue-600'>Photo</span>
            </button>
            <button className='flex items-center py-3'>
              <i className="ri-video-line text-xl"></i>
              <span className='font-semibold ml-1 text-blue-600'>Video</span>
            </button>
            <button className='flex items-center py-3'>
              <i className="ri-calendar-event-line text-xl"></i>
              <span className='font-semibold ml-1 text-blue-600'>Event</span>
            </button>
            <button className='flex items-center py-3'>
              <i className="ri-article-line text-xl"></i>
              <span className='font-semibold ml-1 text-blue-600'>Write Article</span>
            </button>
          </div>
        </div>

        <div className='content'>
          {props.loading && (
            <div className='py-3 flex items-center justify-center'>
              <img src="/images/Spinning_logo.svg" width={32} alt="" className="bg-transparent" />
            </div>
          )}

          {/* Display a message when there are no articles */}
          {props.articles?.length === 0 && !props.loading && (
            <p className="text-gray-500 text-center">There is no article!</p>
          )}

          {props.articles?.length > 0 &&
            props.articles.map((article, key) => (
              <div key={key} className='article mt-3 bg-white px-3 border rounded-md p-2 relative'>
                <div className='sharedActor flex items-center py-2'>
                  <a href="" className='overflow-hidden flex-grow flex pointer-events-none'>
                    <img src={article?.actor?.images} alt="" width={70} className='rounded-md'/>
                    <div className='flex flex-col flex-grow ml-3 overflow-hidden'>
                      <span className='text-left font-medium text-gray-500'>{article.actor.title}</span>
                      <span className='text-left text-gray-500'>{article.actor.description}</span>
                      <span className='text-left text-gray-500'>{article?.actor?.date?.toDate().toLocaleString() }</span>
                    </div>
                  </a>
                  <button className='absolute right-4 top-0'>
                    <i className="ri-more-line text-2xl font-bold"></i>
                  </button>
                </div>

                <div className='description text-lg'>
                  {article.description}
                </div>

                <div className='sharedImg py-2 w-full'>
                  <a href="" >
                    {
                      !article.sharedImg && article.video ? (
                        <ReactPlayer width={"100%"} url={article.video} />
                      ) : (
                        article.sharedImg && <img src={article.sharedImg} alt="" />
                      )
                    }
                  </a>
                </div>

                <div className='socialCounts flex items-center gap-2 border-buttom pb-3'>
                  <li className='list-none'>
                    <button className='border flex items-center gap-1 py-1 px-4 bg-slate-200 rounded-sm'>
                      <img src="/images/love-icon.png" alt="" width={22} />
                      <img src="/images/clapping-icon.png" alt="" width={22} />
                      <span>75</span>
                    </button>
                  </li>
                  <li className='list-none'>
                    <a href=""> {article.comments} Comments </a>
                  </li>
                </div>
                <div className='socialActions pt-3 flex items-center gap-5'>
                  <button className='border rounded-sm px-3 py-1 active:bg-gray-200 active:scale-95 transition-transform'>
                    <i className="ri-heart-3-line pr-1 text-lg"></i>
                    <span className=' font-semibold'>Like</span>
                  </button>
                  <button className='border rounded-sm px-3 py-1 active:bg-gray-200 active:scale-95 transition-transform'>
                    <i className="ri-message-3-line pr-1 text-lg"></i>
                    <span className=' font-semibold'>Comments</span>
                  </button>
                  <button className='border rounded-sm px-3 py-1 active:bg-gray-200 active:scale-95 transition-transform'>
                    <i className="ri-share-forward-line pr-1 text-lg"></i>
                    <span className=' font-semibold'>Share</span>
                  </button>
                  <button className='border rounded-sm px-3 py-1 active:bg-gray-200 active:scale-95 transition-transform'>
                    <i className="ri-send-plane-line pr-1 text-lg"></i>
                    <span className=' font-semibold'>Send</span>
                  </button>
                </div>
              </div>
            ))
          }
        </div>

        <PostModel showModel={showModel} handleClick={handleClick} />
      </div>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    loading: state.articleState.loading,
    user: state.userState.user,
    articles: state.articleState.articles
  };
};

const mapDispatchToProps = (dispatch) => ({
  getArticles: () => dispatch(getArticleAPI())
});

export default connect(mapStateToProps, mapDispatchToProps)(Main)
