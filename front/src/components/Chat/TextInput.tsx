import React from 'react'
import TextField from '@mui/material/TextField';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';


const useStyles = makeStyles(
    {
        wrapForm: {
            display: "flex",
            justifyContent: "center",
            width: "95%",
            margin: `auto`
        },
        wrapText: {
            width: "100%",
            border: '1px solid #5AB967'
        },
        button: {
            //margin: theme.spacing(1),
        },
    }
);


export const TextInput = () => {
    const focusRef = React.useRef<null | HTMLDivElement>(null)
    const focus = () => {
        if(focusRef.current) {
            focusRef.current.style.color = '#5AB967';
        }
    }
    const classes = useStyles();
    return (
        <>
            <form className={classes.wrapForm}    style={{ backgroundColor: '#0B141E' }} noValidate autoComplete="off">
                <TextField
                    id="standard-text"
                    label=""
                    ref={focusRef}
                    onFocus={focus}
                    style={{ border: '1px solid #5AB967', color: '#5AB967' }}
                    className={classes.wrapText}
                //margin="normal"
                />
                <Button variant="contained" color="primary" className={classes.button}>
                    Send
                </Button>
            </form>
        </>
    )
}




