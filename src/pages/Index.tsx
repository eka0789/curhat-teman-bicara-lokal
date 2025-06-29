
import React, { useState, useRef, useEffect } from 'react';
import { Send, Volume2, VolumeX, Settings, Heart, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import CharacterSelector from '@/components/CharacterSelector';
import VoiceSettings from '@/components/VoiceSettings';
import ChatMessage from '@/components/ChatMessage';
import TypingIndicator from '@/components/TypingIndicator';
import { useToast } from '@/hooks/use-toast';

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

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState('jawa');
  const [showCharacterSelector, setShowCharacterSelector] = useState(true);
  const [showVoiceSettings, setShowVoiceSettings] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateAIResponse = (userMessage: string, character: Character): string => {
    const responses = {
      bijak: [
        "Hidup ini seperti air yang mengalir, kadang tenang kadang bergelombang. Yang penting kita tetap mengalir dan tidak terjebak di satu tempat.",
        "Setiap masalah pasti ada hikmahnya. Mungkin ini saatnya untuk merenung dan melihat dari sudut pandang yang berbeda.",
        "Kesabaran adalah kunci dalam menghadapi setiap cobaan. Ingat, setelah kesulitan pasti ada kemudahan.",
        "Jangan terlalu keras pada diri sendiri. Kamu sudah melakukan yang terbaik dengan kemampuan yang ada saat ini."
      ],
      lucu: [
        "Wah, kayaknya kamu perlu ngopi dulu nih! ☕ Siapa tau masalahnya ilang setelah ngopi hehe",
        "Eh, jangan stress gitu dong! Nanti kerutannya nambah lagi 😄 Santai aja, hidup tuh kayak komedi, kadang ngakak kadang sedih",
        "Ayo dong jangan manyun! Coba senyum dulu, siapa tau masalahnya kabur karena takut sama senyummu 😊",
        "Masalah tuh kayak hujan, pasti ada berhentinya. Sambil nunggu berhenti, mending kita dance in the rain aja! 💃"
      ],
      galak: [
        "Eh, udah! Jangan ngeluh mulu! Hidup tuh emang susah, tapi kalo cuma ngeluh doang mana bisa maju?",
        "Bangun dong! Masa iya mau nyerah sama masalah segitu doang? Kamu lebih kuat dari yang kamu kira!",
        "Stop! Jangan pikir yang aneh-aneh. Fokus ke solusi, bukan ke masalahnya terus!",
        "Ayolah, jangan lemah gitu! Setiap orang punya masalah, yang beda cuma cara ngehadapinnya aja!"
      ],
      sabar: [
        "Aku paham kok perasaanmu sekarang. Memang tidak mudah menghadapi situasi seperti ini.",
        "Pelan-pelan saja ya, tidak apa-apa kalau butuh waktu. Aku akan selalu di sini mendengarkan.",
        "Kamu tidak sendiri dalam menghadapi ini. Ceritakan saja semua yang kamu rasakan.",
        "Ambil napas dalam-dalam dulu. Semuanya akan baik-baik saja, percaya deh sama aku."
      ],
      motivator: [
        "SEMANGAT! Kamu pasti bisa melewati ini! Ingat, setiap orang sukses pasti pernah gagal!",
        "YES! This is your moment to shine! Jangan menyerah sekarang, victory is just around the corner!",
        "Believe in yourself! Kamu punya kekuatan yang luar biasa di dalam diri kamu!",
        "FIGHT! Setiap hari adalah kesempatan baru untuk menjadi versi terbaik dari diri kamu!"
      ]
    };

    const characterResponses = responses[selectedCharacter?.id as keyof typeof responses] || responses.bijak;
    return characterResponses[Math.floor(Math.random() * characterResponses.length)];
  };

  const speakText = (text: string) => {
    if (!isVoiceEnabled) return;
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'id-ID';
    utterance.rate = 0.8;
    utterance.pitch = selectedVoice === 'jawa' ? 0.9 : selectedVoice === 'sunda' ? 1.1 : 1.0;
    
    speechSynthesis.speak(utterance);
  };

  const sendMessage = async () => {
    if (!inputText.trim() || !selectedCharacter) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputText, selectedCharacter);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        isUser: false,
        timestamp: new Date(),
        character: selectedCharacter.id
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
      speakText(aiResponse);
    }, 1500 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  if (showCharacterSelector) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-100 via-pink-50 to-purple-100">
        <CharacterSelector
          onSelectCharacter={(character) => {
            setSelectedCharacter(character);
            setShowCharacterSelector(false);
            toast({
              title: "Karakter Dipilih!",
              description: `Kamu sekarang ngobrol sama ${character.name} - ${character.personality}`,
            });
          }}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-pink-50 to-purple-100">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-white/20 p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-400 to-pink-400 flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">CurhatAI</h1>
              {selectedCharacter && (
                <p className="text-sm text-gray-600">
                  Ngobrol sama {selectedCharacter.name} - {selectedCharacter.personality}
                </p>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsVoiceEnabled(!isVoiceEnabled)}
              className={isVoiceEnabled ? 'text-green-600' : 'text-gray-500'}
            >
              {isVoiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowVoiceSettings(true)}
            >
              <Settings className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowCharacterSelector(true)}
            >
              Ganti Karakter
            </Button>
          </div>
        </div>
      </div>

      {/* Chat Container */}
      <div className="max-w-4xl mx-auto p-4">
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
          {/* Messages */}
          <div className="h-[500px] overflow-y-auto p-6 space-y-4">
            {messages.length === 0 ? (
              <div className="text-center py-12">
                <MessageCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">
                  Halo! Aku siap mendengarkan curhatanmu 💛
                </h3>
                <p className="text-gray-500">
                  Ceritakan apa yang sedang kamu rasakan atau pikirkan...
                </p>
              </div>
            ) : (
              messages.map((message) => (
                <ChatMessage
                  key={message.id}
                  message={message}
                  character={selectedCharacter}
                />
              ))
            )}
            
            {isTyping && <TypingIndicator character={selectedCharacter} />}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-6 border-t border-white/20 bg-white/40">
            <div className="flex gap-3">
              <Input
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ketik curhatanmu di sini..."
                className="flex-1 bg-white/80 border-white/40 focus:bg-white transition-colors"
              />
              <Button
                onClick={sendMessage}
                disabled={!inputText.trim() || isTyping}
                className="bg-gradient-to-r from-orange-400 to-pink-400 hover:from-orange-500 hover:to-pink-500 text-white px-6"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Voice Settings Modal */}
      {showVoiceSettings && (
        <VoiceSettings
          selectedVoice={selectedVoice}
          onVoiceChange={setSelectedVoice}
          onClose={() => setShowVoiceSettings(false)}
        />
      )}
    </div>
  );
};

export default Index;
