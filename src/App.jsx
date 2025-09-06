import { Routes, Route, Link, NavLink } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Privacy from "./pages/Privacy.jsx";
import Terms from "./pages/Terms.jsx";
import Demo from "./pages/Demo.jsx";
import "./App.css";

export default function App() {
  return (
    <div className="site">
      <header className="site-header">
        <div className="container nav-wrap">
          <Link to="/" className="brand">CAELIARIS</Link>
          <nav className="nav">
            <NavLink to="/" end>Home</NavLink>
            <NavLink to="/demo">Demo</NavLink>
            <NavLink to="/privacy">Privacy</NavLink>
            <NavLink to="/terms">Terms</NavLink>
          </nav>
        </div>
      </header>
<<<<<<< HEAD

      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/demo" element={<Demo />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>

      <footer className="site-footer">
        <div className="container">
          <div>© {new Date().getFullYear()} Lucira Systems — Caeliaris</div>
          <div className="foot-links">
            <Link to="/privacy">Privacy</Link>
            <Link to="/terms">Terms</Link>
            <a href="mailto:lucirasystems@gmail.com">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

=======

      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/demo" element={<Demo />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>

      <footer className="site-footer">
        <div className="container">
          <div>© {new Date().getFullYear()} Lucira Systems — Caeliaris</div>
          <div className="foot-links">
            <Link to="/privacy">Privacy</Link>
            <Link to="/terms">Terms</Link>
            <a href="mailto:lucirasystems@gmail.com">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
>>>>>>> 570cf4d (feat: update homepage/meta/assets)
