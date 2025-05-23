import "./chat.css";
import example from "../../assets/img/IconSet.svg";
import chat from "../../assets/img/BLA.png";
// import lolo from "../../assets/img/Chats.png";
// import vator from "../../assets/img/Vector.png";
// import star from "../../assets/img/Star.png";
import sendIcon from "../../assets/img/send.png";
import imagen from "../../assets/img/Vector (1).png";
import micro from "../../assets/img/Vector (2).png";
import { useEffect, useState } from "react";

function Chat() {
    const [chats, setChats] = useState([]);
    const [chatSelecionado, setChatSelecionado] = useState(null);
    const [userMessage, setUserMessage] = useState("");

    const [IsLeftPanelOpen , setIsLeftPanelOpen] = useState(false);

    useEffect(() => {
        getChats();
    }, []);

    const getChats = async () => {
        let response = await fetch("https://senai-gpt-api.up.railway.app/users", {
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

    const onLogOutClick = () => {
        localStorage.clear();
        window.location.href = "/login";
    };

    const clickChat = (chat) => {
        setChatSelecionado(chat);
        setIsLeftPanelOpen(false)
    };


    const deletarChat = async (chatId) => {
        const confirmacao = window.confirm("Deseja realmente excluir este chat?");
        if (!confirmacao) return;

        let response = await fetch(`https://senai-gpt-api.up.railway.app/users${chatId}`, {
            method: "DELETE",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("meuToken")
            }
        });

        if (response.ok) {
            setChatSelecionado(null);
            await getChats();
        } else {
            alert("Erro ao excluir o chat.");
        }
    };

    const chatGPT = async (message) => {

            return "[Mensagem fixa]";

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
            headers,
            body: JSON.stringify(data)
        });

        if (response.ok) {
            const result = await response.json();
            return result.choices[0].message.content;
        }
    };

    const enviarMensagem = async (message) => {
        let chatAtual = { ...chatSelecionado };

        if (!chatSelecionado) {
            chatAtual = await novoChat();
        }

        let userId = localStorage.getItem("meuId");

        let novaMensagemUsuario = {
            userId: crypto.randomUUID(),
            text: message,
            id: userId
        };

        let novoChatSelecionado = { ...chatAtual };
        novoChatSelecionado.messages.push(novaMensagemUsuario);
        setChatSelecionado(novoChatSelecionado);

        let resposta = await chatGPT(message);

        let novaRespostaChatGPT = {
            userId: "chatbot",
            text: resposta,
            id: crypto.randomUUID()
        };

        novoChatSelecionado.messages.push(novaRespostaChatGPT);
        setChatSelecionado({ ...novoChatSelecionado });

        let response = await fetch(`https://senai-gpt-api.up.railway.app/users${chatAtual.id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("meuToken")
                },
                body: JSON.stringify(novoChatSelecionado)
            }
        );

        if (response.ok) {
            console.log("Chat atualizado com sucesso.");
        } else {
            console.log("Erro ao atualizar o chat.");
        }

        setUserMessage("");
        await getChats();
    };

    const novoChat = async () => {
        let nomeChat = prompt("Digite o nome do novo chat:");
        if (!nomeChat) {
            alert("Nome inválido.");
            return;
        }

        let userId = localStorage.getItem("meuId");
        let novoChatObj = {
            id: crypto.randomUUID(),
            chatTitle: nomeChat,
            messages: [],
            userId
        };

        setChatSelecionado(novoChatObj);
        setUserMessage("");

        let response = await fetch("https://senai-gpt-api.up.railway.app/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("meuToken")
            },
            body: JSON.stringify(novoChatObj)
        });

        if (response.ok) {
            await getChats();
            return novoChatObj;
        } else {
            console.log("Erro ao criar o chat.");
        }
    };

    return (
        <>
            <div className="container">

                <button
                    className="btn-toggle-panel"
                    onClick={() => setIsLeftPanelOpen(!IsLeftPanelOpen)}    
                >
                    ☰
                </button>
                <header className={`left-panel ${IsLeftPanelOpen == true ? "open" : " "}`}>                                                                                                                                                                                                                                                                                                                                                                                                                                                                         

                    <div className="top">

                        <button className="btn-new-chat">+ New chat</button>

                        {chats.map(chat => (
                            <button className="btn-chat" onClick={() => clickChat(chat)}>
                                <img src={example} alt="ícone de chat." />
                                {chat.chatTitle}
                            </button>
                        ))}

                    </div>

                    <div className="bottom">

                        <button className="btn-chat" onClick={() => apagarChat(excui-text)}>Clear conversations</button>
                        <button className="btn-chat">Light mode</button>
                        <button className="btn-chat">My account</button>
                        <button className="btn-chat">Updates & FAQ</button>
                        <button className="btn-chat" onClick={() => onLogOutClick()}>Log out</button>

                    </div>

                </header>

                <main className="central-panel">

                    {chatSelecionado == null && (

                        <>

                            <div className="chat-logo">
                                <img src={chat} alt="Logo do SenaiGPT." />
                            </div>

                            <div className="dicas-container">

                                <div className="dicas-item">

                                    <h2>
                                        <img src={example} alt="Example icon." />
                                        Examples
                                    </h2>

                                    <p>Explique como um computador quântico funciona.</p>
                                    <p>Explique como um computador quântico funciona.</p>
                                    <p>Explique como um computador quântico funciona.</p>

                                </div>

                                <div className="dicas-item">

                                    <h2>
                                        <img src={example} alt="Example icon." />
                                        Examples
                                    </h2>

                                    <p>Explique como um computador quântico funciona.</p>
                                    <p>Explique como um computador quântico funciona.</p>
                                    <p>Explique como um computador quântico funciona.</p>

                                </div>

                                <div className="dicas-item">

                                    <h2>
                                        <img src={example} alt="Example icon." />
                                        Examples
                                    </h2>

                                    <p>Explique como um computador quântico funciona.</p>
                                    <p>Explique como um computador quântico funciona.</p>
                                    <p>Explique como um computador quântico funciona.</p>

                                </div>

                            </div>

                        </>

                    )}

                    {chatSelecionado != null && (

                        <>

                            <div className="chat-container">

                                <div className="chat-header">

                                    <h2>{chatSelecionado.chatTitle}</h2>

                                </div>

                                <div className="chat-messages">

                                    {chatSelecionado.messages.map((message) => (
                                        <p className={"message-item " + (message.userId === "chatbot" ? "chatbot" : "")}>{message.text}</p>
                                    ))}

                                </div>

                            </div>

                        </>

                    )}

                    <div className="input-container-1">

                        <img src={micro} alt="Microphone." />
                        <img src={imagen} alt="Image." />

                        <input
                            value={userMessage}
                            onChange={event => setUserMessage(event.target.value)} placeholder="Type a message."
                            type="text"
                        />

                        <img onClick={() => enviarMensagem(userMessage)} src={sendIcon} alt="Send." />

                    </div>

                </main>

            </div>
        </>
    )

};

export default Chat;