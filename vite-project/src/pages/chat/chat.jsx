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

    useEffect(() => {
        getChats();
    }, []);

    const getChats = async () => {
        let response = await fetch("https://senai-gpt-api.azurewebsites.net/chats", {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("meuToken")
            }
        });

        console.log(response);

        if (response.ok == true) {

            let json = await response.json(); // Pegue as informações dos chats.

            setChats(json);

        } else {

            if (response.status == 401) {

                alert("Token inválido. Faça login novamente.");
                localStorage.clear();
                window.location.href = "/login";

            }

        }

    }

    const onLogOutClick = () => {

        localStorage.clear();
        window.location.href = "/login";

    }

    const clickChat = (chat) => {

        setChatSelecionado(chat);
        console.log(chat);

    }

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

        // Faz a requisição com fetch
        const response = await fetch(url, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(data)
        });

        if (response.ok) {
            const result = await response.json();
            const botMessage = result.choices[0].message.content;
            return botMessage;
        }

    }

    const enviarMensagem = async (message) => {

        console.log("Mensagem", message);

        let userId = localStorage.getItem("meuId");

        let novaMensagemUsuario = {

            text: message,
            id: crypto.randomUUID(),
            userId: userId
        };


        let novoChatSelecionado = { ...chatSelecionado };
        novoChatSelecionado.messages.push(novaMensagemUsuario);
        setChatSelecionado(novoChatSelecionado);

        let respostaGPT = await chatGPT(message);

        let novaMensagemGPT = {

            text: respostaGPT,
            id: crypto.randomUUID(),
            userId: "chatbot"
        };

        novoChatSelecionado = { ...chatSelecionado };
        novoChatSelecionado.messages.push(novaMensagemGPT);
        setChatSelecionado(novoChatSelecionado);

        console.log("resposta", respostaGPT);

    }

    // let novoTitulo = prompt("Insira o titulo do chat: ");

    // if (novoTitulo == null || novoTitulo == "")



XMLDocument
    return (
        <>
            <div className="container">

                <header className="left-panel">

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