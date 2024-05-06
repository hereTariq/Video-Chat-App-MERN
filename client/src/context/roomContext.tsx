import { FC, ReactNode, createContext, useContext, useEffect, useState } from "react";
import { Socket, io } from 'socket.io-client'
import { useNavigate } from "react-router-dom";
import Peer from "peerjs";
import { v4 as uuidV4 } from "uuid";

const WS = 'http://localhost:6007'


export const RoomContext = createContext<null | any>(null);


export const RoomProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [me, setMe] = useState<Peer>()
    const [stream, setStream] = useState<MediaStream>();
    const navigate = useNavigate()

    useEffect(() => {
        const newSocket = io(WS);
        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        }
    }, [])

    useEffect(() => {
        if (!socket) return;
        const meId = uuidV4();
        const peer = new Peer(meId)
        setMe(peer);



        socket.on('room-created', ({ roomId }) => {
            console.log("user room created", { roomId })
            navigate(`/room/${roomId}`)
            try {
                navigator.mediaDevices.getUserMedia({ audio: true, video: true }).then(stream => {
                    setStream(stream);
                })
            } catch (error) {
                console.error(error)
            }
        })

        socket.on('users', ({ roomId, participants }) => {
            console.log(roomId, participants)
        })
    }, [socket])

    return (
        <RoomContext.Provider value={{ socket, me, stream }}>
            {children}
        </RoomContext.Provider>
    );
}


export const useRoomContext = () => useContext(RoomContext)