import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import {MainContainer, ChatContainer,MessageList,Message,MessageInput,TypingIndicator} from "@chatscope/chat-ui-kit-react"

const API_KEY = "sk-proj-3J99QZxYDpbrifBpyrGjT3BlbkFJE1yZdTlHihscv5B9F1SZ";

function App() {
  const [typing,setTyping] = useState(false)
  const [messages, setMessages] = useState([
    {
      message:"Hello,I am ChatGPT!",
      sender:"ChatGPT"
    }
  ])
  const handleSend = async (message)=>{
    const newMessage = {
      message: message,
      sender:"user",
      direction: "outgoing"
    }
    const newMessages = [ ...messages, newMessage];

    // update our messages state
    setMessages(newMessages);

    // set typing indicator (chatgpt is typing)
    setTyping(true);
    // process message to chatGPT (send it over abd see the response )

    await processMessageToChatGPT(newMessages);
  }

  async function processMessageToChatGPT(chatMessages){
      let apiMessages = chatMessages.map((messageObject) =>{
        let role = "";
        if(messageObject.sender === "ChatGPT"){
          role="assistant"
        } else{
          role="user"
        }
        return {role:role,content:messageObject.message}
      });
  }

  return (
    <div className="App">
      <div style={{position:"relative",height:"800px",width:"700px"}}>
        <MainContainer>
          <ChatContainer>
            <MessageList
            typingIndicator={typing ? <TypingIndicator content="ChatGPT is typing ?"/> : null}
            >
              {messages.map((message,i)=>{
                return <Message key={i} model={message}/>
              })}
            </MessageList>
            <MessageInput placeholder='Type message here' onSend={handleSend}/>
          </ChatContainer>
        </MainContainer>
      </div>
      
        
    </div>
  )
}

export default App
