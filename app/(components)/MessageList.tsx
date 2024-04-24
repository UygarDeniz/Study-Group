import { useEffect, useRef } from "react";

function MessageList({ messages, currentUser, selectedConversation }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ block: "end" });
    }
  }, [messages]);

  return (
    <div className="overflow-auto p-4 border border-black">
      {selectedConversation?.Message?.map((message, index) => (
        <div
          key={index}
          className={`mb-4 py-2 px-6  rounded shadow-2xl w-fit max-w-5xl  ${
            message.senderId === currentUser.id
              ? "bg-blue-600 ml-auto text-right"
              : "bg-[#202c33]"
          }`}
        >
          <div className="font-bold">
            {message.senderId === currentUser.id
              ? "You"
              : selectedConversation?.users.find(
                  (user) => user.id !== currentUser.id
                )?.name}
          </div>
          <p className="break-words">{message.content}</p>
        </div>
      ))}
      {messages.map((message, index) => (
        <div
          key={index}
          className={`mb-4 py-2 px-6  rounded shadow-2xl w-fit max-w-5xl ${
            message.senderId === currentUser.id
              ? "bg-blue-600 ml-auto text-right"
              : "bg-[#202c33]"
          }`}
        >
          <div className="font-bold">
            {message.senderId === currentUser.id
              ? "You"
              : selectedConversation?.users.find(
                  (user) => user.id !== currentUser.id
                )?.name}
          </div>
          <div className="break-words">{message.message}</div>
        </div>
      ))}
      <div ref={scrollRef} />
    </div>
  );
}

export default MessageList;
