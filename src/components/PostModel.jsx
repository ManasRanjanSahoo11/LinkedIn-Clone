import React from 'react'
import { useState } from 'react'
import ReactPlayer from 'react-player'
import { connect } from 'react-redux'
import firebase from '../firebase'
import { serverTimestamp } from 'firebase/firestore';
import { postArticleAPI } from '../actions'

function PostModel(props) {
    const [editorText, setEditortext] = useState("")
    const [shareImg, setShareImg] = useState("")
    const [shareVdo, setShareVdo] = useState("")
    const [assetArea, setAssetArea] = useState("")

    const handleImgChange = (e) => {
        let img = e.target.files[0];

        if (img === "" || img === undefined) {
            alert(`Not an image, the file is a ${typeof img}`)
            return
        }
        setShareImg(img);
    }

    const switchAssetArea = (area) => {
        setShareImg("")
        setShareVdo("")
        setAssetArea(area)
    }

    const postArticle = (e) => {
        e.preventDefault();

        if (e.target !== e.currentTarget) {
            console.log("hi");
            
            return
        }

        const payload = {
            image: shareImg,
            video: shareVdo,
            user: props.user,
            description: editorText,
            timestamp: serverTimestamp(),
            // timestamp: firebase.firestore.Timestamp.now()
        }
        props.postArticle(payload)
        reset(e)
    }


    const reset = (e) => {
        setEditortext("")
        setShareImg("")
        setShareVdo("")
        setAssetArea("")
        props.handleClick(e)
    }

    return (
        <>
            {props.showModel === 'open' &&

                <div className='container fixed top-0 left-1/2 transform -translate-x-1/2 pt-4 h-full z-[999] bg-black bg-opacity-70'>
                    <div className='content bg-white rounded-md w-[100%] max-w-[552px] max-h-[90%] flex flex-col m-auto top-36 overflow-y-scroll'>
                        <div className='header flex justify-between items-center px-2 py-5 text-gray-600 border-buttom'>
                            <h2 className='text-2xl font-semibold'>Create a post</h2>
                            <button onClick={(event) => reset(event)} className='border px-2 active:bg-gray-200 transition-transform'>
                                <i className="ri-close-large-line text-2xl"></i>
                            </button>
                        </div>
                        <div className='sharedContent px-5 py-3'>
                            <div className='userInfo flex items-center gap-3'>
                                {props.user.photoURL ? (
                                    <img src={props.user.photoURL} alt="" width={50} className='rounded-full' />
                                ) : (
                                    <img src="/images/user.svg" alt="" width={50} className='rounded-full' />
                                )}
                                <span className='font-semibold'>{props.user.displayName}</span>
                            </div>
                            <div className='editor my-5'>
                                <textarea value={editorText} onChange={(e) => setEditortext(e.target.value)} name="" id="" className=' w-full h-32 resize-none' placeholder='What do you want to talk about?' autoFocus={true}></textarea>
                            </div>

                            {assetArea == 'image' ? (
                                <div className='uploadImg'>
                                    <input type="file" name="image" id="file" accept='image/gif, image/png, image/jpeg' className='hidden'
                                        onChange={handleImgChange}
                                    />
                                    <p className='border py-2 px-1 w-full rounded-md'>
                                        <label htmlFor="file" className='cursor-pointer'>Select an image to share</label>
                                    </p>

                                    {shareImg && (
                                        <img
                                            src={URL.createObjectURL(shareImg)}
                                            alt="Shared Image"
                                            className="w-full h-auto shadow-lg mt-2"
                                        />
                                    )}
                                </div>
                            )
                                : assetArea === 'media' && (
                                    <>
                                        <input type="text" placeholder='Please input a video link' value={shareVdo} onChange={(e) => setShareVdo(e.target.value)} className='border py-2 px-1 w-full rounded-md mb-2' />

                                        {shareVdo &&
                                            <ReactPlayer
                                                width="100%"
                                                height="300px"
                                                url={shareVdo}
                                            />
                                        }
                                    </>
                                )
                            }
                        </div>
                        <div className='sharedCreation py-3 px-2 flex items-center justify-between'>
                            <div className='flex'>
                                <div className='attachAsset'>
                                    <button className='border px-2 py-1 bg-gray-200 active:scale-95 transition-transform ' onClick={() => setAssetArea("image")}>
                                        <i className="ri-image-line text-2xl"></i>
                                    </button>
                                    <button className='border px-2 py-1 bg-gray-200 active:scale-95 transition-transform' onClick={() => setAssetArea('media')}>
                                        <i className="ri-video-line text-2xl"></i>
                                    </button>
                                </div>
                                <div className='shareComment flex pl-5'>
                                    <button className='border px-2 py-1 bg-gray-200 active:scale-95 transition-transform flex gap-1 items-center'>
                                        <i className="ri-message-3-line text-2xl"></i> AnyOne
                                    </button>
                                </div>
                            </div>
                            <div className='post'>
                                {/* <button className='border px-4 py-2 bg-blue-600 active:scale-95 transition-transform flex gap-1 items-center rounded-full text-white font-semibold' disabled={!editorText ? true : false}>Post</button> */}

                                <button
                                    onClick={(event) => postArticle(event)}
                                    className={`border px-4 py-2 transition-transform flex gap-1 items-center rounded-full font-semibold ${editorText
                                        ? 'bg-blue-600 text-white active:scale-95'
                                        : 'bg-slate-600 text-gray-200 cursor-not-allowed'
                                        }`}
                                    disabled={!editorText}
                                >
                                    Post
                                </button>

                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}


const mapStateToProps = (state) => {
    return {
        user: state.userState.user
    }
}

const mapDispatchToProps = (disaptch) => ({
    postArticle:(payload) => disaptch(postArticleAPI(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(PostModel)
