import "./stylePaginaDeLogin.css"

export function PaginaCriacao() {
    return (
        <div className="containerPaginaDeLogin">
        <header className="headerPaginaDeLogin">
            <img src="./imagens/todo-app-logo.svg" alt="" height="20px"/>
        </header>
        <main className="mainPaginaDeLogin">
            <h2>Crie sua conta</h2>
            <form>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="" />
                <label htmlFor="senha">Senha</label>
                <input type="password" name="senha" id="" />
                <div className="botoesPaginaDeLogin">
                    <button className="btn1">Acessar</button>
                    <button className="btn2">Acessar conta</button>
                </div>
            </form>
        </main>
    </div>
    )
}