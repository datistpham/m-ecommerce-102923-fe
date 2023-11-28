import React, { createContext, useEffect, useState } from 'react';
import io from 'socket.io-client';
import apiConfig from './api/apiConfig';

export const SocketContext= createContext()
const SocketContainer = ({ children }) => {
    const [socket, setSocket] = useState()
    useEffect(() => {
        // Kết nối tới server Socket.io
        const socket = io(apiConfig.baseUrl, { transports: ["websocket"] }); // Thay đổi URL thành địa chỉ server của bạn
        // Lắng nghe sự kiện từ server
        socket.on('message', (data) => {
            console.log('Received message from server:', data);
        });

        // Gửi một message lên server khi component được mount
        socket.emit('message', 'Hello from client!');
        setSocket(socket)

        // Cleanup khi component unmount
        return () => {
            setSocket()
            socket.disconnect();
        };
    }, []);

    return (
        <SocketContext.Provider value={{socket}}>
            {children}
        </SocketContext.Provider>
    );
};

export default SocketContainer;
