import React, { useState } from "react";
import { questionCrypto } from "../data/questionCrypto";
import QuestionCard from "../Components/QuestionCard";

export default function Cryptoquestion() {
  const [questions] = useState(questionCrypto);
  return (
    <div className="topics-section">
      {questions.map((question) => (
        <QuestionCard
          key={question.id}
          category={question.category} //how to show all
          className="question"
          points={question.points}
          title={question.title}
          statement={question.statement}
        />
      ))}
    </div>
  );
}
