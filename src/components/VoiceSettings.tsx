
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X, Volume2 } from 'lucide-react';

interface VoiceSettingsProps {
  selectedVoice: string;
  onVoiceChange: (voice: string) => void;
  onClose: () => void;
}

const VoiceSettings: React.FC<VoiceSettingsProps> = ({
  selectedVoice,
  onVoiceChange,
  onClose
}) => {
  const voices = [
    {
      id: 'jawa',
      name: 'Suara Jawa',
      description: 'Accent khas Jawa Tengah yang halus dan medok',
      flag: '🇮🇩',
      region: 'Jawa Tengah'
    },
    {
      id: 'sunda',
      name: 'Suara Sunda',
      description: 'Accent Sunda yang lembut dan melodius',
      flag: '🏔️',
      region: 'Jawa Barat'
    },
    {
      id: 'betawi',
      name: 'Suara Betawi',
      description: 'Accent Betawi yang khas Jakarta banget',
      flag: '🏙️',
      region: 'Jakarta'
    },
    {
      id: 'batak',
      name: 'Suara Batak',
      description: 'Accent Batak yang tegas dan berkarakter',
      flag: '🌋',
      region: 'Sumatera Utara'
    }
  ];

  const testVoice = (voiceId: string) => {
    const testText = "Halo! Ini contoh suara dari daerah ini. Gimana menurutmu?";
    const utterance = new SpeechSynthesisUtterance(testText);
    utterance.lang = 'id-ID';
    utterance.rate = 0.8;
    utterance.pitch = voiceId === 'jawa' ? 0.9 : voiceId === 'sunda' ? 1.1 : 1.0;
    speechSynthesis.speak(utterance);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl bg-white/90 backdrop-blur-sm shadow-2xl border border-white/20">
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <CardTitle className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <Volume2 className="w-6 h-6" />
            Pengaturan Suara
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </Button>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <p className="text-gray-600 mb-6">
            Pilih suara daerah yang kamu suka untuk text-to-speech
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {voices.map((voice) => (
              <div
                key={voice.id}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                  selectedVoice === voice.id
                    ? 'border-orange-400 bg-orange-50'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
                onClick={() => onVoiceChange(voice.id)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{voice.flag}</span>
                    <div>
                      <h4 className="font-semibold text-gray-800">{voice.name}</h4>
                      <p className="text-sm text-gray-500">{voice.region}</p>
                    </div>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      testVoice(voice.id);
                    }}
                    className="opacity-60 hover:opacity-100"
                  >
                    <Volume2 className="w-4 h-4" />
                  </Button>
                </div>
                
                <p className="text-sm text-gray-600 leading-relaxed">
                  {voice.description}
                </p>
                
                {selectedVoice === voice.id && (
                  <div className="mt-3 text-xs text-orange-600 font-medium">
                    ✓ Suara yang dipilih
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-blue-800 mb-2">💡 Tips</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Klik tombol speaker untuk test suara</li>
              <li>• Suara akan otomatis aktif setelah AI memberikan respon</li>
              <li>• Kamu bisa matikan suara kapan saja dengan tombol volume</li>
            </ul>
          </div>
          
          <div className="flex justify-end gap-3 mt-6">
            <Button
              variant="outline"
              onClick={onClose}
              className="px-6"
            >
              Batal
            </Button>
            <Button
              onClick={onClose}
              className="bg-gradient-to-r from-orange-400 to-pink-400 hover:from-orange-500 hover:to-pink-500 text-white px-6"
            >
              Simpan
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VoiceSettings;
