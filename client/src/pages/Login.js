import React from "react";
import Logincard from "../layout/Logincard";
import Navbar from "../layout/Navbar";
export default function Login({ slides }) {
  return (
    <div>
      <Navbar tools getStarted noLogin home />
      <Logincard />
    </div>
  );
}
