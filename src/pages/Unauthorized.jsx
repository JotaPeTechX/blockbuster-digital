import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <div className="flex min-h-[calc(100vh-64px)] flex-col items-center justify-center px-4 text-center">
      <h1 className="mb-4 text-5xl font-extrabold text-slate-900">
        Acceso denegado
      </h1>
      <p className="mb-6 text-slate-600">
        No tienes permisos para entrar a esta sección.
      </p>
      <Link
        to="/dashboard"
        className="rounded-xl bg-[#003b73] px-6 py-3 font-bold text-white transition hover:bg-[#0057a8]"
      >
        Volver al catálogo
      </Link>
    </div>
  );
};

export default Unauthorized;
