import { Film, Plus } from "lucide-react";

const MovieCard = ({ item, handleAdd }) => {
  return (
    <article className="overflow-hidden rounded-2xl bg-white shadow-lg transition hover:-translate-y-1 hover:shadow-2xl">
      <img
        src={item?.image || "https://placehold.co/400x500?text=Movie"}
        alt={item?.title || "movie"}
        className="h-72 w-full object-cover"
      />

      <div className="p-4">
        <div className="mb-3 flex items-center justify-between gap-2">
          <h2 className="line-clamp-1 text-lg font-extrabold text-slate-900">
            {item?.title || "Sin título"}
          </h2>
          <span className="rounded-full bg-[#ffd100] px-2 py-1 text-xs font-bold text-[#003b73]">
            {item?.type || "Catálogo"}
          </span>
        </div>

        <p className="mb-3 line-clamp-2 text-sm text-slate-600">
          {item?.description || "Sin descripción"}
        </p>

        <div className="mb-4 flex items-center gap-2 text-sm text-slate-500">
          <Film className="h-4 w-4" />
          <span>{item?.category || "General"}</span>
        </div>

        <div className="flex items-center justify-between gap-3">
          <span className="text-2xl font-black text-[#0057a8]">
            S/. {Number(item?.price) || 0}
          </span>

          <button
            type="button"
            onClick={() => handleAdd(item)}
            className="flex items-center gap-2 rounded-xl bg-[#003b73] px-4 py-2 font-bold text-white transition hover:bg-[#0057a8]"
          >
            <Plus className="h-4 w-4" />
            Agregar
          </button>
        </div>
      </div>
    </article>
  );
};

export default MovieCard;
