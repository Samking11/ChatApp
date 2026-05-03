import React, { useMemo, useState } from 'react';

const quickReplies = ['What can you do?', 'Tell me a joke', 'Give me focus tips'];

function getBotReply(input) {
  const text = input.toLowerCase();
  if (text.includes('joke')) return 'Why do programmers prefer dark mode? Because light attracts bugs.';
  if (text.includes('focus')) return 'Try 25 minutes of deep work, 5 minute break, then repeat 4 times.';
  if (text.includes('hello') || text.includes('hi')) return 'Hey there 👋 I am Nova, your React chatbot.';
  if (text.includes('what can you do')) return 'I can chat, suggest ideas, and keep your vibe productive ✨';
  return `That sounds interesting. Tell me more about "${input}".`;
}

export default function App() {
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'Welcome! I am Nova. Ask me anything.' }
  ]);
  const [draft, setDraft] = useState('');

  const canSend = useMemo(() => draft.trim().length > 0, [draft]);

  const sendMessage = (text) => {
    const clean = text.trim();
    if (!clean) return;
    setMessages((prev) => [...prev, { role: 'user', text: clean }]);
    setDraft('');
    window.setTimeout(() => {
      setMessages((prev) => [...prev, { role: 'bot', text: getBotReply(clean) }]);
    }, 300);
  };

  return (
    <div className="app-shell">
      <div className="chat-card">
        <header>
          <h1>Nova Chat</h1>
          <p>Neon assistant • React UI</p>
        </header>

        <section className="messages" aria-live="polite">
          {messages.map((msg, idx) => (
            <div key={idx} className={`bubble ${msg.role}`}>
              {msg.text}
            </div>
          ))}
        </section>

        <div className="quick-replies">
          {quickReplies.map((q) => (
            <button key={q} onClick={() => sendMessage(q)}>{q}</button>
          ))}
        </div>

        <form
          className="composer"
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage(draft);
          }}
        >
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Type your message..."
          />
          <button type="submit" disabled={!canSend}>Send</button>
        </form>
      </div>
    </div>
  );
}
