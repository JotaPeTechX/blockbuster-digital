import { Mail, Shield, User } from "lucide-react";

const UserCard = ({ user }) => {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg">
      <div className="h-32 bg-gradient-to-r from-[#003b73] to-[#0057a8]"></div>

      <div className="px-8 pb-8">
        <div className="-mt-16 mb-8 flex items-end gap-4">
          <div className="flex h-32 w-32 items-center justify-center rounded-full border-4 border-white bg-slate-100 shadow-md">
            <User className="h-12 w-12 text-slate-500" />
          </div>

          <div>
            <h1 className="text-3xl font-black text-slate-900">{user?.name}</h1>
            <p className="mt-1 flex items-center gap-2 text-slate-500">
              <Mail className="h-4 w-4" />
              {user?.email}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex items-center gap-4 rounded-xl border border-slate-100 bg-slate-50 p-4">
            <div className="rounded-lg bg-[#ffd100] p-3 text-[#003b73]">
              <Shield className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Rol
              </p>
              <p className="font-bold capitalize text-slate-800">
                {user?.role}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-xl border border-slate-100 bg-slate-50 p-4">
            <div className="rounded-lg bg-[#dbeafe] p-3 text-[#0057a8]">
              <User className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                ID
              </p>
              <p className="font-bold text-slate-800">#{user?.id}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
