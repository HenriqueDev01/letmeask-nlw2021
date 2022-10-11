import { useEffect, useState } from "react"
import { firebase, database } from "../services/firebase";
import { ParsedQuestion } from "../types/ParsedQuestion"
import { parseQuestion } from "../utils/FirebaseQuestionUtils";
import { useAuth } from "./UseAuth";

// const getQuestionsUsingChildListener = (
//   userId:string|undefined, 
//   questionsRef:firebase.database.Reference,
//   setQuestions: React.Dispatch<React.SetStateAction<ParsedQuestion[]>>
// ) => {
//   questionsRef.on("child_added", ds => {
//     if (!ds.key) return;
//     const question = parseQuestion(userId, ds.key, ds.val());
//     setQuestions(oldQuestions => [...oldQuestions, question]);
//   });
//   questionsRef.on("child_changed", ds => {
//     if (!ds.key) return;
//     const id = ds.key
//     const question = parseQuestion(userId, id, ds.val());

//     setQuestions(oldQuestions => {
//       let changed = false;
//       for (var i = 0; i < oldQuestions.length; i++) {
//         if (oldQuestions[i].id === id) {
//           oldQuestions[i] = question;
//           changed = true;
//           break;
//         }
//       }
//       return (changed ? [...oldQuestions] : oldQuestions);
//     })
//   });
//   questionsRef.on("child_removed", ds => {
//     if (!ds.key) return;
//     const id = ds.key;

//     setQuestions(oldQuestions => {
//       for (var i = 0; i < oldQuestions.length; i++) {
//         if (oldQuestions[i].id === id) {
//           oldQuestions.splice(i, 1);
//           break;
//         }
//       }
//       return oldQuestions;
//     });
//   });
// }

const getQuestionsUsingValueListener = (
    userId:string|undefined, 
    questionsRef:firebase.database.Reference,
    setQuestions: React.Dispatch<React.SetStateAction<ParsedQuestion[]>>
  ) => {
    questionsRef.on('value', snapshot => {
    if (!snapshot?.key) return;
    if (!snapshot.hasChildren()) {
      setQuestions([]);
      return
    }
    const parsedQuestions:ParsedQuestion[] = []
    snapshot.forEach(ds => {
      if (ds.key) parsedQuestions.push(parseQuestion(userId, ds.key, ds.val()))
    });
    setQuestions(parsedQuestions.reverse());
    })
}

export function useQuestions(roomId: string) {
  const {user} = useAuth();
  const [questions, setQuestions] = useState<ParsedQuestion[]>([]);

  useEffect(() => {
    // if (!user) return;

    const questionsRef = database.ref(`rooms/${roomId}/questions`);

    // getQuestionsUsingChildListener(user?.id, questionsRef, setQuestions)
    getQuestionsUsingValueListener(user?.id, questionsRef, setQuestions)

    return () => {
      questionsRef.off();
    }
  }, [user, roomId]);

  return {questions};
}