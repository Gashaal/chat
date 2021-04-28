import React, { useEffect, useReducer, useCallback } from "react";
import { makeStyles } from "@material-ui/core";
import { io } from "socket.io-client";
import reducer, { MessageType, Message, actions, StateType } from "./reducer";
import MessageInput from "../MessageInput/MessageInput";
import UserMessage from "../UserMessage/UserMessage";
import InfoMessage from "../InfoMessage/InfoMessage";

const useStyles = makeStyles({
  root: {
    maxHeight: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    padding: "16px",
    boxSizing: "border-box"
  },
  messagesList: {
    flex: 1,
    overflow: "auto",
    marginBottom: "16px"
  }
});

type Props = {
  login: string;
};

const initialState: StateType = {
  messages: []
};

const Chat: React.FC<Props> = ({ login }) => {
  const classes = useStyles();

  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    setSocket,
    setUserJoined,
    setUserLeft,
    addUserMessage,
    setMessagesHistory
  } = actions;
  const { messages, socket } = state;

  useEffect(() => {
    const socket = io(process.env.REACT_APP_URL as string);
    dispatch(setSocket(socket));
    socket.emit("add user", login);

    socket.on("history", ({ messages }) => {
      dispatch(setMessagesHistory(messages));
      dispatch(
        setUserJoined({
          text: `you joined as ${login}`,
          type: MessageType.INFO
        })
      );
    });

    socket.on("user joined", ({ text }) => {
      dispatch(setUserJoined({ text, type: MessageType.INFO }));
    });

    socket.on("new message", ({ username, text }) => {
      dispatch(addUserMessage({ text, type: MessageType.USER, username }));
    });

    socket.on("user left", ({ text }) => {
      dispatch(setUserLeft({ text, type: MessageType.INFO }));
    });
  }, []);

  const handleSendMessage = useCallback(
    (message: string) => {
      dispatch(
        addUserMessage({
          text: message,
          type: MessageType.USER,
          username: login
        })
      );
      socket.emit("new message", message);
    },
    [login, socket, addUserMessage]
  );

  return (
    <div className={classes.root}>
      <div className={classes.messagesList}>
        {messages.map((message: Message, i: number) => {
          const { username = "", type, text } = message;

          return type === MessageType.USER ? (
            <UserMessage key={i} username={username} message={text} />
          ) : (
            <InfoMessage key={i} text={message.text} />
          );
        })}
      </div>
      <MessageInput onSend={handleSendMessage} />
    </div>
  );
};

export default Chat;
