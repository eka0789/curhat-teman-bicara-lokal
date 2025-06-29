
import React from 'react';
import { Card } from '@/components/ui/card';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  character?: string;
}

interface Character {
  id: string;
  name: string;
  personality: string;
  avatar: string;
  description: string;
  color: string;
}

interface ChatMessageProps {
  message: Message;
  character: Character | null;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, character }) => {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('id-ID', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  if (message.isUser) {
    return (
      <div className="flex justify-end">
        <div className="max-w-xs lg:max-w-md">
          <Card className="bg-gradient-to-r from-orange-400 to-pink-400 text-white shadow-lg">
            <div className="p-4">
              <p className="text-sm leading-relaxed">{message.text}</p>
              <p className="text-xs opacity-80 mt-2 text-right">
                {formatTime(message.timestamp)}
              </p>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-start">
      <div className="flex gap-3 max-w-xs lg:max-w-md">
        {character && (
          <div className="flex-shrink-0">
            <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${character.color} flex items-center justify-center shadow-md`}>
              <span className="text-lg">{character.avatar}</span>
            </div>
          </div>
        )}
        
        <div className="flex-1">
          <Card className="bg-white shadow-lg border border-gray-100">
            <div className="p-4">
              {character && (
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm font-semibold text-gray-700">
                    {character.name}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded-full text-white bg-gradient-to-r ${character.color}`}>
                    {character.personality}
                  </span>
                </div>
              )}
              <p className="text-sm text-gray-800 leading-relaxed">
                {message.text}
              </p>
              <p className="text-xs text-gray-500 mt-2">
                {formatTime(message.timestamp)}
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
