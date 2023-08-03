import React, { useEffect, useState } from 'react';
import socketIOClient from 'socket.io-client';

const App = () => {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    const socket = socketIOClient('http://localhost:3007'); // Replace with your backend URL

    // socket.on('notices', (updatedNotices) => {
    //   setNotices(updatedNotices);
    // });

    socket.on('notices-updated', () => {
      // call the api get all notice
      fetch('http://localhost:3007/getAllNotice', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((res) => {
        console.log("res--------------- ", res)
      }).catch((err) => {
        console.log("err---------------- ", err)
      })
    });

    socket.on('employeePost-updated', () => {
      // call the api get all notice
      fetch('http://localhost:3007/getAllPost', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((res) => {
        console.log("res--------------- ", res)
      }).catch((err) => {
        console.log("err---------------- ", err)
      })
    });

    

    socket.emit("notice", "Hello from client");

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      {notices.map((notice) => (
        <div key={notice.id}>
          <p>{notice.title}</p>
          <p>{notice.content}</p>
        </div>
      ))}
    </div>
  );
};

export default App;
