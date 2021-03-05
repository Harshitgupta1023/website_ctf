import React, { useState, useEffect } from "react";
import QuestionCard from "../Components/QuestionCard";
export default function ProblemsSection({ questions }) {
  return (
    <div className="topics-section">
      {questions.map((question, index) => (
        <div className="topppp">
          <QuestionCard
            key={question.id}
            category={question.category}
            className="question"
            points={question.points}
            title={question.title}
            statement={question.statement}
          />
        </div>
      ))}
    </div>
  );
}
