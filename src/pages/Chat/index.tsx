import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import style from "./chat.module.scss";
import BOT_IMG from "../../assets/bot.png";
import PERSON_IMG from "../../assets/person.png";
import SEND_ICON from "../../assets/send.svg";
import BACK_ICON from "../../assets/back.svg";
import { REACT_APP_CALCULATOR_BASE_URL } from "../../apis/services";
import { Message } from "../../apis/types";
import { clsx as cn } from "clsx";

const Chat = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [chat, setChat] = useState("");

  const userID = sessionStorage.getItem("userID");
  const socket = io(REACT_APP_CALCULATOR_BASE_URL as string);

  useEffect(() => {
    if (!userID) {
      navigate("/");
      return;
    }

    socket.on("connect", () => {
      onConnectSocket();
    });

    if (socket.connected) {
      onConnectSocket();
    }
  }, []);

  const onConnectSocket = () => {
    socket.emit("join", { userID, socketID: socket.id });
    socket.on("previousMessage", (data) => {
      setMessages(data);
      setDataLoaded(true);
      scrollMessage();
    });
  };

  const scrollMessage = () => {
    const chatbox = document.querySelector("#msger-chat");
    if (chatbox) {
      chatbox.scrollTo({ top: chatbox.scrollHeight, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handleReceiveMessage = (data: Message) => {
      if (!messages.some((message) => message._id === data._id)) {
        setMessages((prev) => [...prev, data]);
        scrollMessage();
      }
    };
    socket.on("receiveMessage", (data) => {
      handleReceiveMessage(data);
    });
  }, [socket]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (chat && userID && socket.id) {
      const newMessage = {
        text: chat,
        user: userID,
        isUser: true,
        createdAt: new Date().toISOString(),
      };
      setMessages((prev) => {
        return [...prev, newMessage];
      });
      socket.emit("sendMessage", { newMessage, socketID: socket.id });
    }
    setChat("");
  };

  // Function to format the timestamp to local time
  const formatLocalTime = (createdAt: string) => {
    const date = new Date(createdAt);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    };
    return date.toLocaleDateString("en-US", options);
  };

  return (
    <div className={style.msger}>
      <header className={style.msgerHeader}>
        <img
          src={BACK_ICON}
          className={style.msgerHeaderBack}
          onClick={() => navigate("/")}
        />
        <div className={style.msgerHeaderTitle}>Chat Bot</div>
      </header>
      {dataLoaded && (
        <form onSubmit={handleSubmit}>
          <main id="msger-chat" className={style.msgerChat}>
            {messages?.map((message, index) => (
              <div
                key={index}
                className={cn(
                  style.msg,
                  message.isUser ? style.rightMsg : style.leftMsg
                )}
              >
                <div
                  className={style.msgImg}
                  style={{
                    backgroundImage: `url(${
                      message.isUser ? PERSON_IMG : BOT_IMG
                    })`,
                  }}
                ></div>
                <div className={style.msgBubble}>
                  <div className={style.msgInfo}>
                    <div className={style.msgInfoName}>
                      {message.isUser ? "You" : "BOT"}
                    </div>
                    <div className={style.msgInfoTime}>
                      {formatLocalTime(message.createdAt)}
                    </div>
                  </div>
                  <div className={style.msgText}>{message.text}</div>
                </div>
              </div>
            ))}
          </main>

          <div className={style.msgerInputArea}>
            <input
              type="text"
              className={style.msgerInput}
              name="msgText"
              placeholder="Enter your message..."
              value={chat}
              onChange={(e) => setChat(e.target.value)}
            />
            <input
              type="image"
              src={SEND_ICON}
              className={style.msgerSendBtn}
            />
          </div>
        </form>
      )}
    </div>
  );
};

export default Chat;
