import React from "react";
import { createStyles,makeStyles } from "@mui/styles";
import Avatar from "@mui/material/Avatar";
const useStyles = makeStyles(() =>
  createStyles({
    messageRow: {
      display: "flex",
      background:''
    },
    messageRowRight: {
      display: "flex",
      justifyContent: "flex-end"
    },
    messageBlue: {
      position: "relative",
      marginLeft: "20px",
      marginBottom: "10px",
      padding: "10px",
      backgroundColor: "#5AB967",
      width: "60%",
      //height: "50px",
      textAlign: "left",
      font: "400 .9em 'Open Sans', sans-serif",
      border: "1px solid #5AB967",
      borderRadius: "10px",
      "&:after": {
        content: "''",
        position: "absolute",
        width: "0",
        height: "0",
        borderTop: "15px solid #5AB967",
        borderLeft: "15px solid transparent",
        borderRight: "15px solid transparent",
        top: "0",
        left: "-15px"
      },
      "&:before": {
        content: "''",
        position: "absolute",
        width: "0",
        height: "0",
        borderTop: "17px solid #5AB967",
        borderLeft: "16px solid transparent",
        borderRight: "16px solid transparent",
        top: "-1px",
        left: "-17px"
      }
    },
    messageOrange: {
      position: "relative",
      marginRight: "20px",
      marginBottom: "10px",
      padding: "10px",
      backgroundColor: "#f8e896",
      width: "60%",
      //height: "50px",
      textAlign: "left",
      font: "400 .9em 'Open Sans', sans-serif",
      border: "1px solid #dfd087",
      borderRadius: "10px",
    },

    messageContent: {
      padding: 0,
      margin: 0,
      width:300,
      color:'#fff'
     
    },
    messageTimeStampRight: {
      position: "absolute",
      fontSize: ".85em",
      fontWeight: "300",
      marginTop: "10px",
      bottom: "-3px",
      right: "5px"
    },
    orange: {
      color: "orange",
      backgroundColor: "orange",
      width: "250px",
      height: "250px",
      marginLeft:'4px'
    },
    avatarNothing: {
      color: "transparent",
      backgroundColor: "transparent",
      width: "250px",
      height: "250px"
    },
    displayName: {
      marginLeft: "20px",
      color:'#fff'
    }
  })
);


export const MessageLeft = (props:any) => {
  const message = props.message ? props.message : "no message";
  const photoURL = props.photoURL ? props.photoURL : "dummy.js";
  const displayName = props.displayName ? props.displayName : "test";
  const classes = useStyles();
  return (
    <>
      <div className={classes.messageRow}>
        <Avatar style={{maxWidth:'40px',maxHeight:'40px'}}
          alt={displayName}
          className={classes.orange}
          src={photoURL}
        ></Avatar>
        <div>
          <div className={classes.displayName}>{displayName}</div>
          <div className={classes.messageBlue}>
            <div>
              <p className={classes.messageContent} >{message}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};