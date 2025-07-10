import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import Login from "./pages/Login";
import { Button } from "./components/ui/button";
import { AuthProvider } from "./context/AuthProvide";
import PrivateRoute from "./lib/PrivateRoute";
import ThemeToggle from "./lib/ThemeToogle";
import { useAuth } from "./hooks/useAuth";

function Header() {
  const { token, logout } = useAuth();

  return (
    <div className="w-full flex flex-wrap gap-4 p-4 justify-center border-b mb-4 bg-white dark:bg-zinc-900">
      <Button asChild variant="outline">
        <Link to="/">Home</Link>
      </Button>
      <Button asChild variant="outline">
        <Link to="/about">About</Link>
      </Button>

      {token && (
        <Button asChild variant="outline">
          <Link to="/products">Products</Link>
        </Button>
      )}

      {token ? (
        <Button onClick={logout} variant="destructive">
          Logout
        </Button>
      ) : (
        <Button asChild variant="outline">
          <Link to="/login">Login</Link>
        </Button>
      )}
      <ThemeToggle />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/products"
            element={
              <PrivateRoute>
                <Products />
              </PrivateRoute>
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
export default App;
