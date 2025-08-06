import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const ChatWindow: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Bonjour ! Je suis votre assistant virtuel TransitExpert. Comment puis-je vous aider aujourd\'hui ?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponse = getBotResponse(inputMessage);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const getBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('devis') || input.includes('prix') || input.includes('tarif')) {
      return 'Je peux vous aider à obtenir un devis personnalisé ! Pouvez-vous me préciser : origine, destination, type de marchandise et poids approximatif ?';
    }
    
    if (input.includes('transport') || input.includes('expédition')) {
      return 'Nous proposons du transport aérien, maritime et terrestre vers plus de 150 destinations. Quel type de transport vous intéresse ?';
    }
    
    if (input.includes('délai') || input.includes('temps') || input.includes('durée')) {
      return 'Les délais varient selon le mode de transport : Express (24-48h), Standard (1-2 semaines), Économique (3-4 semaines). Quelle est votre urgence ?';
    }
    
    if (input.includes('douane') || input.includes('dédouanement')) {
      return 'Nous nous occupons de toutes les formalités douanières. Nos experts certifiés OEA simplifient vos démarches import/export.';
    }
    
    if (input.includes('suivi') || input.includes('tracking')) {
      return 'Notre plateforme de suivi temps réel vous permet de localiser vos marchandises 24h/24. Vous recevez des alertes à chaque étape.';
    }
    
    if (input.includes('contact') || input.includes('téléphone') || input.includes('email')) {
      return 'Vous pouvez nous joindre au +33 1 23 45 67 89 ou contact@transitaire-expert.fr. Nos experts sont disponibles 24h/7j pour les urgences.';
    }
    
    return 'Merci pour votre question ! Pour une réponse personnalisée, je vous invite à contacter directement nos experts au +33 1 23 45 67 89 ou à remplir notre formulaire de devis.';
  };

  const quickReplies = [
    'Demander un devis',
    'Délais de transport',
    'Suivi de colis',
    'Contact expert'
  ];

  const handleQuickReply = (reply: string) => {
    setInputMessage(reply);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex items-start space-x-2 max-w-xs ${
              message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
            }`}>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                message.sender === 'user' ? 'bg-blue-600' : 'bg-gray-300'
              }`}>
                {message.sender === 'user' ? (
                  <User size={12} className="text-white" />
                ) : (
                  <Bot size={12} className="text-gray-600" />
                )}
              </div>
              <div className={`rounded-2xl px-3 py-2 ${
                message.sender === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-800'
              }`}>
                <p className="text-sm">{message.text}</p>
                <p className={`text-xs mt-1 ${
                  message.sender === 'user' ? 'text-blue-200' : 'text-gray-500'
                }`}>
                  {message.timestamp.toLocaleTimeString('fr-FR', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </p>
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="flex items-start space-x-2">
              <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center">
                <Bot size={12} className="text-gray-600" />
              </div>
              <div className="bg-gray-100 rounded-2xl px-3 py-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Replies */}
      {messages.length === 1 && (
        <div className="px-4 pb-2">
          <p className="text-xs text-gray-500 mb-2">Suggestions :</p>
          <div className="flex flex-wrap gap-2">
            {quickReplies.map((reply, index) => (
              <button
                key={index}
                onClick={() => handleQuickReply(reply)}
                className="text-xs bg-blue-50 text-blue-600 px-3 py-1 rounded-full hover:bg-blue-100 transition-colors"
              >
                {reply}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Tapez votre message..."
            className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            disabled={isTyping}
          />
          <button
            type="submit"
            disabled={!inputMessage.trim() || isTyping}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white p-2 rounded-full transition-colors"
          >
            <Send size={16} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatWindow;