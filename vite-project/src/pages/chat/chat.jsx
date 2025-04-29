import "./chat.css";
import Icon from "../../assets/img/IconSet.svg";
import chat from "../../assets/img/BLA.png";
import lolo from "../../assets/img/Chats.png";
import vator from "../../assets/img/Vector.png";
import star from "../../assets/img/Star.png";
import enviar from "../../assets/img/send.png";
import imagen from "../../assets/img/Vector (1).png";
import micro from "../../assets/img/Vector (2).png";
import { useEffect, useState } from "react";

function Chat() {
    const [chats, setChats] = useState([]);
    const [chatSelecionado, SetChatSelecionado] = useState(null);
    const [userMessage, setUserMessage] = useState("");

    useEffect(() => {
        getChats();
    }, []);

    const getChats = async () => {
        let response = await fetch("https://senai-gpt-api.azurewebsites.net/chats", {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("meuToken")
            }
        });

        if (response.ok) {
            let json = await response.json();
            setChats(json);
        } else if (response.status === 401) {
            alert("Token inválido. Faça login novamente.");
            localStorage.clear();
            window.location.href = "/login";
        }
    };

    const onLogOutclick = () => {
        localStorage.clear();
        window.location.href = "/login";
    };

    const clickChat = (chat) => {
        SetChatSelecionado(chat);
    };

    const chatGPT = async (message) => {
        const endpoint = "https://ai-testenpl826117277026.openai.azure.com/";
        const apiKey = "DCYQGY3kPmZXr0lh7xeCSEOQ5oiy1aMlN1GeEQd5G5cXjuLWorWOJQQJ99BCACYeBjFXJ3w3AAAAACOGol8N";
        const deploymentId = "gpt-4";
        const apiVersion = "2024-05-01-preview";
        const url = `${endpoint}/openai/deployments/${deploymentId}/chat/completions?api-version=${apiVersion}`;

        const data = {
            messages: [{ role: "user", content: message }],
            max_tokens: 50
        };

        const headers = {
            "Content-Type": "application/json",
            "api-key": apiKey
        };

        const response = await fetch(url, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(data)
        });

        if (response.ok) {
            const result = await response.json();
            return result.choices[0].message.content;
        }

        return "Erro ao obter resposta do chatbot.";
    };

    const enviarMensagem = async (message) => {
        if (!message.trim()) return;

        const novaMensagemUsuario = {
            userId: "user",
            text: message,
            id: crypto.randomUUID()
        };

        let novoChatSelecionado = { ...chatSelecionado };
        novoChatSelecionado.messages.push(novaMensagemUsuario);
        SetChatSelecionado(novoChatSelecionado);
        setUserMessage("");

        const resposta = await chatGPT(message);

        const novaMensagemBot = {
            userId: "chatbot",
            text: resposta,
            id: crypto.randomUUID()
        };

        novoChatSelecionado.messages.push(novaMensagemBot);
        SetChatSelecionado({ ...novoChatSelecionado });
    };

    return (
        <>
            <div className="container">
                <header className="left-panel">
                    <div className="top">
                        <button className="btn-new-chat">+ New chat</button>
                        {chats.map((chat, index) => (
                            <button key={index} className="btn-chat" onClick={() => clickChat(chat)}>
                                <img src={Icon} alt="" />
                                {chat.chatTitle}
                            </button>
                        ))}
                        <button className="btn-chat">
                            <img className="IconSet" src={Icon} alt="ícone de chat." />
                            AI Chat Tool Ethics
                        </button>
                        <button className="btn-chat">
                            <img className="IconSet" src={Icon} alt="ícone de chat." />
                            AI Chat Tool Impact Writing
                        </button>
                        <button className="btn-chat">
                            <img className="IconSet" src={Icon} alt="ícone de chat." />
                            New chat
                        </button>
                    </div>
                    <div className="bottom">
                        <button className="btn-chat">Clear conversations</button>
                        <button className="btn-chat">Light mode</button>
                        <button className="btn-chat">My account</button>
                        <button className="btn-chat">Updates & FAQ</button>
                        <button className="btn-chat" onClick={onLogOutclick}>Log out</button>
                    </div>
                </header>

                <main className="central-panel">
                    {chatSelecionado == null ? (
                        <>
                            <div className="logo">
                                <img className="Logo" src={chat} alt="Logo do SenaiGPT." />
                            </div>
                            <div className="dicas-container">
                                <div className="dicas-item">
                                    <h2>
                                        <img className="caixa" src={lolo} alt="Example icon." />
                                        Examples
                                    </h2>
                                    <p>"Explain quantum computing in simple terms"</p>
                                    <p>"Got any creative ideas for a 10-year-old's birthday?"</p>
                                    <p>"How do I make an HTTP request in Javascript?"</p>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="chat-container">
                            <div className="chat-header">
                                <h2>{chatSelecionado.chatTitle}</h2>
                            </div>
                            <div className="chat-messages">
                                {chatSelecionado.messages.map((message) => (
                                    <p
                                        key={message.id}
                                        className={
                                            "menssage-item " + (message.userId === "chatbot" ? "chatbot" : "")
                                        }
                                    >
                                        {message.text}
                                    </p>
                                ))}
                            </div>
                        </div>
                    )}
                </main>

                <div className="dicas-item">
                    <h2>
                        <img className="estrelala" src={star} alt="Example icon." />
                        Capabilities
                    </h2>
                    <p>Remembers what user said earlier in the conversation.</p>
                    <p>Allows user to provide follow-up corrections.</p>
                    <p>Trained to decline inappropriate requests.</p>
                </div>

                <div className="dicas-item">
                    <h2>
                        <img className="Vetor" src={vator} alt="Example icon." />
                        Limitations
                    </h2>
                    <p>May occasionally generate incorrect information.</p>
                    <p>May occasionally produce harmful instructions or biased content.</p>
                    <p>Limited knowledge of world and events after 2021.</p>
                </div>

                <div className="input-container-1">
                    <img className="Micrafone" src={micro} alt="Microfone." />
                    <img className="inmage" src={imagen} alt="Image." />
                    <input
                        value={userMessage}
                        onChange={event => setUserMessage(event.target.value)}
                        placeholder="Type a message."
                        type="text"
                    />
                    <img
                        onClick={() => enviarMensagem(userMessage)}
                        className="sendar"
                        src={enviar}
                        alt="Send."
                    />
                </div>
            </div>
        </>
    );
}

export default Chat;
