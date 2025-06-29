
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Smile, Zap, Clock, Target } from 'lucide-react';

interface Character {
  id: string;
  name: string;
  personality: string;
  avatar: string;
  description: string;
  color: string;
  icon: React.ReactNode;
}

interface CharacterSelectorProps {
  onSelectCharacter: (character: Character) => void;
}

const CharacterSelector: React.FC<CharacterSelectorProps> = ({ onSelectCharacter }) => {
  const characters: Character[] = [
    {
      id: 'bijak',
      name: 'Mbak Sari',
      personality: 'Bijaksana',
      avatar: '👩‍🏫',
      description: 'Penuh wisdom dan selalu punya nasihat yang tepat. Cocok untuk yang butuh perspektif baru.',
      color: 'from-blue-400 to-indigo-500',
      icon: <Heart className="w-5 h-5" />
    },
    {
      id: 'lucu',
      name: 'Bang Joko',
      personality: 'Humoris',
      avatar: '😄',
      description: 'Selalu bisa bikin suasana jadi ceria. Cocok untuk yang butuh hiburan dan tawa.',
      color: 'from-yellow-400 to-orange-500',
      icon: <Smile className="w-5 h-5" />
    },
    {
      id: 'galak',
      name: 'Pak Budi',
      personality: 'Tegas',
      avatar: '😤',
      description: 'Straight to the point dan tidak berbelit-belit. Cocok untuk kick motivation yang keras.',
      color: 'from-red-400 to-pink-500',
      icon: <Zap className="w-5 h-5" />
    },
    {
      id: 'sabar',
      name: 'Bu Indah',
      personality: 'Penyabar',
      avatar: '🤗',
      description: 'Pendengar yang baik dan penuh empati. Cocok untuk yang butuh didengarkan dengan sabar.',
      color: 'from-green-400 to-teal-500',
      icon: <Clock className="w-5 h-5" />
    },
    {
      id: 'motivator',
      name: 'Coach Rizki',
      personality: 'Motivator',
      avatar: '💪',
      description: 'Penuh semangat dan selalu mendorong untuk maju. Cocok untuk yang butuh boost energy.',
      color: 'from-purple-400 to-pink-500',
      icon: <Target className="w-5 h-5" />
    }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-6xl w-full">
        <div className="text-center mb-12">
          <div className="w-20 h-20 rounded-full bg-gradient-to-r from-orange-400 to-pink-400 flex items-center justify-center mx-auto mb-6 shadow-xl">
            <Heart className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Selamat Datang di CurhatAI! 💛
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Pilih teman curhat yang sesuai dengan mood kamu hari ini
          </p>
          <p className="text-gray-500">
            Setiap karakter punya kepribadian unik untuk memberikan respon yang berbeda
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {characters.map((character) => (
            <Card
              key={character.id}
              className="hover:scale-105 transition-all duration-300 cursor-pointer group border-2 border-transparent hover:border-white/50 bg-white/70 backdrop-blur-sm shadow-xl hover:shadow-2xl"
              onClick={() => onSelectCharacter(character)}
            >
              <CardContent className="p-6 text-center">
                <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${character.color} flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-shadow`}>
                  {character.icon}
                </div>
                
                <div className="text-4xl mb-4">{character.avatar}</div>
                
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {character.name}
                </h3>
                
                <div className={`inline-block px-3 py-1 rounded-full text-white text-sm font-medium mb-4 bg-gradient-to-r ${character.color}`}>
                  {character.personality}
                </div>
                
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  {character.description}
                </p>
                
                <Button
                  className={`w-full bg-gradient-to-r ${character.color} hover:opacity-90 text-white font-medium py-2 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg`}
                >
                  Pilih {character.name}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-500 text-sm">
            💡 Tip: Kamu bisa ganti karakter kapan saja selama ngobrol!
          </p>
        </div>
      </div>
    </div>
  );
};

export default CharacterSelector;
