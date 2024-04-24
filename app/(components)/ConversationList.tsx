type Conversation = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  users: User[];
  Message: Message[];
};

type Message = {
  id: number;
  createdAt: Date;
  content: string;
  senderId: number;
  conversationId: number;
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
type Props = {
  conversations: Conversation[];
  currentUser: User;
  handleSelectConversation: (conversation: Conversation) => void;
};

const ConversationList: React.FC<Props> = ({
  conversations,
  currentUser,
  handleSelectConversation,
}) => (
  <div className="w-1/4 overflow-auto p-4  bg-[#111b21] border-r-2 border-[#202c33]">
    <h1 className="text-2xl font-bold mb-4">Chats</h1>
    {conversations.map((conversation, index) => (
      <div
        key={index}
        className="mb-4 p-2 rounded bg-gray-700 shadow cursor-pointer hover:bg-gray-600 transition-colors duration-200"
        onClick={() => handleSelectConversation(conversation)}
      >
        {conversation.users
          .filter((user) => user.id !== currentUser.id)
          .map((user) => (
            <div key={user.id} className="flex items-center">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-9 h-9 rounded-full object-cover"
              />
              <span className="ml-2 text-lg">{user.name}</span>
            </div>
          ))}
      </div>
    ))}
  </div>
);

export default ConversationList;
