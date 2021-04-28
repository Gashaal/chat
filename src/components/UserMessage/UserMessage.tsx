import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        display: 'flex',
        marginBottom: '8px',
    },
    username: {
        fontWeight: 'bold',
    },
    message: {
        flex: 1,
        marginLeft: '16px',
    },
});

type Props = {
    username: string;
    message: string;
};

const UserMessage: React.FC<Props> = ({ username, message }) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <span className={classes.username}>{username}</span>
            <span className={classes.message}>{message}</span>
        </div>
    );
};

export default UserMessage;
