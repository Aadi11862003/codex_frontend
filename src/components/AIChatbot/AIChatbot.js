import React, { useState, useRef, useEffect } from 'react';
import './AIChatbot.css';

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hello! I\'m your CodeX assistant. How can I help you with your coding today?'
    }
  ]);
  const [quickReplies, setQuickReplies] = useState([
    { id: 'compiler', text: 'How to use the compiler?' },
    { id: 'edge-cases', text: 'What are edge cases?' },
    { id: 'languages', text: 'Supported programming languages' },
    { id: 'features', text: 'Platform features' }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e) => {
    setInputMessage(e.target.value);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const clearChat = () => {
    setMessages([
      {
        role: 'assistant',
        content: ' Hello! How can I help you today?'
      }
    ]);
    
    // Reset quick replies to initial state
    setQuickReplies([
      { id: 'compiler', text: 'How to use the compiler?' },
      { id: 'edge-cases', text: 'What are edge cases?' },
      { id: 'languages', text: 'Supported programming languages' },
      { id: 'features', text: 'Platform features' }
    ]);
  };

  const generateResponse = (userQuery, quickReplyId = null) => {
    let response;
    let followUpReplies = [];
    
    // Handle responses based on quick reply ID or text content
    if (quickReplyId === 'compiler' || userQuery.includes('compiler') || userQuery.includes('code')) {
      response = "Our online compiler supports JavaScript currently, with more languages coming soon. You can write your code in the editor, select a language, and click 'Run Code' to execute it. The output will be displayed below the editor.";
      followUpReplies = [
        { id: 'run-code', text: 'How to run my code?' },
        { id: 'errors', text: 'Dealing with errors' },
        { id: 'examples', text: 'Show me code examples' }
      ];
    } else if (quickReplyId === 'edge-cases' || userQuery.includes('edge case')) {
      response = "Edge cases are important in programming because they test the boundaries of your code. Common edge cases include: empty inputs, extremely large values, negative numbers, special characters, and boundary conditions. Our platform automatically detects potential edge cases in your code!";
      followUpReplies = [
        { id: 'edge-examples', text: 'Edge case examples' },
        { id: 'handle-edge', text: 'How to handle edge cases?' },
        { id: 'why-important', text: 'Why are they important?' }
      ];
    } else if (quickReplyId === 'languages' || userQuery.includes('language')) {
      response = "Currently, our platform fully supports JavaScript. We're working on adding Python, Java, and C++ support soon. Each language will have specialized edge case detection and visualization features.";
      followUpReplies = [
        { id: 'js-features', text: 'JavaScript features' },
        { id: 'upcoming', text: 'Upcoming languages' },
        { id: 'language-diff', text: 'Language differences' }
      ];
    } else if (quickReplyId === 'features' || userQuery.includes('feature')) {
      response = "CodeX offers several features: an online compiler, code visualization (coming soon), edge case detection, and AI assistance. You can write, run, and analyze your code all in one platform!";
      followUpReplies = [
        { id: 'visualization', text: 'Code visualization' },
        { id: 'edge-detection', text: 'Edge case detection' },
        { id: 'ai-help', text: 'AI assistance' }
      ];
    } else if (quickReplyId === 'run-code') {
      response = "To run your code, simply type it in the editor, select the appropriate language from the dropdown, and click the 'Run Code' button. The output will appear in the output section below the editor.";
      followUpReplies = [
        { id: 'compiler', text: 'Back to compiler info' },
        { id: 'errors', text: 'Dealing with errors' }
      ];
    } else if (quickReplyId === 'errors' || userQuery.includes('error')) {
      response = "If you encounter errors, they'll be displayed in the output section. Common errors include syntax errors (missing brackets, semicolons), reference errors (undefined variables), and logic errors. Our edge case detector can help identify potential issues before they cause runtime errors.";
      followUpReplies = [
        { id: 'common-errors', text: 'Common JavaScript errors' },
        { id: 'debugging', text: 'Debugging tips' }
      ];
    } else if (quickReplyId === 'examples') {
      response = "Here's a simple JavaScript example you can try:\n\n```javascript\nfunction factorial(n) {\n  if (n <= 1) return 1;\n  return n * factorial(n-1);\n}\n\nconsole.log(factorial(5)); // Output: 120\n```\n\nCopy and paste this into the compiler to see it work!";
      followUpReplies = [
        { id: 'more-examples', text: 'More examples' },
        { id: 'edge-examples', text: 'Edge case examples' }
      ];
    } else if (quickReplyId === 'edge-examples') {
      response = "Here's an example with edge cases:\n\n```javascript\nfunction divide(a, b) {\n  // Edge case: division by zero\n  if (b === 0) {\n    return 'Cannot divide by zero';\n  }\n  return a / b;\n}\n\nconsole.log(divide(10, 2)); // 5\nconsole.log(divide(10, 0)); // Cannot divide by zero\n```\n\nThis function handles the edge case of division by zero.";
      followUpReplies = [
        { id: 'handle-edge', text: 'More on handling edge cases' },
        { id: 'examples', text: 'More code examples' }
      ];
    } else if (quickReplyId === 'handle-edge' || userQuery.includes('handle') && userQuery.includes('edge')) {
      response = "To handle edge cases effectively:\n1. Identify potential edge cases (empty inputs, boundary values, etc.)\n2. Write tests for these cases\n3. Add validation and error handling in your code\n4. Use defensive programming techniques\n5. Document the expected behavior for edge cases\n\nOur platform helps by automatically detecting potential edge cases in your code!";
      followUpReplies = [
        { id: 'edge-examples', text: 'Edge case examples' },
        { id: 'edge-cases', text: 'Back to edge cases' }
      ];
    } else if (quickReplyId === 'why-important') {
      response = "Edge cases are important because they often cause bugs in production. Handling them properly makes your code more robust and reliable. Unhandled edge cases can lead to crashes, security vulnerabilities, data corruption, and poor user experience.";
      followUpReplies = [
        { id: 'handle-edge', text: 'How to handle edge cases' },
        { id: 'edge-examples', text: 'Show me examples' }
      ];
    } else if (quickReplyId === 'visualization' || userQuery.includes('visual')) {
      response = "Our code visualization feature (coming soon) will show you how your code executes step by step, making it easier to understand complex algorithms and identify issues. It will highlight variable changes, function calls, and control flow in real-time.";
      followUpReplies = [
        { id: 'features', text: 'Back to features' },
        { id: 'upcoming', text: 'Other upcoming features' }
      ];
    } else if (quickReplyId === 'ai-help' || userQuery.includes('ai') || userQuery.includes('assistant')) {
      response = "I'm your AI assistant! I can help you understand coding concepts, debug issues, explain error messages, suggest improvements to your code, and guide you through using all the features of the CodeX platform. Just ask me anything!";
      followUpReplies = [
        { id: 'features', text: 'Platform features' },
        { id: 'examples', text: 'Code examples' }
      ];
    } else if (quickReplyId === 'debugging' || userQuery.includes('debug')) {
      response = "Debugging tips:\n1. Read the error message carefully\n2. Check line numbers mentioned in errors\n3. Use console.log() to inspect variables\n4. Break down complex code into smaller parts\n5. Test each function separately\n6. Look for typos and syntax errors\n7. Use our edge case detector to find potential issues";
      followUpReplies = [
        { id: 'errors', text: 'Common errors' },
        { id: 'examples', text: 'Code examples' }
      ];
    } else if (userQuery.includes('help')) {
      response = "I can help you with coding questions, explain programming concepts, assist with debugging, and provide guidance on best practices. Just ask me anything related to programming or how to use the CodeX platform!";
      followUpReplies = [
        { id: 'features', text: 'Platform features' },
        { id: 'compiler', text: 'Using the compiler' },
        { id: 'edge-cases', text: 'Understanding edge cases' }
      ];
    } else {
      response = "I'm here to help with your coding questions. You can ask me about programming concepts, debugging issues, or how to use the features of the CodeX platform. Is there something specific you'd like to know?";
      followUpReplies = [
        { id: 'compiler', text: 'How to use the compiler?' },
        { id: 'edge-cases', text: 'What are edge cases?' },
        { id: 'features', text: 'Platform features' }
      ];
    }
    
    return { response, followUpReplies };
  };

  const handleSendMessage = async () => {
    if (inputMessage.trim() === '') return;

    // Add user message to chat
    const userMessage = { role: 'user', content: inputMessage };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    // Generate response based on user input
    setTimeout(() => {
      const { response, followUpReplies } = generateResponse(inputMessage.toLowerCase());
      
      const assistantMessage = { role: 'assistant', content: response };
      setMessages(prevMessages => [...prevMessages, assistantMessage]);
      setQuickReplies(followUpReplies);
      setIsLoading(false);
    }, 1000);
  };

  const handleQuickReply = (replyId, replyText) => {
    // Add user message to chat
    const userMessage = { role: 'user', content: replyText };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setIsLoading(true);

    // Generate response based on quick reply
    setTimeout(() => {
      const { response, followUpReplies } = generateResponse('', replyId);
      
      const assistantMessage = { role: 'assistant', content: response };
      setMessages(prevMessages => [...prevMessages, assistantMessage]);
      setQuickReplies(followUpReplies);
      setIsLoading(false);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="chatbot-container">
      <button 
        className={`chatbot-toggle ${isOpen ? 'open' : ''}`} 
        onClick={toggleChatbot}
      >
        {isOpen ? '✕' : '?'}
      </button>
      
      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <h3>CodeX Assistant</h3>
            <button className="clear-chat-button" onClick={clearChat}>
                
            </button>
          </div>
          
          <div className="chatbot-messages">
            {messages.map((message, index) => (
              <div 
                key={index} 
                className={`message ${message.role === 'user' ? 'user-message' : 'assistant-message'}`}
              >
                <div dangerouslySetInnerHTML={{ __html: message.content.replace(/```([\s\S]*?)```/g, '<pre class="code-block">$1</pre>') }} />
              </div>
            ))}
            {isLoading && (
              <div className="message assistant-message loading">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          {quickReplies.length > 0 && (
            <div className="quick-replies">
              {quickReplies.map(reply => (
                <button 
                  key={reply.id}
                  className="quick-reply-button"
                  onClick={() => handleQuickReply(reply.id, reply.text)}
                >
                  {reply.text}
                </button>
              ))}
            </div>
          )}
          
          <div className="chatbot-input">
            <textarea
              value={inputMessage}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything about coding..."
              rows={1}
            />
            <button 
              onClick={handleSendMessage}
              disabled={inputMessage.trim() === '' || isLoading}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIChatbot; 