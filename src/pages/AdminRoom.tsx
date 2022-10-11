import { Redirect, useParams } from "react-router-dom";

import imgLogo from "../assets/images/logo.svg"

import Button from "../components/Button"
import RoomCode from "../components/RoomCode";
import { useRoom } from '../hooks/useRoom';
import { database, serverTimestamp } from '../services/firebase';

import "../styles/room.scss";
import QuestionList from '../components/QuestionList/QuestionList'
import { useAuth } from '../hooks/UseAuth'
import { useCallback } from "react";
import AdminQuestionActions from "../components/AdminQuestionAction";

type RoomParams = {
  id: string;
}

export function AdminRoom() {
  const { user, singOut } = useAuth();
  
  const params = useParams<RoomParams>();
  const roomId = params.id;

  const {title, history} = useRoom(roomId);

  const handleEndRoom = useCallback(async () => {
    await database.ref(`rooms/${roomId}/info/closedAt`).set(serverTimestamp);
    history.push('/');
  }, [roomId, history]);

  const handleGoToUserView = useCallback(() => history.push(`/rooms/${roomId}`), [roomId, history]);
  
  const handleSingout = useCallback(async () => {
    await singOut();
    history.push('/');
  }, [history, singOut]);

  const handleChangeRoom = useCallback(() => {
    history.push('/');
  }, [history])

  const getQuestionActions = useCallback((question) => {
    return <AdminQuestionActions roomId={roomId} question={question} />;
  }, [roomId]);
  
  if (!user) {
    return <Redirect to={`/rooms/${roomId}`} />;
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={imgLogo} alt="Letmeask"/>
          <div className="actions">
            <Button onClick={handleEndRoom} isOutlined>Encerrar sala</Button>
            <Button isOutlined onClick={handleGoToUserView}>User view</Button>
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
        <QuestionList
          roomId={roomId}
          questionActions={getQuestionActions} 
        />
      </main>
    </div>
  )
}