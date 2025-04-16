import "./login.css";


function Login() {

  return (
    <>
      <header></header>

      <Main className="page-container">


        <div className="robo-image">

        </div>

        <div className="login-container">

          <img className="Logo" src="../assets/img/BLA.png" alt="Logo do SenaiGPT." />

          <h1 
            id="meutitulo"
            className="titulo"
          >Login</h1>

          <input className="input" type="email"
            placeholder="Insira o email" />
          <input className="input" type="password"
            placeholder="Insira sua senha" />

          <button className="btn">Entrar</button>




        </div>



      </Main>

      <footer></footer>

    </>
  )
}

export default Login;