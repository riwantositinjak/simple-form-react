import React, { useState, useRef } from "react";
import Button from "../UI/Button";
import Card from "../UI/Card";
import ErrorModal from "../UI/ErrorModal";
import Wrapper from "../Helpers/Wrapper";
import classes from "./AddUser.module.css";

function AddUser(props) {
  const [error, setError] = useState();
  const inputNameRef = useRef();
  const inputAgeRef = useRef();

  const onSubmitHandler = (event) => {
    event.preventDefault();
    const enteredName = inputNameRef.current.value;
    const enteredUserAge = inputAgeRef.current.value;
    if (enteredName.trim().length === 0 || enteredUserAge.trim().length === 0) {
      setError({
        title: "Invalid Input",
        messages: "please add a valid username and age",
      });
      return;
    }
    if (+enteredUserAge < 1) {
      setError({ title: "invalid age", messages: "Please add a valid age" });
      return;
    }
    props.onAddUsers(enteredName, enteredUserAge);
    inputNameRef.current.value = "";
    inputAgeRef.current.value = "";
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <Wrapper>
      {error && (
        <ErrorModal
          title={error.title}
          messages={error.messages}
          onConfirm={errorHandler}
        />
      )}
      <Card className={classes.input}>
        <form onSubmit={onSubmitHandler}>
          <label htmlFor="username">Username</label>
          <input type="text" id="username" ref={inputNameRef} />
          <label htmlFor="age">Age</label>
          <input type="number" id="age" ref={inputAgeRef} />
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </Wrapper>
  );
}

export default AddUser;
