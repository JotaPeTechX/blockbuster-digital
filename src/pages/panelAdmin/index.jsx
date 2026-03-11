import axios from "axios";
import { useEffect, useState } from "react";
import { Activity, DollarSign, ShieldAlert, ClipboardList } from "lucide-react";
import Swal from "sweetalert2";
import { useAppStore } from "../../store/useAppStore";
import TableGeneral from "../../components/ui/TableGeneral";

const PanelAdmin = () => {
  const { apiUrl } = useAppStore();
  const [allRents, setAllRents] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAllRents = async () => {
      setLoading(true);

      try {
        const response = await axios.get(`${apiUrl}/rentas`);
        const data = Array.isArray(response?.data) ? response.data : [];

        const sortedData = [...data].sort(
          (a, b) => new Date(b.date) - new Date(a.date),
        );

        setAllRents(sortedData);
      } catch {
        Swal.fire({
          title: "Error",
          text: "No se pudo cargar el panel administrador",
          icon: "error",
        });
        setAllRents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAllRents();
  }, [apiUrl]);

  const totalAmount = allRents.reduce(
    (acc, item) => acc + Number(item?.price || 0),
    0,
  );

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Activity className="h-20 w-20 animate-spin text-[#0057a8]" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-8 flex items-center gap-3">
        <ShieldAlert className="h-8 w-8 text-rose-500" />
        <h1 className="text-3xl font-black text-slate-900">
          Panel Administrador
        </h1>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="rounded-xl bg-green-100 p-4 text-green-600">
            <DollarSign className="h-8 w-8" />
          </div>

          <div>
            <p className="font-bold text-slate-500">Ingresos Totales</p>
            <p className="text-3xl font-black text-slate-900">
              S/. {totalAmount.toFixed(2)}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="rounded-xl bg-blue-100 p-4 text-blue-600">
            <ClipboardList className="h-8 w-8" />
          </div>

          <div>
            <p className="font-bold text-slate-500">Total de Rentas</p>
            <p className="text-3xl font-black text-slate-900">
              {allRents.length}
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-3xl bg-white shadow-md">
        <div className="border-b border-slate-200 p-6">
          <h2 className="text-2xl font-black text-slate-900">
            Historial General
          </h2>
          <p className="text-sm text-slate-500">
            Las rentas más recientes aparecen primero
          </p>
        </div>

        <TableGeneral data={allRents} tableType="panelAdmin" />
      </div>
    </div>
  );
};

export default PanelAdmin;
