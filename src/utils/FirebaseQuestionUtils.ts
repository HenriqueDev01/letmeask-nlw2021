import { FirebaseQuestion } from "../types/FirebaseQuestion";
import { ParsedQuestion } from "../types/ParsedQuestion";

export function parseQuestion(
    userId: string|undefined,
    questionId:string,
    question:FirebaseQuestion) :ParsedQuestion {

  let authorIds = Object.keys(question.likes ?? []);
  let liked_by_me = (userId ? authorIds.some(item => item === userId) : false);
  let likes_count = authorIds.length;

  return {
    id: questionId,
    author: question.author,
    content: question.content,
    isAnswered: question.isAnswered,
    isHighlighted: question.isHighlighted,
    likes_count,
    liked_by_me
  }
}