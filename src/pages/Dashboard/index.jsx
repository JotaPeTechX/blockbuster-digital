import axios from "axios";
import { useEffect, useState } from "react";
import { Activity, Clapperboard } from "lucide-react";
import Swal from "sweetalert2";
import MovieCard from "../../components/Dashboard/MovieCard";
import { useAppStore } from "../../store/useAppStore";

const Dashboard = () => {
  const { apiUrl, addToCart, user } = useAppStore();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);

      try {
        const response = await axios.get(`${apiUrl}/movies`);
        const data = Array.isArray(response?.data) ? response.data : [];
        setMovies(data);
      } catch {
        Swal.fire({
          title: "Error",
          text: "No se pudo cargar el catálogo",
          icon: "error",
        });
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [apiUrl]);

  if (!user) {
    return null;
  }

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Activity className="h-20 w-20 animate-spin text-[#0057a8]" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-8 flex items-center gap-3">
        <Clapperboard className="h-8 w-8 text-[#0057a8]" />
        <h1 className="text-3xl font-black text-slate-900">
          Catálogo de Streaming
        </h1>
      </div>

      {movies.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
          <h2 className="text-2xl font-bold text-slate-800">
            No hay películas disponibles
          </h2>
          <p className="mt-2 text-slate-500">
            Verifica que tu recurso /movies tenga datos cargados.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {movies.map((item, index) => (
            <MovieCard
              key={item?.id ?? index}
              item={item}
              handleAdd={addToCart}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
