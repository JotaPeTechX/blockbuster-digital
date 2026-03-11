import { Link } from "react-router-dom";
import { Play, TvMinimalPlay } from "lucide-react";

const Home = () => {
  return (
    <section className="mx-auto flex min-h-[calc(100vh-64px)] max-w-7xl items-center px-4 py-10">
      <div className="grid w-full items-center gap-10 md:grid-cols-2">
        <div>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#ffd100]/20 px-4 py-2 text-sm font-bold text-[#003b73]">
            <Play className="h-4 w-4" />
            Blockbuster se reinventó
          </div>

          <h1 className="mb-6 text-5xl font-extrabold leading-tight text-slate-900 md:text-6xl">
            El streaming que habría salvado al videoclub
          </h1>

          <p className="mb-8 max-w-2xl text-lg text-slate-600">
            Descubre estrenos, clásicos y favoritos en una experiencia moderna
            inspirada en Blockbuster.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              to="/login"
              className="rounded-xl bg-[#003b73] px-6 py-4 text-lg font-bold text-white transition hover:bg-[#0057a8]"
            >
              Iniciar ahora
            </Link>

            <Link
              to="/dashboard"
              className="rounded-xl border border-slate-300 bg-white px-6 py-4 text-lg font-bold text-slate-800 transition hover:bg-slate-50"
            >
              Ver catálogo
            </Link>
          </div>
        </div>

        <div className="rounded-3xl bg-[#003b73] p-8 shadow-2xl">
          <div className="flex items-center justify-center rounded-3xl bg-[#ffd100] p-10">
            <TvMinimalPlay className="h-40 w-40 text-[#003b73]" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
