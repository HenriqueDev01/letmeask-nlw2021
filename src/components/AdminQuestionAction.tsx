import { FC, memo, useCallback } from "react";
import { database } from "../services/firebase";
import { ParsedQuestion } from "../types/ParsedQuestion";

import checkImg from "../assets/images/check.svg"
import answerImg from "../assets/images/answer.svg"
import deleteImg from "../assets/images/delete.svg"

type AdminQuestionActionsProps = {
  roomId: string
  question: ParsedQuestion
}

const AdminQuestionActions:FC<AdminQuestionActionsProps> = ({roomId, question}) => {
  const handleCheckQuestionAsAnswered = useCallback(async (questionId:string, currentState: boolean) => {
    await database.ref(`rooms/${roomId}/questions/${questionId}/isAnswered`).set(!currentState);
  }, [roomId]);

  const handleHighlightQuestion = useCallback(async (questionId:string, currentState: boolean) => {
    await database.ref(`rooms/${roomId}/questions/${questionId}/isHighlighted`).set(!currentState);
  }, [roomId]);

  const handleDeleteQuestion = useCallback(async (questionId: string) => {
    if (window.confirm("Tem certeza que você deseja excluir esta pergunta?")) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
    }
  }, [roomId]);

  return (
    <>
      <button 
        type="button"
        className="highlight-button"
        onClick={(() => handleHighlightQuestion(question.id, question.isHighlighted))} 
      >
        <img src={checkImg} alt ="Destacar pergunta"/> 
      </button> 
      <button 
        type="button"
        className="answer-button"
        onClick={(() => handleCheckQuestionAsAnswered(question.id, question.isAnswered))} 
      >
        <img src={answerImg} alt ="Marcar como respondida"/>
      </button> 
      <button 
        type="button"
        className="remove-button"
        onClick={(() => handleDeleteQuestion(question.id))}
      >
        <img src={deleteImg} alt ="Remover pergunta"/>
      </button> 
    </>
  )
}

export default memo(AdminQuestionActions);
