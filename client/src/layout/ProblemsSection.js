import React from "react";
import QuestionCard from "../Components/QuestionCard";
export default function ProblemsSection({ questions }) {
    return (
        <div className="topics-section">
            {questions.map((question, index) => (
                <div className="topppp" key={question.id}>
                    <QuestionCard
                        category={question.category}
                        className="question"
                        points={question.points}
                        title={question.title}
                        statement={question.statement}
                        fileURL={question.fileURL}
                    />
                </div>
            ))}
        </div>
    );
}
