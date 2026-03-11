import { Film } from "lucide-react";

const TableGeneral = ({ data, tableType }) => {
  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
        <div className="mb-4 rounded-full bg-slate-100 p-5">
          <Film className="h-10 w-10 text-slate-400" />
        </div>

        <h3 className="text-2xl font-bold text-slate-800">
          {tableType === "panelAdmin"
            ? "Aún no hay rentas registradas"
            : "Todavía no tienes rentas registradas"}
        </h3>

        <p className="mt-2 max-w-xl text-slate-500">
          {tableType === "panelAdmin"
            ? "Cuando los usuarios confirmen sus rentas, aparecerán aquí en formato tabla."
            : "Cuando confirmes una renta desde tu lista, aquí podrás ver tu historial."}
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-left">
        <thead>
          <tr
            className={`border-b border-slate-300 ${
              tableType === "panelAdmin"
                ? "bg-[#003b73] text-white"
                : "bg-slate-100 text-slate-700"
            }`}
          >
            {tableType === "panelAdmin" && (
              <th className="p-4 text-sm font-bold">Cliente</th>
            )}
            <th className="p-4 text-sm font-bold">Película</th>
            <th className="p-4 text-sm font-bold">Fecha</th>
            <th className="p-4 text-right text-sm font-bold">Monto</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item) => (
            <tr
              key={item.id}
              className="border-b border-slate-100 hover:bg-slate-50"
            >
              {tableType === "panelAdmin" && (
                <td className="p-4 text-sm font-bold text-[#0057a8]">
                  {item?.userEmail}
                </td>
              )}

              <td className="p-4">
                <div className="flex items-center gap-4">
                  <img
                    src={item?.image}
                    alt={item?.title}
                    className="h-14 w-12 rounded-md object-cover"
                  />
                  <div>
                    <p className="font-bold text-slate-800">{item?.title}</p>
                    <p className="text-xs text-slate-500">Orden #{item?.id}</p>
                  </div>
                </div>
              </td>

              <td className="p-4 text-sm text-slate-500">
                {item?.date ? new Date(item.date).toLocaleString() : "-"}
              </td>

              <td className="p-4 text-right font-black text-[#0057a8]">
                S/. {Number(item?.price || 0).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableGeneral;
