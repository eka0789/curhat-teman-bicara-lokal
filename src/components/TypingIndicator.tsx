
import React from 'react';
import { Card } from '@/components/ui/card';

interface Character {
  id: string;
  name: string;
  personality: string;
  avatar: string;
  description: string;
  color: string;
}

interface TypingIndicatorProps {
  character: Character | null;
}

const TypingIndicator: React.FC<TypingIndicatorProps> = ({ character }) => {
  return (
    <div className="flex justify-start">
      <div className="flex gap-3 max-w-xs lg:max-w-md">
        {character && (
          <div className="flex-shrink-0">
            <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${character.color} flex items-center justify-center shadow-md animate-pulse`}>
              <span className="text-lg">{character.avatar}</span>
            </div>
          </div>
        )}
        
        <div className="flex-1">
          <Card className="bg-white shadow-lg border border-gray-100">
            <div className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm font-semibold text-gray-700">
                  {character?.name || 'AI'}
                </span>
                <span className="text-xs text-gray-500">
                  sedang mengetik...
                </span>
              </div>
              
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;
