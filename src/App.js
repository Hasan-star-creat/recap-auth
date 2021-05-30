import logo from "./logo.svg";
import "./App.css";
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./fireBase.Config";
import { useReducer, useState } from "react";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

function App() {
  const [user, setUser] = useState({
    isSignIn: false,
    name: "",
    email: "",
    photo: "",
  });

  const googleProvider = new firebase.auth.GoogleAuthProvider();
  const fbProvider = new firebase.auth.FacebookAuthProvider();
  const ghProvider = new firebase.auth.GithubAuthProvider();
  const handlerSignIn = () => {
    firebase
      .auth()
      .signInWithPopup(googleProvider)
      .then((res) => {
        const { displayName, email, photoURL } = res.user;
        const userInfo = {
          isSignIn: true,
          name: displayName,
          email: email,
          photo: photoURL,
        };
        setUser(userInfo);
        console.log(res.user);
      })
      .catch((error) => {
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
        console.log(errorMessage);
      });
  };

  // google sign out method
  const handlerSignOut = () => {
    firebase
      .auth()
      .signOut()
      .then((res) => {
        const userInfo = {
          isSignIn: false,
          name: "",
          email: "",
          photo: "",
        };
        setUser(userInfo);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // facebook sing in
  const handlerFbSignIn = () => {
    firebase
      .auth()
      .signInWithPopup(fbProvider)
      .then((res) => {
        const { displayName, email, photoURL } = res.user;
        const userInfo = {
          isSignIn: true,
          name: displayName,
          email: email,
          photo: photoURL,
        };
        setUser(userInfo);
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
        console.log(errorCode, errorMessage, email, credential);
      });
  };

  // facebook sign out method
  const handlerFbSignOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        const userInfo = {
          isSignIn: false,
          name: "",
          email: "",
          photo: "",
        };
        setUser(userInfo);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Github sign in methode
  const handlerGhSignIn = () => {
    firebase
      .auth()
      .signInWithPopup(ghProvider)
      .then((res) => {
            var credential = res.credential;
            var token = credential.accessToken;
            const user = res.user;
            const { displayName, email, photoURL } = user;
            const userInfo = {
              isSignIn: true,
              name: displayName,
              email: email,
              photo: photoURL,
            };
            setUser(userInfo);
            console.log('Github:', user);

      })
      .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            var email = error.email;
            var credential = error.credential;
            console.log('Github',errorCode, errorMessage ,email, credential)
      });
  };
      
  // github Sign out method 
   const handlerGhSignOut = () => {
      
   }
  return (
    <div className="App">
      {user.isSignIn ? (
        <button onClick={handlerSignOut}>google sign out</button>
      ) : (
        <button onClick={handlerSignIn}>google sign in</button>
      )}{" "}
      <br />
      {user.isSignIn ? (
        <button onClick={handlerFbSignOut}>facebook sign out</button>
      ) : (
        <button onClick={handlerFbSignIn}>facebook sign in</button>
      )}
      <br />
      {
        user.isSignIn
        ?<button onClick={handlerGhSignOut}>Sign Out Github</button>
        :<button onClick={handlerGhSignIn}>Sign in Github</button>
      } <br/>
      
      {user.isSignIn && (
        <div>
          <h3>Name: {user.name}</h3>
          <p>Email: {user.email}</p>
          <img src={user.photo} alt="" />
        </div>
      )}
      {/* <h3>Name: {user.displayName}</h3>
      <p>Email: {user.email}</p> */}
    </div>
  );
}

export default App;
