import './App.css';
import Login from './login'

function App() {
  return (
    <div>
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start">
            <a className="navbar-item" href="/">
              Home
            </a>
            <a className="navbar-item" href="/stocks">
              Stocks
            </a>
          </div>
          <Login />
        </div>
      </nav>
      <section class="hero is-link is-fullheight-with-navbar">
        <div class="hero-body">
          <p class="title">
            Example Page
          </p>
        </div>
      </section>
    </div>
  );
}

export default App;