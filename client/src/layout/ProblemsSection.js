import React, { useState, useEffect } from "react";
import { data } from "../data/questionsData";
import QuestionCard from "../Components/QuestionCard";
export default function ProblemsSection({ category }) {
  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    const q = [];
    data.forEach((ques) => {
      if (ques.category.find((c) => c === category)) q.push(ques);
    });
    setQuestions(q);
  }, [category]);

  return (
    <div className="topics-section">
      {questions.map((question) => (
        <QuestionCard
          key={question.id}
          category={question.category}
          className="question"
          points={question.points}
          title={question.title}
          statement={question.statement}
        />
      ))}
    </div>
  );
}
