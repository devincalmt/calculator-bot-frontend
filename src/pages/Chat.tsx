import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { REACT_APP_CALCULATOR_API_BASE_URL } from "../apis/services";
import { io } from "socket.io-client";

const socket = io(REACT_APP_CALCULATOR_API_BASE_URL as string);

const Chat = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    const userID = sessionStorage.getItem("userID");
    if (!userID) {
      navigate("/");
    } else {
      socket.emit("join", { userID, socketID: socket.id });
    }
  }, []);
  useEffect(() => {
    socket.on("previousMessage", (data) => {
      setMessages(data);
    });
  }, [socket]);
  console.log("messages", messages);
  return <div>Chat</div>;
};

export default Chat;
