import io from 'socket.io-client';
import './App.css';
import { useEffect } from 'react';

const socket = io.connect('http://localhost:3001');

function App() {
  const handleMessage = (e) => {
    e.preventDefault();
    socket.emit('send_message', { message: 'hello' });
  };

  useEffect(() => {
    socket.on('receive_message', (data) => {
      alert(data.message);
    });
  }, []);
  return (
    <div className='min-h-screen flex justify-center items-center'>
      <form>
        <label htmlFor='message'></label>
        <input
          className='px-2 py-2 outline outline-slate-50 border border-neutral-200 rounded-full mb-3'
          type='text'
          id='message'
          name='message'
          placeholder='Input message in here'
        />
        <br />
        <button
          type='submit'
          className='px-2 py-1 bg-gray-500 text-white rounded-full'
          onClick={handleMessage}
        >
          Send Message
        </button>
      </form>
    </div>
  );
}

export default App;
