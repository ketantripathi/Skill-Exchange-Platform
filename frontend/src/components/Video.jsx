import React, { useRef, useEffect } from 'react';
import io from 'socket.io-client';

const VideoCall = ({ roomId }) => {
    const localVideoRef = useRef(null);
    const remoteVideoRef = useRef(null);
    const peerConnectionRef = useRef(null);
    const socketRef = useRef(null);

    const ICE_SERVERS = {
        iceServers: [
            { urls: 'stun:stun.l.google.com:19302' },
            { urls: 'stun:stun1.l.google.com:19302' },
        ],
    };

    useEffect(() => {
        socketRef.current = io.connect('/');
        peerConnectionRef.current = new RTCPeerConnection(ICE_SERVERS);

        socketRef.current.emit('join-room', roomId);

        socketRef.current.on('user-connected', handleUserConnected);
        socketRef.current.on('offer', handleReceiveOffer);
        socketRef.current.on('answer', handleReceiveAnswer);
        socketRef.current.on('ice-candidate', handleNewICECandidate);

        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then(stream => {
                localVideoRef.current.srcObject = stream;
                stream.getTracks().forEach(track => peerConnectionRef.current.addTrack(track, stream));
            });

        peerConnectionRef.current.onicecandidate = handleICECandidateEvent;
        peerConnectionRef.current.ontrack = handleTrackEvent;

        return () => {
            socketRef.current.disconnect();
            peerConnectionRef.current.close();
        };
    }, []);

    const handleUserConnected = async () => {
        const offer = await peerConnectionRef.current.createOffer();
        await peerConnectionRef.current.setLocalDescription(offer);
        socketRef.current.emit('offer', { roomId, offer });
    };

    const handleReceiveOffer = async (data) => {
        await peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(data.offer));
        const answer = await peerConnectionRef.current.createAnswer();
        await peerConnectionRef.current.setLocalDescription(answer);
        socketRef.current.emit('answer', { roomId, answer });
    };

    const handleReceiveAnswer = async (data) => {
        await peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(data.answer));
    };

    const handleICECandidateEvent = (event) => {
        if (event.candidate) {
            socketRef.current.emit('ice-candidate', { roomId, candidate: event.candidate });
        }
    };

    const handleNewICECandidate = async (data) => {
        const candidate = new RTCIceCandidate(data.candidate);
        await peerConnectionRef.current.addIceCandidate(candidate);
    };

    const handleTrackEvent = (event) => {
        remoteVideoRef.current.srcObject = event.streams[0];
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
            <div className="flex justify-center items-center w-full max-w-3xl h-2/3 bg-black rounded-lg overflow-hidden relative mb-6">
                <video ref={remoteVideoRef} className="w-full h-full object-cover" autoPlay playsInline />
                <video ref={localVideoRef} className="absolute bottom-4 right-4 w-1/4 h-1/4 border-2 border-white rounded-md" autoPlay playsInline muted />
            </div>
            <div className="text-center">
                <p className="text-lg text-gray-700 font-semibold mb-4">Room ID: {roomId}</p>
                <button 
                    className="px-6 py-2 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 transition"
                    onClick={() => socketRef.current.disconnect()}
                >
                    End Call
                </button>
            </div>
        </div>
    );
};

export default VideoCall;
