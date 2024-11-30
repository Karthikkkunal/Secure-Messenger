import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { useMessageStore } from '../store/messageStore';
import { encryptMessage } from '../utils/crypto';

interface MessageInputProps {
  recipientPublicKey: CryptoKey | null;
}

export function MessageInput({ recipientPublicKey }: MessageInputProps) {
  const [message, setMessage] = useState('');
  const addMessage = useMessageStore((state) => state.addMessage);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const encryptedContent = recipientPublicKey
      ? await encryptMessage(message, recipientPublicKey)
      : message;

    addMessage({
      id: crypto.randomUUID(),
      sender: 'You',
      content: encryptedContent,
      timestamp: Date.now(),
      encrypted: !!recipientPublicKey,
    });

    setMessage('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border-t border-gray-200 p-4 bg-white"
    >
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 rounded-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600 transition-colors"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </form>
  );
}