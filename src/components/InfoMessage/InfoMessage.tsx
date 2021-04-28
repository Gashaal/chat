import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        display: 'flex',
        justifyContent: 'center',
    },
});

type Props = {
    text: string;
};

const InfoMessage: React.FC<Props> = ({ text }) => {
    const classes = useStyles();

    return <div className={classes.root}>{text}</div>;
};

export default InfoMessage;
