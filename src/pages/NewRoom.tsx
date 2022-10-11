import { useState } from "react"
import { FormEvent } from "react"
import { Link, useHistory } from "react-router-dom"

import illustrationImg from "../assets/images/illustration.svg"
import logoImg from "../assets/images/logo.svg"

import Button from "../components/Button"
import { useAuth } from "../hooks/UseAuth"
import { database } from "../services/firebase"

import "../styles/auth.scss"

export function NewRoom() {
  const { user } = useAuth();
  const history = useHistory();
  const [roomName, setRoomName] = useState('');

  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault();

    if (roomName.trim() === "") {
      console.log("Campo obrigatorio vazio");
      return;
    }

    let roomsRef = database.ref("rooms");

    let createdRoom = await roomsRef.push({
      info: {
        authorId: user?.id,
        title: roomName
      }
    });

    history.push(`/admin/rooms/${createdRoom.key}`);
  }

  return (
    <div id="page-auth">
      <aside>
        <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas"/>
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo real</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="Letmeask" />
          <h2>Criar uma nova sala</h2>
          <form onSubmit={handleCreateRoom}>
            <input
              type="text"
              placeholder="Digite o nome da sala"
              onChange={event => setRoomName(event.target.value)}
              value={roomName}
            />
            <Button type="submit">
              Entrar na sala
            </Button>
          </form>
          <p>
            Quer entrar em uma sala existente? <Link to="/">Clique aqui</Link>
          </p>
        </div>
      </main>
    </div>
  )
}