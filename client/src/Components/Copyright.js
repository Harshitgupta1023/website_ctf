import React from "react";
import Link from "@material-ui/core/Link";

export default function Copyright() {
  return (
    <div>
      {"Copyright © "}
      <Link color="inherit" href="https://seekhoctf.herokuapp.com/">
        SeekhoCTF
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </div>
  );
}
