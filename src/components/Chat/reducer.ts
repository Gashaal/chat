import { Socket } from "socket.io-client";

export enum MessageType {
  INFO = "info",
  USER = "user"
}

export type Message = {
  username?: string;
  text: string;
  type: MessageType;
};

export const SET_SOCKET = "SET_SOCKET";
export const SET_USER_JOINED = "SET_USER_JOINED";
export const ADD_USER_MESSAGE = "ADD_USER_MESSAGE";
export const SET_USER_LEFT = "SET_USER_LEFT";
export const SET_MESSAGES_HISTORY = "SET_MESSAGES_HISTORY";

export const actions = {
  setSocket: (socket: Socket) => ({ type: SET_SOCKET, socket } as const),
  setUserJoined: (message: Message) =>
    ({ type: SET_USER_JOINED, message } as const),
  addUserMessage: (message: Message) =>
    ({ type: ADD_USER_MESSAGE, message } as const),
  setUserLeft: (message: Message) =>
    ({ type: SET_USER_LEFT, message } as const),
  setMessagesHistory: (messages: Message[]) =>
    ({ type: SET_MESSAGES_HISTORY, messages } as const)
};

export type StateType = {
  socket?: Socket;
  messages: Message[];
};

function reducer(state: StateType, action: any) {
  switch (action.type) {
    case SET_SOCKET:
      return { ...state, socket: action.socket };
    case SET_MESSAGES_HISTORY:
      return { ...state, messages: [...state.messages, ...action.messages] };
    case ADD_USER_MESSAGE:
    case SET_USER_JOINED:
    case SET_USER_LEFT:
      return { ...state, messages: [...state.messages, action.message] };
    default:
      return state;
  }
}

export default reducer;
