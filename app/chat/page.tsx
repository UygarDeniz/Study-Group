"use client";
import { useEffect, useState, useRef } from "react";
import socket from "../_utils/socket";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { ImSpinner2 } from "react-icons/im";
import { useQueryClient } from "@tanstack/react-query";
import useSocket from "../hooks/useSocket";
import ConversationList from "../(components)/ConversationList";
import MessageList from "../(components)/MessageList";
import MessageForm from "../(components)/MessageForm";
type Message = {
  id: number;
  createdAt: Date;
  content: string;
  senderId: number;
  conversationId: number;
};

type Conversation = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  users: User[];
  Message: Message[];
};

type User = {
  id: number;
  email: string;
  name: string;
  createdAt: Date;
  password: string;
  updatedAt: Date;
  bio: string;
  avatar: string;
};

const fetchConversations = async () => {
  const response = await fetch("/api/conversations");
  if (!response.ok) {
    throw new Error("Failed to fetch conversations");
  }
  return response.json();
};

const fetchCurrentUser = async () => {
  const response = await fetch("/api/users");
  if (!response.ok) {
    throw new Error("Failed to fetch user");
  }
  const data = await response.json();
  return data.user;
};
const createNewMessage = async ({
  message,
  selectedConversationId,
  recipientId,
}) => {
  const res = await fetch(`/api/conversations/${selectedConversationId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message, recipientId }),
  });
  return res.json();
};

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [selectedConversation, setSelectedConversation] =
    useState<Conversation>(null);
  const [chatInput, setChatInput] = useState("");
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const to = searchParams.get("to");
  const createConversationMutation = useMutation({
    mutationFn: async (to: number) => {
      const res = await fetch(`/api/conversations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ to }),
      });
      return res.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
    },
  });

  const {
    data: conversations,
    isPending: isPendingConversation,
    isError,
    refetch,
  } = useQuery<Conversation[]>({
    queryKey: ["conversations"],
    queryFn: fetchConversations,
  });
  const { data: currentUser, isPending: isPendingCurrentUser } = useQuery<User>(
    {
      queryKey: ["currentUser"],
      queryFn: fetchCurrentUser,
    }
  );

  const createMessageMutation = useMutation({
    mutationFn: createNewMessage,
  });

  useSocket(currentUser, selectedConversation, setMessages);

  // creates new conversation
  useEffect(() => {
    if (to && conversations) {
      const conversation = conversations.find((conversation) =>
        conversation.users.some((user) => user.id === Number(to))
      );
      if (conversation) {
        handleSelectConversation(conversation);
      } else {
        createConversationMutation.mutate(Number(to));
      }
    }
  }, [to, conversations]);

  const handleSelectConversation = async (conversation: Conversation) => {
    const { data: updatedConversations } = await refetch();
    const updatedConversation = updatedConversations.find(
      (conv) => conv.id === conversation.id
    );
    setMessages([]);
    setSelectedConversation(updatedConversation);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    const message = target.message.value;
    if (!message) {
      return;
    }
    if (!selectedConversation) {
      return;
    }
    try {
      const recipient = selectedConversation.users.find(
        (user) => user.id !== currentUser.id
      );

      const newMessage = {
        message,
        conversationId: selectedConversation.id,
        senderId: currentUser.id,
        recipientId: recipient.id,
      };

      socket.emit("message", newMessage);
      if (selectedConversation.id === newMessage.conversationId) {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      }
      setChatInput("");
      createMessageMutation.mutate({
        message: newMessage.message,
        selectedConversationId: newMessage.conversationId,
        recipientId: newMessage.recipientId,
      });
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };
  if (isError) return <div>Failed to load conversations</div>;
  if (isPendingConversation || isPendingCurrentUser) {
    return (
      <div className="h-screen flex justify-center items-center">
        <ImSpinner2 className="animate-spin h-10 w-10 text-blue-500" />
      </div>
    );
  }

  return (
    <div className="bg-[#0c1317] flex h-screen justify-center border border-black text-white ">
      <ConversationList
        conversations={conversations}
        currentUser={currentUser}
        handleSelectConversation={handleSelectConversation}
      />
      <div className="w-3/4 flex flex-col  shadow-lg  overflow-hidden  bg-[#0b141a]">
        {selectedConversation ? (
          <>
            <MessageList
              messages={messages}
              currentUser={currentUser}
              selectedConversation={selectedConversation}
            />
            <MessageForm
              chatInput={chatInput}
              handleSendMessage={handleSendMessage}
              setChatInput={setChatInput}
            />
          </>
        ) : (
          <div className="m-auto text-2xl font-bold">
            Please select a conversation
          </div>
        )}
      </div>
    </div>
  );
}
