import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { database } from "../services/firebase";
import { useAuth } from "./UseAuth";

export function useRoom(roomId: string) {
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const history = useHistory();

  useEffect(() => {
    if (!user) {
      setIsAdmin(false);
      return;
    }
    const roomInfoRef = database.ref(`rooms/${roomId}/info`);

    roomInfoRef.once('value', ds => {
      const {title, authorId, closedAt} = ds.val();
      if (closedAt) {
        alert("Esta sala já foi encerrada");
        history.push('/');
        return;
      }
      if (authorId === user?.id) {
        setIsAdmin(true);
      }
      setTitle(title);
    });

    return () => {
      roomInfoRef.off()
    };
  }, [roomId, user, history]);

  return { title, isAdmin, history };
}