import React from "react";
import { createStyles, makeStyles } from "@mui/styles";
import { Paper } from '@mui/material'
import { TextInput } from "./TextInput";
import { MessageLeft } from "./Message";

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      width: "120rem",
      height: "9rem",
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "flex-end",
      
    },
    messagesBody: {
      width: "calc( 100% - 20px )",
      margin:10,
      overflowY: "scroll",
      height: "calc( 100% - 80px )"
    }
  })
);

export const Chat = () => {
  const classes = useStyles();
  return (
    <div style={{display:'flex',flexDirection:'column',alignItems:'end',backgroundColor:'#0B141E'}}>
      <Paper style={{height:'55.8rem',marginTop:'-34.7rem',width:'22rem',backgroundColor:'#0B141E'}}>
        <Paper id="style-1" style={{backgroundColor:'#0B141E'}} className={classes.messagesBody}>
           <MessageLeft
            message="message"
            photoURL="https://lh3.googleusercontent.com/a-/AOh14Gi4vkKYlfrbJ0QLJTg_DLjcYyyK7fYoWRpz2r4s=s96-c"
            displayName="test"
            avatarDisp={false}
          />
           <MessageLeft
            message="message"
            photoURL="https://lh3.googleusercontent.com/a-/AOh14Gi4vkKYlfrbJ0QLJTg_DLjcYyyK7fYoWRpz2r4s=s96-c"
            displayName="test"
            avatarDisp={false}
          />
           <MessageLeft
            message="message"
            photoURL="https://lh3.googleusercontent.com/a-/AOh14Gi4vkKYlfrbJ0QLJTg_DLjcYyyK7fYoWRpz2r4s=s96-c"
            displayName="test"
            avatarDisp={false}
          />
           <MessageLeft
            message="message"
            photoURL="https://lh3.googleusercontent.com/a-/AOh14Gi4vkKYlfrbJ0QLJTg_DLjcYyyK7fYoWRpz2r4s=s96-c"
            displayName="test"
            avatarDisp={false}
          />
           <MessageLeft
            message="message"
            photoURL="https://lh3.googleusercontent.com/a-/AOh14Gi4vkKYlfrbJ0QLJTg_DLjcYyyK7fYoWRpz2r4s=s96-c"
            displayName="test"
            avatarDisp={false}
          />
           <MessageLeft
            message="message"
            photoURL="https://lh3.googleusercontent.com/a-/AOh14Gi4vkKYlfrbJ0QLJTg_DLjcYyyK7fYoWRpz2r4s=s96-c"
            displayName="test"
            avatarDisp={false}
          />
          
        </Paper>
        <TextInput />
      </Paper>
    </div>
  );
}
