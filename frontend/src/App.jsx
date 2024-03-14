import "./styleApp.css"
// import { PaginaDeLogin } from "./PaginaDeLogin"
// import { PaginaCriacao } from "./PaginaCriacao"

function App() {
  

  return (
    <div className="containerWebSite">
      <header className="headerWebSite">
        <img src="./imagens/todo-app-logo.svg" alt="" height="20px"/>
      </header>
      <main className="mainWebSite">
        <img src="./imagens/todo-app-logo.svg" alt="" />
        <h3>Seu aplicativo de gestão pessoal</h3>
        <div className="botoesWebSite">
          <button className="btn1">Criar conta</button>
          <button className="btn2">Acessar conta</button>
        </div>
      </main>
    </div>
    
    
  )
}

export default App
