import React, { useState, useCallback } from 'react';
import { TextField, Button, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        display: 'flex',
    },
    input: {
        flex: 1,
        marginRight: '8px',
    },
});

type Props = {
    onSend: (message: string) => void;
};

const MessageInput: React.FC<Props> = ({ onSend }) => {
    const classes = useStyles();
    const [message, setMessage] = useState('');

    const handleChange = useCallback(e => {
        setMessage(e.target.value);
    }, []);

    const handleSubmit = useCallback(
        e => {
            e.preventDefault();
            if (message) {
                onSend(message);
                setMessage('');
            }
        },
        [message, onSend],
    );

    return (
        <form className={classes.root} onSubmit={handleSubmit}>
            <TextField
                className={classes.input}
                variant="outlined"
                value={message}
                onChange={handleChange}
            />
            <Button variant="contained" color="primary" onClick={handleSubmit}>
                Send
            </Button>
        </form>
    );
};

export default MessageInput;
