import { useParams } from "react-router-dom"
import { useRoomContext } from "../context/roomContext"
import { useEffect } from "react";
import Video from "./Video";

function Room() {
    const { id } = useParams()
    const { socket, me, stream } = useRoomContext();

    useEffect(() => {
        if (!socket || !id) return;

        if (me) socket.emit('join-room', { roomId: id, peerId: me._id })


        return () => {
            socket.off('join-room')
        }
    }, [socket, id, me])
    return (
        <Video stream={stream} />
    )
}

export default Room