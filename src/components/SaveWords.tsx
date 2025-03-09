// eslint-disable
import React, { ChangeEvent } from "react";
import "../App.css";
import { Button, Grid, TextField } from "@mui/material";

export function SaveWords() {
  const initial = localStorage.getItem("words");
  const [words, setWords] = React.useState(initial);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.persist();
    setWords(e.target?.value);
  };

  const handleSave = () => {
    localStorage.setItem("words", words!);
  };
  return (
    <>
      <Grid item xs={6}>
        <TextField
          onChange={handleChange}
          fullWidth
          value={words}
          multiline
          rows={10}
        ></TextField>
      </Grid>
      <Grid item xs={6}>
        <Button onClick={handleSave} variant="contained">
          Save
        </Button>
      </Grid>
    </>
  );
}
