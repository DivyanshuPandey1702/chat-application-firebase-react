import React from "react";

function SignIn({ firebase, auth }) {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };
  return (
    <div>
      <button onClick={signInWithGoogle}>Sign In With Google</button>
    </div>
  );
}

export default SignIn;
