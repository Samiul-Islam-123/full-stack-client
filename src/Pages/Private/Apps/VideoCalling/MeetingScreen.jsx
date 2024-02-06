// src/App.js
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import Peer from 'peerjs';
import { useParams } from 'react-router-dom';

const socket = io('http://localhost:5500');

function MeetingScreen() {
  const {id} = useParams();
  const [myPeer, setMyPeer] = useState(null);
  const [myStream, setMyStream] = useState(null);
  const [peers, setPeers] = useState({});
  const roomID = id;

  useEffect(() => {
    const initializePeer = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setMyStream(stream);

      const peer = new Peer(undefined, {
        host: '/',
        port: '5500',
        path: '/peerjs',
      });

      peer.on('open', (id) => {
        socket.emit('join-room', roomID, id);
      });

      peer.on('call', (call) => {
        call.answer(stream);

        call.on('stream', (userStream) => {
          setPeers((prevPeers) => ({ ...prevPeers, [call.peer]: userStream }));
        });
      });

      socket.on('user-connected', (userId) => {
        connectToNewUser(userId, stream);
      });
    };

    initializePeer();

    return () => {
      myPeer && myPeer.disconnect();
      myStream && myStream.getTracks().forEach((track) => track.stop());
    };
  }, [myPeer]);

  const connectToNewUser = (userId, stream) => {
    const call = myPeer.call(userId, stream);

    call.on('stream', (userStream) => {
      setPeers((prevPeers) => ({ ...prevPeers, [userId]: userStream }));
    });

    call.on('close', () => {
      const updatedPeers = { ...peers };
      delete updatedPeers[userId];
      setPeers(updatedPeers);
    });
  };

  return (
    <div className="App">
      <div>
        <video muted ref={(ref) => (ref ? (ref.srcObject = myStream) : null)} autoPlay playsInline />
      </div>
      <div>
        {Object.keys(peers).map((peerId) => (
          <video key={peerId} ref={(ref) => (ref ? (ref.srcObject = peers[peerId]) : null)} autoPlay playsInline />
        ))}
      </div>
    </div>
  );
}

export default MeetingScreen;
