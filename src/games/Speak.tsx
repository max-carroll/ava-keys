import React, { ChangeEvent } from "react";
import { TextField, Button } from "@mui/material";
import { useSpeech } from "../hooks";

export const Speak = () => {
  const [text, setText] = React.useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.persist();
    setText(event.target.value);
  };

  const talk = useSpeech(text);

  return (
    <>
      <TextField
        value={text}
        onChange={handleChange}
        multiline
        rows={10}
        InputProps={{
          style: {
            fontSize: "2rem",
            color: "white",
          },
        }}
      ></TextField>

      <Button onClick={talk} color="primary" variant="contained">
        Say it
      </Button>
    </>
  );
};
