import React, { useState } from "react";
import { useEffect } from "react";
import { generateMessage, stopMessage, Message } from "../Api";
import Grid from "@mui/material/Grid";
import { Button, Container, Divider } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
    body:{
      color:"#101010"
    },
    heading_text: {
      margin: "10px 0",
    },
    divider: {
  
    },
    global_action_section:{
      marginTop:"10px",
      textAlign:"center"
    },
    action_clear:{
      background:"#88fca3 !important" ,
      padding: "0px 10px !important",
      color:"#101010 !important",
      marginLeft:"5px !important",
    },
    action_start:{
      background:"#88fca3 !important" ,
      padding: "0px 10px !important",
      color:"#101010 !important"
    },
    title:{
      margin: "5px 0",
      fontWeight:"800"
    },
    counter:{
      margin: "5px 0",
      fontWeight:"550"
    },
    error_block:{
      backgroundColor:"#F56236",
      padding:"5px 10px",
      marginTop:"10px",
      borderRadius:"5px",
    },
    warning_block:{
      backgroundColor:"#FCE788",
      padding:"5px 10px",
      marginTop:"10px",
      borderRadius:"5px",
    },
    info_block:{
      backgroundColor:"#88FCA3",
      padding:"5px 10px",
      marginTop:"10px",
      borderRadius:"5px",
    },
    message:{
      margin:"5px 0",
    },
    clear:{
      margin:"5px 0",
      cursor:"pointer",
      textAlign:"end"
    }
  });

  const MessagePage: React.FC<{}> = () => {
    const classes = useStyles();
    const [messages, setMessages] = useState<Message[]>([]);
    const [isStart, setIsStart] = useState<boolean>(true);
  
    useEffect(() => {
      startMessage();
      removeOldMessage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setMessages]);
  
    const startMessage = () => {
      const cleanUp = generateMessage((message: Message) => {
        setMessages((oldMessages) => [...oldMessages, message]);
      });
      return cleanUp;
    };
  
    const removeOldMessage = () => {
      setMessages((oldMessages) => {
        const temp: any[] = oldMessages.slice(1, oldMessages.length + 1);
        return temp;
      });
      setTimeout(removeOldMessage, 3000);
    };
  
    const deleteMessage = (value: Message) => {
      setMessages((oldMessages) => {
        const temp = oldMessages.filter((ele) => ele.message !== value.message);
        console.log(temp, "temp");
        return temp;
      });
    };
  
    return (
      <div className={classes.body}>
        <Container maxWidth="xl">
          <h1 data-testid="heading_text" className={classes.heading_text}>Coding Challenge</h1>
        </Container>
        <Divider className={classes.divider} />
        <Container maxWidth="xl">
          <div className={classes.global_action_section}>
            <Button data-testid="start_stop_button"
              onClick={() => {
                if (isStart) {
                  stopMessage();
                  setIsStart(!isStart);
                } else {
                  setIsStart(!isStart);
                  startMessage();
                }
              }}
              variant="contained"
              className={classes.action_start}
            >
              {isStart ? "stop" : "start"}
            </Button>
            <Button data-testid="clear_button" onClick={() => setMessages([])} variant="contained" className={classes.action_clear}>
              Clear
            </Button>
          </div>
  
          <div style={{marginTop:"25px"}}>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <h2 className={classes.title}>Error Type 1</h2>
                <p className={classes.counter}>Count {messages.filter((e) => e.priority === 0).length}</p>
                {messages
                  .filter((e) => e.priority === 0)
                  .map((ele,index) => {
                    return (
                      <div className={classes.error_block} key={index} data-test="error_part">
                        <p className={classes.message} >{ele.message}</p>
                        <p
                          onClick={() => {
                            console.log("ele", ele);
                            deleteMessage(ele);
                          }}
                          className={classes.clear}
                        >
                          Clear
                        </p>
                      </div>
                    );
                  })
                  .reverse()}
              </Grid>
              <Grid item xs={4}>
              <h2 className={classes.title}>Error Type 2</h2>
                <p className={classes.counter}>Count {messages.filter((e) => e.priority === 1).length}</p>
                {messages
                  .filter((e) => e.priority === 1)
                  .map((ele,index) => {
                    return (
                      <div className={classes.warning_block} key={index}>
                        <p className={classes.message}>{ele.message}</p>
                        <p
                          className={classes.clear}
                          onClick={() => {
                            console.log("ele", ele);
                            deleteMessage(ele);
                          }}
                        >
                          Clear
                        </p>
                      </div>
                    );
                  })
                  .reverse()}
              </Grid>
              <Grid item xs={4}>
              <h2 className={classes.title}>Error Type 3</h2>
                <p className={classes.counter}>Count {messages.filter((e) => e.priority === 2).length}</p>
                {messages
                  .filter((e) => e.priority === 2)
                  .map((ele,index) => {
                    return (
                      <div className={classes.info_block} key={index}>
                        <p className={classes.message}>{ele.message}</p>
                        <p
                          onClick={() => {
                            console.log("ele", ele);
                            deleteMessage(ele);
                          }}
                          className={classes.clear}
                        >
                          Clear
                        </p>
                      </div>
                    );
                  })
                  .reverse()}
              </Grid>
            </Grid>
          </div>
        </Container>
      </div>
    );
  };
  
  export default MessagePage;

