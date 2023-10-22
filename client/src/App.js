import "./App.css";
import io from "socket.io-client";
import { useState } from "react";
import Chat from "./Chat";

// const socket = io.connect("http://localhost:3001");
const socket = io.connect("https://mern-chat-o2n9.onrender.com/");  

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [clname, setclname] = useState("App")

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
      setclname("App1")
    }
  };

  return (
    <div className={clname}>
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>NodeChat</h3>
          <input
            type="text"
            placeholder="Enter Username"
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Enter Room ID"
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          <button onClick={joinRoom}>Join A Room</button>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  );
}

export default App;
