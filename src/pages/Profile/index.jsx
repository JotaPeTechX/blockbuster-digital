import axios from "axios";
import { useEffect, useState } from "react";
import { Activity } from "lucide-react";
import Swal from "sweetalert2";
import { useAppStore } from "../../store/useAppStore";
import UserCard from "../../components/Profile/UserCard";
import TableGeneral from "../../components/ui/TableGeneral";

const Profile = () => {
  const { apiUrl, user } = useAppStore();
  const [myRents, setMyRents] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user?.email) return;

    const fetchMyRents = async () => {
      setLoading(true);

      try {
        const response = await axios.get(
          `${apiUrl}/rentas?userEmail=${encodeURIComponent(user.email)}`,
        );

        const data = Array.isArray(response?.data) ? response.data : [];

        const sortedData = [...data].sort(
          (a, b) => new Date(b.date) - new Date(a.date),
        );

        setMyRents(sortedData);
      } catch {
        Swal.fire({
          title: "Error",
          text: "No se pudo cargar tu historial",
          icon: "error",
        });
        setMyRents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMyRents();
  }, [apiUrl, user]);

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
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-8">
        <UserCard user={user} />
      </div>

      <div className="rounded-3xl bg-white shadow-md">
        <div className="flex flex-col gap-2 border-b border-slate-200 p-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-black text-slate-900">
              Mi Historial de Rentas
            </h2>
            <p className="text-sm text-slate-500">
              Aquí ves las películas que ya confirmaste
            </p>
          </div>

          <div className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-bold text-slate-700">
            Total: {myRents.length}
          </div>
        </div>

        <TableGeneral data={myRents} tableType="profile" />
      </div>
    </div>
  );
};

export default Profile;
