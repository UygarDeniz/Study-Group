type Props = {
  chatInput: string;
  handleSendMessage: (e: React.FormEvent) => void;
  setChatInput: (value: string) => void;
};

const MessageForm: React.FC<Props> = ({
  chatInput,
  handleSendMessage,
  setChatInput,
}) => (
  <form
    onSubmit={handleSendMessage}
    className="flex-shrink-0 p-4 flex border-t bg-[#202c33]"
  >
    <input
      name="message"
      id="message"
      className="flex-grow rounded-l-lg p-2 ml-14  bg-[#363d41] outline-none text-white "
      placeholder="Write your message..."
      value={chatInput}
      autoComplete="off"
      onChange={(e) => setChatInput(e.target.value)}
    />
    <button
      type="submit"
      className="px-8 rounded-r-lg bg-blue-500 text-white font-bold p-2 uppercase border-blue-500 border-t border-b border-r"
    >
      Send
    </button>
  </form>
);

export default MessageForm;
