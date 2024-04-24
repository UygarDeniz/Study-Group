import { useEffect } from "react";
import socket from "../_utils/socket";

const useSocket = (currentUser, selectedConversation, setMessages) => {
  useEffect(() => {
    if (!currentUser) {
      return;
    }
    socket.auth = currentUser;
    socket.connect();

    socket.on("connect_error", (err) => {
      console.error(err.message);
    });

    socket.on("disconnect", () => {
      console.log("disconnected");
    });

    return () => {
      socket.disconnect();
    };
  }, [currentUser]);

  useEffect(() => {
    if (!currentUser || !selectedConversation) {
      return;
    }

    const messageHandler = (message) => {
      if (selectedConversation.id === message.conversationId) {
        setMessages((prevMessages) => [...prevMessages, message]);
      }
    };

    socket.on("message", messageHandler);

    return () => {
      socket.off("message", messageHandler);
    };
  }, [currentUser, selectedConversation]);
};

export default useSocket;