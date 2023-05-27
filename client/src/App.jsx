import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import './App.css';

const socket = io.connect('http://localhost:3001');

function App() {
  const [message, setMessage] = useState('');
  const [messageReceived, setMessageReceived] = useState('');
  const [chatLog, setChatLog] = useState([]);

  useEffect(() => {
    socket.on('receive_message', (data) => {
      setMessageReceived(data.message);
      setChatLog((prevChatLog) => {
        if (!prevChatLog.includes(data.message)) {
          return [...prevChatLog, data.message];
        }
        return prevChatLog;
      });
    });
    return () => {
      socket.off('receive_message');
    };
  }, []);

  useEffect(() => {
    const room = 'room-1'; // Ganti dengan nama ruangan yang sesuai
    socket.emit('join_room', room);
  }, []);

  const handleMessage = (e) => {
    e.preventDefault();
    const room = 'room-1'; // Ganti dengan nama ruangan yang sesuai
    const data = { message: message, room: room };
    socket.emit('send_message', data);
    setChatLog((prevChatLog) => [...prevChatLog, message]);
    setMessage('');
  };
  return (
    <div className='min-h-screen '>
      <div>
        <div>
          {chatLog.map((message, index) => (
            <div key={index}>{message}</div>
          ))}
        </div>
        <form
          className='flex justify-center items-center min-h-[100px]'
          onSubmit={handleMessage}
        >
          <label htmlFor='message'></label>
          <input
            className='px-2 py-2 outline outline-slate-50 border border-neutral-200 rounded-full mb-3'
            type='text'
            id='message'
            name='message'
            placeholder='Input message in here'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            type='submit'
            className='px-4 py-2 bg-gray-500 text-white rounded-full'
          >
            Send Message
          </button>
        </form>
        <h1>Received message: {messageReceived}</h1>{' '}
      </div>
    </div>
  );
}

export default App;
