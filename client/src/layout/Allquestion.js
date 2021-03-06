import React, { useState, useEffect } from "react";
import { data } from "../data/questionsData";
import ProblemsSection from "./ProblemsSection";
import Pagination from "./Pagination";

export default function Allquestion({ category }) {
  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    const q = [];
    data.forEach((ques) => {
      if (ques.category.find((c) => c === category)) q.push(ques);
    });
    setQuestions(q);
  }, [category]);

  // adding pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8);

  // manages number of card on page
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = questions.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <div className="pagination">
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={questions.length}
          paginate={paginate}
        />
      </div>
      <ProblemsSection questions={currentPosts} />
    </div>
  );
}
