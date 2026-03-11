import { Clapperboard, LogOut, UserCircle2, ListVideo } from "lucide-react";
import { Link } from "react-router-dom";
import { useAppStore } from "../../store/useAppStore";

const Navbar = () => {
  const { user, logout, hasRole, cart } = useAppStore();

  return (
    <header className="sticky top-0 z-50 w-full bg-[#003b73] shadow-lg">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <Clapperboard className="h-7 w-7 text-[#ffd100]" />
          <Link
            to="/"
            className="text-lg font-extrabold tracking-wide text-white"
          >
            Blockbuster Digital
          </Link>
        </div>

        <nav className="flex items-center gap-2 md:gap-4">
          <Link
            to="/dashboard"
            className="rounded-lg px-3 py-2 text-sm font-bold text-white transition hover:bg-white/10"
          >
            Catálogo
          </Link>

          {user && (
            <Link
              to="/mi-lista"
              className="relative rounded-lg px-3 py-2 text-sm font-bold text-white transition hover:bg-white/10"
            >
              <span className="flex items-center gap-2">
                <ListVideo className="h-4 w-4" />
                Mi Lista
              </span>
              {cart.length > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#ffd100] text-xs font-black text-[#003b73]">
                  {cart.length}
                </span>
              )}
            </Link>
          )}

          {user && (
            <Link
              to="/profile"
              className="rounded-lg px-3 py-2 text-sm font-bold text-white transition hover:bg-white/10"
            >
              Mi Perfil
            </Link>
          )}

          {user && hasRole(["admin"]) && (
            <Link
              to="/panel-admin"
              className="rounded-lg bg-[#ffd100] px-3 py-2 text-sm font-bold text-[#003b73] transition hover:opacity-90"
            >
              Panel Admin
            </Link>
          )}

          {user ? (
            <div className="flex items-center gap-3">
              <div className="hidden text-right md:block">
                <p className="text-sm font-bold text-white">{user?.name}</p>
                <p className="text-xs text-slate-300">{user?.role}</p>
              </div>

              <div className="rounded-full bg-white/10 p-2 text-white">
                <UserCircle2 className="h-5 w-5" />
              </div>

              <button
                onClick={logout}
                className="rounded-lg bg-white/10 p-2 text-white transition hover:bg-white/20"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="rounded-lg bg-[#ffd100] px-4 py-2 text-sm font-bold text-[#003b73] transition hover:opacity-90"
            >
              Iniciar sesión
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
