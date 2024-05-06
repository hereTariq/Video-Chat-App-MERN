import { useEffect, useRef } from 'react'

function Video({ stream }: { stream: MediaStream }) {
    const videoRef = useRef<HTMLVideoElement>(null)

    useEffect(() => {
        if (videoRef.current) videoRef.current.srcObject = stream;
    }, [stream])
    return (
        <video ref={videoRef} autoPlay muted={true}></video>
    )
}

export default Video