import React, { useEffect, useState } from "react";
import axios from "axios";

const ChatBox = () => {
  const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

useEffect(()=>{console.log('seperate effect',messages)}, [messages])

  // Fetch all users to chat with
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get(`http://54.175.255.7:5000/api/message/conversations?userId=${loggedUser.userId}`)
      const sender = response.data.receivedFrom;
      // console.log('this is sender,',sender)
      const receiver = response.data.sentTo
      // console.log('this is the receiver,', receiver)
      const conversations = [...new Set([...sender, ...receiver])].join(',')
      // console.log(conversations)

      const conversationsDetails = await axios.get(`http://54.175.255.7:5000/api/message/conversations/details?userId=${conversations}`)
      // console.log('this is converations user details: ',conversationsDetails.data.users)
      if(conversationsDetails?.data.users.length>0){  
        setUsers(conversationsDetails.data.users)
      }
    };
    fetchUsers();
  }, [loggedUser.userId]);

  // Fetch messages with selected user
  useEffect(() => {
    const fetchMessages = async () => {
      if (!selectedUser) return;
      try {
        const res = await axios.get("http://54.175.255.7:5000/api/message/read", {
          params: {
            senderId: loggedUser.userId,
            receiverId: selectedUser._id
          }
        });
        setMessages(res.data.messages);
      } catch (err) {
        console.error("Error fetching messages:", err);
      }
    };
    fetchMessages();
  }, [selectedUser, loggedUser.userId]);

  const handleSend = async () => {
    if (!newMessage.trim() || !selectedUser) return;

    try {
      await axios.post("http://54.175.255.7:5000/api/message/send", {
        senderId: loggedUser.userId,
        receiverId: selectedUser._id,
        content: newMessage
      });
      setMessages(prev => [...prev, {
        sender: loggedUser.userId,
        receiver: selectedUser._id,
        content: newMessage,
        timestamp: new Date().toISOString()
      }]);
      setNewMessage("");
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  return (
    <div className="flex h-[600px]">
      {/* Sidebar with users */}
      <div className="w-1/4 bg-gray-100 p-4 overflow-y-auto">
        <h2 className="text-lg font-bold mb-4">Users</h2>
      {users.length<=0 && <p>No users, send message to someone from Home page</p>}
        {users.map(user => (
          <div
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`p-2 cursor-pointer rounded hover:bg-blue-200 ${selectedUser?._Id === user._Id ? "bg-blue-300" : ""}`}
          >
            {user.name}
          </div>
        ))}
      </div>

      {/* Message panel */}
      <div className="flex-1 flex flex-col">
        <div className="flex-1 p-4 overflow-y-auto bg-white">
          {selectedUser ? (
            <>
              <h2 className="text-xl font-semibold mb-4">Chat with {selectedUser.name}</h2>
              {messages.length === 0 && <p>No messages yet.</p>}
              <div className="space-y-2">
                {messages.map((msg,idx)=>{
                  const date1 = new Date(msg.timestamp)
                  return(
                    <div 
                    key={idx}
                    className={`max-w-md flex justify-between px-4 py-2 rounded-lg ${
                      msg.sender === loggedUser.userId
                        ? "bg-blue-500 text-white self-end ml-auto"
                        : "bg-gray-200 text-black"
                    }`}>
                      <div>{msg.content}</div>
                      <div>{date1.toLocaleTimeString()}</div>
                    </div>
                  )
                })}
              </div>
            </>
          ) : (
            <p className="text-center text-gray-500 mt-10">Select a user to start chatting</p>
          )}
        </div>

        {/* Message input */}
        {selectedUser && (
          <div className="p-4 border-t flex gap-2">
            <input
              className="flex-1 border rounded px-3 py-2"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
            />
            <button
              onClick={handleSend}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Send
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatBox;
