import { Socket } from "socket.io-client";
import reducer, {
  SET_SOCKET,
  SET_USER_JOINED,
  ADD_USER_MESSAGE,
  SET_USER_LEFT,
  SET_MESSAGES_HISTORY,
  MessageType
} from "./reducer";

describe("test reducer", () => {
  test("SET_SOCKET", () => {
    const initialState = {
      messages: []
    };
    const socket = {} as Socket;

    const state = reducer(initialState, {
      type: SET_SOCKET,
      socket
    });

    expect(state).toEqual({ socket, messages: [] });
  });

  test("SET_USER_JOINED", () => {
    const initialState = {
      messages: []
    };
    const message = {
      text: "user joined",
      type: MessageType.INFO
    };

    const state = reducer(initialState, {
      type: SET_USER_JOINED,
      message
    });

    expect(state).toEqual({ messages: [message] });
  });

  test("ADD_USER_MESSAGE", () => {
    const initialState = {
      messages: []
    };
    const message = {
      text: "test message",
      username: "user",
      type: MessageType.USER
    };

    const state = reducer(initialState, {
      type: ADD_USER_MESSAGE,
      message
    });

    expect(state).toEqual({ messages: [message] });
  });

  test("SET_USER_LEFT", () => {
    const initialState = {
      messages: []
    };
    const message = {
      text: "user left",
      type: MessageType.INFO
    };

    const state = reducer(initialState, {
      type: SET_USER_LEFT,
      message
    });

    expect(state).toEqual({ messages: [message] });
  });

  test("SET_MESSAGES_HISTORY", () => {
    const initialState = {
      messages: []
    };
    const messages = [
      {
        text: "test message",
        username: "user",
        type: MessageType.USER
      },
      {
        text: "user joined",
        type: MessageType.INFO
      }
    ];

    const state = reducer(initialState, {
      type: SET_MESSAGES_HISTORY,
      messages
    });

    expect(state).toEqual({ messages });
  });
});
