
import React, { useState, useRef, useEffect } from "react";
import Header from "@/components/ui/header";
import NavBar from "@/components/ui/nav-bar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, Bot } from "lucide-react";
import { useNavigate } from "react-router-dom";

type Message = {
  id: number;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
};

const ChatPage = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content: "Hello! I'm your AgroVision AI assistant. Ask me anything about farming, crops, or agricultural practices.",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      content: input,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Simulate bot response
    setTimeout(() => {
      const botResponse = getBotResponse(input);
      const botMessage: Message = {
        id: messages.length + 2,
        content: botResponse,
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 1000);
  };

  const getBotResponse = (question: string): string => {
    const lowerQuestion = question.toLowerCase();
    
    if (lowerQuestion.includes("best crop") || lowerQuestion.includes("what to plant")) {
      return "The best crops depend on your soil type, climate, and season. Consider rice, wheat, maize, or pulses for most Indian regions. Would you like me to suggest crops for a specific soil type or season?";
    } else if (lowerQuestion.includes("pest") || lowerQuestion.includes("insect")) {
      return "For pest control, you can use neem oil spray, introduce beneficial insects, or rotate crops to break pest cycles. For severe infestations, consult with a local agricultural expert for targeted solutions.";
    } else if (lowerQuestion.includes("fertilizer") || lowerQuestion.includes("nutrients")) {
      return "Balanced fertilization is key. Use organic matter like compost for long-term soil health. NPK fertilizers address specific nutrient needs. Consider soil testing before application to avoid over-fertilization.";
    } else if (lowerQuestion.includes("water") || lowerQuestion.includes("irrigation")) {
      return "Drip irrigation is most efficient for water conservation. Water deeply but infrequently to encourage deep root growth. Morning watering reduces evaporation losses. Consider rainwater harvesting during monsoon season.";
    } else if (lowerQuestion.includes("organic farming") || lowerQuestion.includes("natural")) {
      return "Organic farming involves using natural fertilizers like compost, practicing crop rotation, using biological pest control, and avoiding synthetic chemicals. It improves soil health and biodiversity over time.";
    } else if (lowerQuestion.includes("acres") || lowerQuestion.includes("area") || lowerQuestion.includes("land")) {
      return "For land area calculations, please use our dedicated Yield Calculator feature. You can access it from the main menu or I can help you navigate there.";
    } else {
      return "That's an interesting question about farming. Would you like more specific information on crop selection, pest management, soil health, or yield optimization?";
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header title="AI Assistant" showBackButton onBackClick={() => navigate("/")} />
      
      <div className="flex-1 overflow-y-auto px-4 py-4 pb-20">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] rounded-lg px-4 py-2 ${
                  message.sender === "user"
                    ? "bg-primary text-white rounded-br-none"
                    : "bg-gray-200 text-gray-800 rounded-bl-none"
                }`}
              >
                {message.sender === "bot" && (
                  <div className="flex items-center gap-2 mb-1">
                    <Bot size={16} />
                    <span className="text-xs font-semibold">AgroVision AI</span>
                  </div>
                )}
                <p className="text-sm">{message.content}</p>
                <p className="text-xs opacity-70 text-right mt-1">
                  {message.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      <form
        onSubmit={handleSend}
        className="fixed bottom-16 left-0 right-0 bg-white border-t border-gray-200 p-3"
      >
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Ask about farming..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>
      
      <NavBar />
    </div>
  );
};

export default ChatPage;
