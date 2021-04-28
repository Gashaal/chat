import React, { useState, useCallback } from 'react';
import { TextField, Button, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    form: {
        display: 'flex',
    },
    input: {
        width: '300px',
        marginRight: '8px',
    },
});

type Props = {
    onLogin: (login: string) => void;
};

const Login: React.FC<Props> = ({ onLogin }) => {
    const classes = useStyles();
    const [login, setLogin] = useState('');

    const handleChange = useCallback(e => {
        setLogin(e.target.value);
    }, []);

    const handleSubmit = useCallback(
        e => {
            e.preventDefault();
            onLogin(login);
        },
        [login, onLogin],
    );

    return (
        <div className={classes.root}>
            <form className={classes.form} onSubmit={handleSubmit}>
                <TextField
                    value={login}
                    onChange={handleChange}
                    className={classes.input}
                    label="Your chat username"
                    variant="outlined"
                />
                <Button variant="contained" color="primary" onClick={handleSubmit}>
                    Go
                </Button>
            </form>
        </div>
    );
};

export default Login;
