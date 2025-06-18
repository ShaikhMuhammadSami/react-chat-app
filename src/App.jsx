import { useState, useEffect } from 'react'
import { addDoc, collection, serverTimestamp, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from './firebase.config'; 
import Swal from 'sweetalert2';

function App() {
  const [msg, setMsg] = useState('');
  const [messages, setMessages] = useState([]);
  const [name, setName] = useState('');

  // Fetch messages from Firestore
  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("timestamp"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messages = [];
      querySnapshot.forEach((doc) => {
        messages.push({ id: doc.id, ...doc.data() });
      });
      setMessages(messages);
    });
    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(msg === '' || name === "") {
      Swal.fire("Plese Fill Both Fields");
      return
    };

    try {
      await addDoc(collection(db, "messages"), {
        text: msg,
        timestamp: serverTimestamp(),
        name: name
      });
      setMsg('');
      setName('');
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  }


  return (
    <div className="h-[90vh] md:h-screen flex flex-col">
      {/* Chat Container */}
      <div className='flex-1 overflow-y-auto p-4 bg-gray-100'>
        <div className='max-w-2xl mx-auto'>
          {messages.map((message) => (
            <div key={message.id} className="mb-4 p-3 bg-white rounded-lg shadow">
              <p className="font-semibold">{message.name}</p>
              <p>{message.text}</p>
              <p className="text-xs text-gray-500 mt-1">
                {message.timestamp?.toDate().toLocaleTimeString()}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Input Area */}
      <div className='p-4 bg-white border-t'>
        <form onSubmit={handleSubmit} className="w-[95%] md:w-[80%] mx-auto flex flex-col gap-2.5 md:flex-row">
          <input 
            className='lg:w-[200px] p-3 rounded-xl border-2 outline-none mr-2'
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder='Enter Your Name'
          />
          <div className='flex w-full'>
            <input 
              className='w-full p-3 rounded-l-xl border-2 outline-none'
              type="text"
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              placeholder='Type your message here'
            />
            <button 
              type="submit"
              className='bg-green-800 text-white px-5 rounded-r-xl font-bold text-xl cursor-pointer active:scale-90'
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default App;