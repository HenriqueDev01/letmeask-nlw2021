export type FirebaseQuestion = {
  author: {
    name: string,
    avatar: string
  },
  content: string,
  isAnswered: boolean,
  isHighlighted: boolean,
  likes?: Record<string,string>
};
