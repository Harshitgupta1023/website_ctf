import React from "react";
import Pagination from "@material-ui/lab/Pagination";
export default function BasicPagination({
  postsPerPage,
  totalPosts,
  paginate,
}) {
  const i = Math.ceil(totalPosts / postsPerPage);
  return (
    <Pagination
      style={{ display: "flex", justifyContent: "center" }}
      count={i}
      size="large"
      color="secondary"
      onChange={(event, page) => paginate(page)}
    />
  );
}
