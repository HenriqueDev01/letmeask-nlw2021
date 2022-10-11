// import { FirebaseQuestion } from "./FirebaseQuestion";

// export type ParsedQuestion = FirebaseQuestion & {
//   id: string,
// }

export type ParsedQuestion = {
  id: string;
  author: {
    name: string,
    avatar: string
  },
  content: string,
  isHighlighted: boolean,
  isAnswered: boolean,
  liked_by_me: boolean
  likes_count: number,
}