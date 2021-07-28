import { Button, Grid, Typography } from '@material-ui/core';
import { useState } from 'react';
import './App.css';

function App() {

  let numerics = new Set("0123456789.()");
  let operators = new Set("+-*/%");
  let buttons = ["(", ")", "%", "AC", "7", "8", "9", "/", "4", "5", "6", "*", "1", "2", "3", "-", "0", ".", "=", "+"];

  let [oldExpression, setOldExpression] = useState("");
  let [expression, setExpression] = useState("0");
  let [prev, setPrev] = useState("ANS");

  let evaluateExpression = function () {
    let evaluate = eval(expression);
    setOldExpression(expression + "= ");
    setExpression(String(evaluate));
    setPrev("ANS");
  }

  let putNumerics = function (value) {
    if (prev === "ANS") {
      setOldExpression("Ans = " + expression);
      setExpression(value);
      setPrev("NUM");
    }
    else {
      setExpression(expression + value);
    }
  }

  let putOperators = function (value) {
    if (prev !== "OP") {
      setExpression(expression + value);
    }
    else {
      setExpression(expression.slice(0, -1) + value);
    }
    setPrev("OP");
  }

  let putDelete = function () {
    if (expression.length >= 1) {
      setExpression(expression.slice(0, -1));
    }
    setPrev("DEL");
  }

  let handleKeyUp = function (event) {
    console.log(event.key);

    if (event.key === "Backspace") {
      putDelete();
    }
    else if (numerics.has(event.key)) {
      putNumerics(event.key);
    }
    else if (operators.has(event.key)) {
      putOperators(event.key);
    }
    else if (event.key === "Enter") {
      evaluateExpression();
    }
  }

  return (
    <Grid container className="App" onKeyUp={handleKeyUp} style={{
      width: "100vw",
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "10px"
    }}>
      <Typography variant="h2" style={{
        color: "#194350",
        fontFamily: "montserrat",
        padding: "10px"
      }}>Calculator</Typography>

      <Grid container style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "10px"
      }}>
        <Grid item xs={12} style={{
          width: "400px",
          background: "#194350",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          justifyContent: "center",
          borderRadius: "10px",
          padding: "20px",
          overflow: "hidden",
          color: "#ffffff"
        }}>
          <h6>{oldExpression}</h6>
          <h1>{expression}</h1>
        </Grid>

        <Grid item xs={12} style={{
          width: "400px",
          background: "#194350",
          padding: "20px",
          borderRadius: "10px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "flex-start",
          flexWrap: "wrap",
          margin: "10px"
        }}>
          {buttons.map(function (buttonValue, index) {
            return <Button style={{

              background: "#d8e3e7",
              padding: "5px",
              margin: "8px"
            }} onClick={function () {
              if (buttonValue === "AC") {
                putDelete();
              }
              else if (numerics.has(buttonValue)) {
                putNumerics(buttonValue);
              }
              else if (operators.has(buttonValue)) {
                putOperators(buttonValue);
              }
              else if (buttonValue === "=") {
                evaluateExpression();
              }
            }}>{buttonValue}</Button>
          })}
        </Grid>

      </Grid>

    </Grid>
  );
}

export default App;
