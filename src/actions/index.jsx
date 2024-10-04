import { auth, provider, storage } from '../firebase';
import db from '../firebase'
import { signInWithPopup } from "firebase/auth";
import { SET_USER, SET_LOADING_STATUS, GET_ARTICLES } from './actionType';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { collection, addDoc, query, orderBy, onSnapshot } from "firebase/firestore";


export const setUser = (payload) => ({
    type: SET_USER,
    user: payload
})

export const setLoading = (status) => ({
    type: SET_LOADING_STATUS,
    status: status
})

export const getArticles = (payload) => ({
    type: GET_ARTICLES,
    payload: payload
})

//User Sign In
export function signInAPI() {
    return (dispatch) => {
        signInWithPopup(auth, provider)
            .then((payload) => {
                // console.log(payload);
                dispatch(setUser(payload.user))
            })
            .catch(() => alert("Error! - Popup Closed By User"));
    }
}

// User Authentication
export function getUserAuth() {
    return (dispatch) => {
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                dispatch(setUser(user))
            }
        })
    }
}

// User Sign out
export function signOutAPI() {
    return (dispatch) => {
        auth.signOut()
            .then(() => {
                dispatch(setUser(null))
            })
            .catch((error) => {
                console.log(error.message);
            })
    }
}


/* To store the images to the firebase storage
export function postArticleAPI(payload) {
    return (dispatch) => {
        if (payload.image !== "") {
            const upload = ref(`images/${payload.image.name}`).put(payload.image);
            upload.on("state_changed", (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log(`Progress : ${progress}%`);

                if (snapshot.state === 'RUNNING') {
                    console.log(`Progress : ${progress}%`);
                }
            }, error => console.log(error.code),
                async () => {
                    const downloadURL = await upload.snapshot.ref.getDownloadURL()
                    db.collection("articles").add({
                        actor: {
                            description: payload.user.email,
                            title: payload.user.displayName,
                            date: payload.timestamp,
                            images: payload.user.photoURL,
                        },
                        video: payload.video,
                        sharedImg: downloadURL,
                        comments: 0,
                        description: payload.description
                    })
                }
            );
        }
    }
}
*/


//To store the images to the firebase storage
export function postArticleAPI(payload) {
    return async (dispatch) => {
        dispatch(setLoading(true))

        if (payload.image !== "") {
            // Create a reference to the storage location
            const storageRef = ref(storage, `images/${payload.image.name}`);

            // Start the file upload
            const uploadTask = uploadBytesResumable(storageRef, payload.image);

            // Monitor the upload progress
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log(`Progress: ${progress}%`);

                    if (snapshot.state === "running") {
                        console.log(`Upload is running, progress: ${progress}%`);
                    }
                },
                (error) => {
                    console.log(`Upload failed: ${error.code}`);
                },
                async () => {
                    // When the upload completes, get the download URL
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

                    // Add the article to Firestore
                    try {
                        await addDoc(collection(db, "articles"), {
                            actor: {
                                description: payload.user.email,
                                title: payload.user.displayName,
                                date: payload.timestamp,
                                images: payload.user.photoURL,
                            },
                            video: payload.video,
                            sharedImg: downloadURL,
                            comments: 0,
                            description: payload.description,
                        });

                        dispatch(setLoading(false))
                        console.log("Document successfully written with image!");
                    } catch (error) {
                        console.log(`Error adding document: ${error}`);
                    }
                }
            );
        } else if (payload.video) {
            // If there is no image but a video, add it directly to Firestore
            try {
                await addDoc(collection(db, "articles"), {
                    actor: {
                        description: payload.user.email,
                        title: payload.user.displayName,
                        date: payload.timestamp,
                        images: payload.user.photoURL,
                    },
                    video: payload.video,
                    sharedImg: "",
                    comments: 0,
                    description: payload.description,
                });

                dispatch(setLoading(false))
                console.log("Document successfully written with video!");
            } catch (error) {
                console.log(`Error adding document: ${error}`);
            }
        } else {
            console.log("No image or video provided.");
        }
    };
}



// Older version
// export function getArticleAPI() {
//     return (dispatch) => {
//         let payload;

//         db.collection("articles")
//             .orderBy("actor.date", "desc")
//             .onSnapshot((snapshot) => {
//                 payload = snapshot.docs.map((doc) => doc.data());
//                 console.log(payload);
//             });
//     };
// }


export function getArticleAPI() {
    return (dispatch) => {
        const articlesCollection = collection(db, "articles"); // Define the collection
        const articlesQuery = query(articlesCollection, orderBy("actor.date", "desc")); // Create a query

        onSnapshot(articlesQuery, (snapshot) => {
            const payload = snapshot.docs.map((doc) => doc.data());
            // console.log(payload);   //----> To verify data
            dispatch(getArticles(payload))
        });
    };
}
