// src/components/Layout.tsx
import { ThemeToggle } from "./ThemeToggle";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { isLoggedIn, logout } from "../utils/auth";
import { Button } from "./ui/button";
export default function Layout() {
  const navigate = useNavigate();
  const loggedIn = isLoggedIn();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  return (
    <>
      <header className="flex items-center justify-between p-4 border-b shadow-md dark:bg-gray-900 dark:text-white">
        <h1 className="text-xl font-bold">
          <Link to="/">🎬 Movie List</Link>
        </h1>

        <div className="flex items-center gap-4">
          <Link to="/favorites">
            <Button variant="outline" className="text-sm">
              Favorites
            </Button>
          </Link>

          {!loggedIn ? (
            <Link to="/login">
              <Button variant="outline" className="text-sm">
                Login
              </Button>
            </Link>
          ) : (
            <Button
              variant="outline"
              className="text-sm"
              onClick={handleLogout}
            >
              Logout
            </Button>
          )}

          <ThemeToggle />
        </div>
      </header>

      <main className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
        <Outlet />
      </main>
    </>
  );
}
