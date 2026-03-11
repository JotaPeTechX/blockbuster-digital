import { useNavigate } from "react-router-dom";
import { ListVideo, Trash2 } from "lucide-react";
import { useAppStore } from "../../store/useAppStore";

const MyList = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, checkoutRentals } = useAppStore();

  const totalAmount = cart.reduce(
    (acc, item) => acc + Number(item.movie.price),
    0,
  );

  const handleCheckout = async () => {
    const success = await checkoutRentals();

    if (success) {
      navigate("/profile");
    }
  };

  if (cart.length === 0) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-16 text-center">
        <div className="rounded-3xl border border-slate-200 bg-white p-16 shadow-sm">
          <ListVideo className="mx-auto mb-6 h-20 w-20 text-slate-300" />
          <h2 className="mb-4 text-3xl font-bold text-slate-800">
            Tu lista está vacía
          </h2>
          <p className="mb-8 text-slate-500">
            Agrega películas desde el catálogo para confirmarlas luego.
          </p>
          <button
            onClick={() => navigate("/dashboard")}
            className="rounded-xl bg-[#003b73] px-8 py-3 font-bold text-white transition hover:bg-[#0057a8]"
          >
            Ir al catálogo
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto grid max-w-7xl gap-8 px-4 py-8 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <h1 className="mb-6 flex items-center gap-2 text-2xl font-bold text-slate-900">
          <ListVideo className="h-6 w-6" />
          Mi Lista
        </h1>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          {cart.map((item) => (
            <div
              key={item.movie.id}
              className="flex flex-col gap-4 border-b border-slate-100 p-4 sm:flex-row sm:items-center"
            >
              <img
                src={item.movie.image}
                alt={item.movie.title}
                className="h-28 w-full rounded-xl object-cover sm:w-24"
              />

              <div className="flex-1">
                <h3 className="text-lg font-bold text-slate-800">
                  {item.movie.title}
                </h3>
                <p className="text-sm text-slate-500">{item.movie.category}</p>
              </div>

              <div className="text-lg font-black text-[#0057a8]">
                S/. {item.movie.price}
              </div>

              <button
                onClick={() => removeFromCart(item.movie.id)}
                className="rounded-lg p-2 text-rose-500 transition hover:bg-rose-50"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="sticky top-24 rounded-2xl bg-[#003b73] p-6 text-white shadow-xl">
          <h2 className="mb-6 border-b border-white/20 pb-4 text-xl font-bold">
            Resumen
          </h2>

          <div className="mb-4 flex justify-between text-slate-200">
            <span>Películas</span>
            <span>{cart.length}</span>
          </div>

          <div className="mb-8 flex justify-between items-end border-t border-white/20 pt-4">
            <span className="text-lg font-bold">Total</span>
            <span className="text-4xl font-black text-[#ffd100]">
              S/. {totalAmount}
            </span>
          </div>

          <button
            onClick={handleCheckout}
            className="w-full rounded-xl bg-[#ffd100] py-4 font-bold text-[#003b73] transition hover:opacity-90"
          >
            Confirmar renta
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyList;
