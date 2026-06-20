'use client'

import { useState } from 'react'

interface Message {
  id: string
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Welcome. This is a local guided conversation with simulated responses. What would you like to explore?',
      sender: 'bot',
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')

    // Simulate a local guided response.
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Thanks for your message. This local experience uses a predefined simulated response and is not an integrated AI assistant.',
        sender: 'bot',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, botMessage])
    }, 1000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <>
      <button
        className="chat-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open guided conversation demo"
      >
        {isOpen ? '✕' : '💬'}
      </button>

      {isOpen && (
        <div className="chat-widget">
          <div className="chat-header">
            <h3>Guided Demo · Simulated</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="chat-close"
              aria-label="Close guided conversation demo"
            >
              ✕
            </button>
          </div>

          <div className="chat-messages">
            {messages.map(message => (
              <div
                key={message.id}
                className={`message ${message.sender === 'user' ? 'message-user' : 'message-bot'}`}
              >
                <p>{message.text}</p>
                <span className="message-time">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            ))}
          </div>

          <div className="chat-input">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Write a message for the local demo..."
              maxLength={500}
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputValue.trim()}
              className="send-button"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  )
}
