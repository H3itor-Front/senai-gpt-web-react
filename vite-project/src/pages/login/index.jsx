import "./login.css";
import logo from "../../assets/img/BLA.png";
import { useState } from "react";

function Login() {

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const onLoginClick = async () => {

    let response = await fetch("https://senai-gpt-api.azurewebsites.net/login", {

      headers: {

        "content-type": "application/json"

      },
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password
      })

    });

    console.log(response);

    if (response.ok == true) {
      alert('Login realizado com sucesso!');

      let json = await response.json(); 

      let token = json.accessToken;

      console.log("Token " + token);

      localStorage.setItem("meuToken", token);

      //COOKIES

      // function serCookie (name, value, days) {
      //   const date = new Date();
      //   date.seetTime(date.getTime() + (days * 24 * 60 * 60 * 1000)); // dias => ms
      //   const expires = "expires" + date.
      // }
      
      window.location.href= "/chat";

    } else {

      if (response.status == 401) {

        alert("Credenciais incorretas. Tente novamente")

      } else {

        alert("Erro inesperado aconteceu, caso persista, contate os administradores.")

      }
    }
  }

  return (
    <>
      <header></header>

      <main className="page-container">


        <div className="robo-image">

        </div>

        <div className="login-container">

          <img className="Logo" src={logo} alt="Logo do SenaiGPT." />

          <h1
            id="meutitulo"
            className="titulo"
          >Login</h1>



          <input className="input" value={email} onChange={Event => setEmail(Event.target.value)} type="email" placeholder="Insira o email" />
          <input className="input" value={password} onChange={Event => setPassword(Event.target.value)} type="password" placeholder="Insira sua senha" />

          <button class="btn" onClick={() => onLoginClick()}>Entrar</button>




        </div>



      </main>

      <footer></footer>

    </>
  )
}

export default Login;