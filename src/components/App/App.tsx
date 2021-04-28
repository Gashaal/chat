import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import Login from "../Login/Login";
import Chat from "../Chat/Chat";

const useStyles = makeStyles({
  root: {
    height: "100%"
  }
});

function App() {
  const classes = useStyles();
  const [username, setUsername] = useState("");

  return (
    <div className={classes.root}>
      {username ? <Chat login={username} /> : <Login onLogin={setUsername} />}
    </div>
  );
}

export default App;
