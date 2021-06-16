import React, { useState, useRef } from "react";
import ChatMessage from "./ChatMessage";

// Font Awesome Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

function ChatRoom({ auth, firestore, useCollectionData, firebase }) {
  const messageRef = firestore.collection("messages");
  const query = messageRef.orderBy("createdAt").limit(100);

  const [messages] = useCollectionData(query, { idField: "id" });

  const [formValue, setFormValue] = useState("");

  const dummy = useRef();

  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL, displayName } = auth.currentUser;

    if (formValue.length !== 0) {
      await messageRef.add({
        text: formValue,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        uid,
        photoURL,
        displayName,
      });
    }

    setFormValue("");

    dummy.current.scrollIntoView({ behaviour: "smooth" });
  };

  return (
    <div className="chat-room">
      <div className="chat-msg-list">
        {messages &&
          messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} auth={auth} />
          ))}

        <div ref={dummy}></div>
      </div>
      <form onSubmit={sendMessage}>
        <input
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          type="text"
          placeholder="Message..."
        />
        <button type="submit">
          Send <FontAwesomeIcon icon={faPaperPlane} />
        </button>
      </form>
    </div>
  );
}

export default ChatRoom;
