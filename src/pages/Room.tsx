import { FormEvent, useCallback, useRef } from 'react';
import { useParams } from 'react-router-dom'

import imgLogo from "../assets/images/logo.svg"

import Button from "../components/Button"
import QuestionsActions from '../components/QuestionActions';
import QuestionList from '../components/QuestionList/QuestionList';
import RoomCode from "../components/RoomCode";
import UserImage from '../components/UserImage/UserImage';
import { useAuth } from '../hooks/UseAuth';
import { useRoom } from '../hooks/useRoom';
import { database, serverTimestamp } from '../services/firebase';

import "../styles/room.scss";

type RoomParams = {
  id: string;
}

export function Room() {
  const params = useParams<RoomParams>();
  const roomId = params.id;
  const { user, singInWithGoogle, singOut } = useAuth();
  const {isAdmin, title, history} = useRoom(roomId);
  const newQuestionRef = useRef<HTMLTextAreaElement>(null);

  const handleLogin = useCallback(() => {
    if (!user) singInWithGoogle()
  }, [singInWithGoogle, user])

  const handleSingout = useCallback(() => {
    singOut();
  }, [singOut])

  const handleGoToAdminView = useCallback(() => {
    history.push(`/admin/rooms/${roomId}`)
  }, [roomId, history]);

  const handleChangeRoom = useCallback(() => {
    history.push('/');
  }, [history])

  const handleNewQuestion = useCallback(async (event: FormEvent) => {
    event.preventDefault();
    if (!newQuestionRef.current) return;

    const newQuestion = newQuestionRef.current.value;

    if (newQuestion.trim() === '') {
      return;
    }

    if (!user) {
      throw Error("You must be logged in");
    }

    const question = {
      content: newQuestion,
      author: {
        name: user.name,
        avatar: user.avatar
      },
      created_at: serverTimestamp,
      isHighlighted: false,
      isAnswered: false
    };

    newQuestionRef.current.value = '';
    await database.ref(`rooms/${roomId}/questions`).push(question).key;
  }, [roomId, user]);

  const getQuestionActions = useCallback((question) => (
    <QuestionsActions roomId={roomId} question={question} />
  ), [roomId]);

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={imgLogo} alt="Letmeask"/>
          <div className="actions">
            {isAdmin && (
              <Button isOutlined onClick={handleGoToAdminView}>Admin view</Button>
            )}
            {user && (<Button isOutlined onClick={handleSingout}>Sair</Button>)}
            <Button isOutlined onClick={handleChangeRoom}>Trocar de sala</Button>
          </div>
        </div>
      </header>
      <main>
        <div className='room-title-header'>
          <div className="room-title">
            <h1>Sala {title}</h1>
          </div>
          <RoomCode code={roomId}/>
        </div>

        <form onSubmit={handleNewQuestion}>
          <textarea 
            ref={newQuestionRef}
            placeholder="O que você deseja perguntar?" 
          />
          <div className="form-footer">
            { user ? (
              <div className="user-info">
                <UserImage
                  imageSrc={user.avatar}
                  userName={user.name}
                />
                <span>{user.name}</span>
              </div>
            ) : (
              <span>Para enviar uma pergunta faça seu login, <button onClick={handleLogin}>faça seu login</button>.</span>
            )}
            <Button type="submit" disabled={!user}>Enviar pergunta</Button>
          </div>
        </form>
        <QuestionList
          roomId={roomId}
          questionActions={getQuestionActions} />
      </main>
    </div>
  )
}
