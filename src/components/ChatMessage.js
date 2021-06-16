import React from "react";
import timeToDate from "timestamp-to-date";

function ChatMessage({ message, auth }) {
  const { text, uid, photoURL, displayName, createdAt } = message;

  const messageClass = uid === auth.currentUser.uid ? "sent" : "recieved";

  return (
    <div className={`message ${messageClass}`}>
      <div>
        <img src={photoURL} alt="" />
        <div>
          <h6 className="info-name">{`${
            uid === auth.currentUser.uid ? "Me" : displayName
          }`}</h6>
          <p>{text}</p>
        </div>
      </div>
    </div>
  );
}

export default ChatMessage;
