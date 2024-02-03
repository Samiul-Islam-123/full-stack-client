import React, { useEffect, useRef, useState } from 'react';
import socket from '../../../../Utils/Socket';
import SimplePeer from 'simple-peer';

const MeetingScreen = () => {
  const [peers, setPeers] = useState([]);
  const videoRef = useRef(null);
  const myPeer = useRef();
  const socketRef = useRef();

  // Handle incoming streams from other users
  const handleStream = (peer, stream) => {
    const peerVideo = peers.find((p) => p.id === peer.id).peerVideo;
    if (peerVideo) {
      peerVideo.srcObject = stream;
    }
  };

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;

          // Initialize WebRTC peer connection for the current user
          myPeer.current = new SimplePeer({ initiator: true, trickle: false, stream });

          // Create a socket connection
          socketRef.current = socket;

          // Send the offer to the server
          myPeer.current.on('signal', (data) => {
            socketRef.current.emit('offer', { signal: data });
          });

          // Handle incoming ICE candidates
          myPeer.current.on('ice-candidate', (data) => {
            socketRef.current.emit('ice-candidate', { candidate: data });
          });

          // Receive the answer from the other user
          socketRef.current.on('answer', (data) => {
            myPeer.current.signal(data.signal);
          });

          // Handle incoming streams from other users
          myPeer.current.on('stream', (stream) => {
            handleStream(myPeer.current, stream);
          });
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
      }
    };

    startCamera();

    return () => {
      // Cleanup: Stop the camera and close the peer connection when the component unmounts
      const stream = videoRef.current.srcObject;
      if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
      }
      if (myPeer.current) {
        myPeer.current.destroy();
      }
    };
  }, []);

  useEffect(() => {
    // Handle incoming offers from other users
    socket.on('offer', (data) => {
      console.log(data)
      const peer = new SimplePeer({ initiator: false, trickle: false, stream: videoRef.current.srcObject });

      // Update the peers state correctly
      setPeers((prevPeers) => [...prevPeers, { id: data.callerID, peer }]);

      // Send the answer to the server
      peer.on('signal', (answer) => {
        socket.emit('answer', { signal: answer, callerID: data.callerID });
      });

      // Handle incoming ICE candidates
      peer.on('ice-candidate', (iceCandidate) => {
        socket.emit('ice-candidate', { candidate: iceCandidate, senderID: data.callerID });
      });

      // Connect the peer to the initiator
      peer.signal(data.signal);

      // Handle incoming streams from other users
      peer.on('stream', (stream) => {
        handleStream(peer, stream);
      });
    });

    // Handle incoming ICE candidates from other users
    socket.on('ice-candidate', (data) => {
      const peer = peers.find((p) => p.id === data.senderID);

      if (peer) {
        peer.peer.signal(data.candidate);
      }
    });

    return () => {
      // Clean up event listeners
      socket.off('offer');
      socket.off('ice-candidate');
    };
  }, [peers]);

  return (
    <div>
      <h1>Meeting Screen</h1>
      <video ref={videoRef} autoPlay playsInline muted />

      {/* Render video elements for each peer */}
      <div>
        {peers.map((peer) => (
          <video key={peer.id} autoPlay playsInline ref={(ref) => { peer.peerVideo = ref; }} />
        ))}
      </div>
    </div>
  );
};

export default MeetingScreen;