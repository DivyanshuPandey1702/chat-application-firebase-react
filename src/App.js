// Import React and useState
import React from "react";
// Import Styles
import "./styles/app.scss";

// Import Components
import ChatRoom from "./components/ChatRoom";
import SignIn from "./components/SignIn";
import SignOut from "./components/SignOut";

// Font Awesome Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";

// Import firebase, auth and firestore
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

// Import React-Firebase-Hooks
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

// Initialize Firebase App
firebase.initializeApp({
  //initialize app
});

// var for firebase auth and firestore
const auth = firebase.auth();
const firestore = firebase.firestore();

// App
function App() {
  // User
  const [user] = useAuthState(auth);

  return (
    <div className="app">
      <div className="header">
        <h1>
          <FontAwesomeIcon icon={faComment} /> Messenger
        </h1>
        <div>
          <SignOut auth={auth} />
          {user && <img src={user.photoURL} alt="" />}
        </div>
      </div>
      {user ? (
        <ChatRoom
          auth={auth}
          firestore={firestore}
          useCollectionData={useCollectionData}
          firebase={firebase}
        />
      ) : (
        <div className="sign-in">
          <h1>
            Welcome to Messenger Chat Appliction made with Firebase and React
          </h1>
          <SignIn firebase={firebase} auth={auth} />
          <p>Made By Divyanshu Pandey</p>
        </div>
      )}
    </div>
  );
}

export default App;
