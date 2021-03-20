import React from "react";
import Typical from "react-typical";
export default function Typing(props) {
  return (
    <div style={{ color: "gold"}}>
     
      <h1>
        <Typical loop={Infinity} wrapper="b" steps={props.words} />
      </h1>
      
    </div>
  );
}