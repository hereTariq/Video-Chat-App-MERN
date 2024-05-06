import { useRoomContext } from "../context/roomContext";


function Home() {
    const { socket } = useRoomContext();

    const createRoom = () => {
        socket.emit('create-room')
    }
    return (
        <div className="flex justify-center items-center min-h-screen ">
            <button type="button" onClick={createRoom} className="py-2.5 px-6 me-2 mb-2 text-lg font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 ">Join Room</button>
        </div>
    )
}

export default Home