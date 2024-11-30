import React from 'react';
import { useMessageStore } from '../store/messageStore';
import { MessageBubble } from './MessageBubble';

export function MessageList() {
  const messages = useMessageStore((state) => state.messages);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message) => (
        <MessageBubble key={message.id} message={message} />
      ))}
    </div>
  );
}