import { Activity, Copy, Shield, User } from "lucide-react";

const demoUsers = [
  {
    label: "Cliente",
    email: "jose@blockbuster.com",
    password: "123456",
    icon: User,
  },
  {
    label: "Admin",
    email: "admin@blockbuster.com",
    password: "123456",
    icon: Shield,
  },
];

const LoginForm = ({
  handleSubmit,
  email,
  setEmail,
  password,
  setPassword,
  isLoading,
}) => {
  const fillCredentials = (selectedEmail, selectedPassword) => {
    setEmail(selectedEmail);
    setPassword(selectedPassword);
  };

  return (
    <div className="flex min-h-[calc(100vh-64px)] items-center justify-center px-4 py-10">
      <div className="w-full max-w-md space-y-4">
        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl"
        >
          <h1 className="mb-2 text-3xl font-black text-slate-900">
            Iniciar sesión
          </h1>

          <p className="mb-6 text-sm text-slate-500">
            Accede a tu cuenta para rentar películas
          </p>

          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700">
                Correo
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-[#0057a8]"
                placeholder="correo@ejemplo.com"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700">
                Contraseña
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-[#0057a8]"
                placeholder="******"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="mt-6 flex h-12 w-full items-center justify-center rounded-xl bg-[#003b73] font-bold text-white transition hover:bg-[#0057a8] disabled:bg-slate-400"
          >
            {isLoading ? (
              <Activity className="h-5 w-5 animate-spin" />
            ) : (
              "Entrar"
            )}
          </button>
        </form>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="mb-3 text-sm font-bold text-slate-700">
            Usuarios de prueba
          </p>

          <div className="space-y-3">
            {demoUsers.map((demoUser) => {
              const Icon = demoUser.icon;

              return (
                <div
                  key={demoUser.email}
                  className="rounded-xl border border-slate-100 bg-slate-50 p-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div className="rounded-lg bg-[#003b73]/10 p-2 text-[#003b73]">
                        <Icon className="h-4 w-4" />
                      </div>

                      <div className="text-sm">
                        <p className="font-bold text-slate-800">
                          {demoUser.label}
                        </p>
                        <p className="text-slate-600">{demoUser.email}</p>
                        <p className="text-slate-500">
                          Clave: {demoUser.password}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        fillCredentials(demoUser.email, demoUser.password)
                      }
                      className="rounded-lg bg-[#ffd100] p-2 text-[#003b73] transition hover:opacity-90"
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
