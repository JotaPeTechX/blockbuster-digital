import { Link } from "react-router-dom";

const Page404 = () => {
  return (
    <div className="flex min-h-[calc(100vh-64px)] flex-col items-center justify-center px-4 text-center">
      <h1 className="mb-4 text-6xl font-extrabold text-slate-900">404</h1>
      <p className="mb-6 text-slate-600">La página que buscas no existe.</p>
      <Link
        to="/"
        className="rounded-xl bg-[#003b73] px-6 py-3 font-bold text-white transition hover:bg-[#0057a8]"
      >
        Ir al inicio
      </Link>
    </div>
  );
};

export default Page404;
