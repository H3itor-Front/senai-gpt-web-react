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

    useEffect(() => {

        // Executada toda vez que a tela abre.
        getChats();


    }, []);

    const getChats = async () => {
        // Arrow Function
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

            const onLogOutclick = () => {

                localStorage.clear();
                window.location.href = "/login";

            }

            const clickChat = (chat) => {

                SetChatSelecionado(chat);
                console.log(chat);

            }

        }

    }

    return (
        <>

            <div className="container" />

            <header className="left-panel">

                <div className="top">

                    <button className="btn-new-chat">+ New chat</button>

                    {chats.map(chat => (
                        <button className="btn-chat" onClick={() => clickChat(chat)}>
                            <img src={btn} alt="" />
                            {chat.chatTitle};
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
                    <button className="btn-chat">Log out</button>

                </div>

            </header>

            <main className="central-panel" />

            {chatSelecionado == null && (
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

                            <p>"Explain quantum computing insimple terms"</p>
                            <p>"Got any creative ideas for a 10year old's birthday?"</p>
                            <p>"How do I make an HTTP requestin Javascript?"</p>

                        </div>

                        <div className="dicas-item">

                            <h2>
                                <img className="estrelala" src={star} alt="Example icon." />
                                Capabilities
                            </h2>

                            <p>Remembers what user saidearlier in the conversation.</p>
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
                            <p>Limited knowledge of world andevents after 2021.</p>

                        </div>

                    </div>

                </>
            )}





            <div className="input-container-1" />

            <img className="Micrafone" src={micro} alt="Microfone." />
            <img className="inmage" src={imagen} alt="Image." />

            <input placeholder="Type a message." type="text" />

            <img className="sendar" src={enviar} alt="Send." />

            <div />

            <main />

            <div />

        </>
    )
}

export default Chat;