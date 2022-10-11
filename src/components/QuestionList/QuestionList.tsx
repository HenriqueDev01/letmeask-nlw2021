import React, { memo, ReactNode } from "react"
import { ParsedQuestion } from "../../types/ParsedQuestion";
import Question from "../Question/Question";
import { useQuestions } from "../../hooks/useQuestions";

type QuestionListProps = {
  roomId: string,
  setQuestionCount?: (count:number) => void,
  questionActions: (question:ParsedQuestion) => ReactNode|null
}

const QuestionList: React.FC<QuestionListProps> = ({
    roomId,
    setQuestionCount,
    questionActions}
  ) => {
  
  const {questions} = useQuestions(roomId);

  const questionCount = questions.length;
  if (setQuestionCount) setQuestionCount(questionCount);

  return (
    <div id="questions">
      <div className='question-count'>
        <span>{questionCount} pergunta{questionCount !== 1 && 's'}</span>
      </div>
      <div className="question-list">
        {questions.map(question => 
            <Question
              key={question.id} 
              question={question}
            >
              {questionActions(question)}
            </Question>
          )}
      </div> 
    </div>
  )
}

export default memo(QuestionList);
