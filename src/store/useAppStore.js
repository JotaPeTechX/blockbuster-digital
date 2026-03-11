import axios from "axios";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import Swal from "sweetalert2";

export const useAppStore = create(
  persist(
    (set, get) => ({
      user: null,
      isLoading: false,
      cart: [],
      apiUrl: "https://7c05eddfd6573f8c.mokky.dev",

      login: async (email, password) => {
        try {
          set({ isLoading: true });

          const response = await axios.get(
            `${get().apiUrl}/users?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`,
          );

          const users = Array.isArray(response?.data) ? response.data : [];

          if (users.length === 1) {
            set({ user: users[0] });

            Swal.fire({
              title: "Bienvenido",
              icon: "success",
              showConfirmButton: false,
              timer: 1200,
            });

            return true;
          }

          set({ user: null });

          Swal.fire({
            title: "Credenciales inválidas",
            text: "Verifica tu correo y contraseña",
            icon: "error",
          });

          return false;
        } catch {
          set({ user: null });

          Swal.fire({
            title: "Error",
            text: "No se pudo iniciar sesión",
            icon: "error",
          });

          return false;
        } finally {
          set({ isLoading: false });
        }
      },

      logout: () => {
        set({
          user: null,
          cart: [],
        });
      },

      hasRole: (roles) => {
        const currentUser = get().user;

        if (!currentUser) return false;

        if (Array.isArray(roles)) {
          return roles.includes(currentUser.role);
        }

        return currentUser.role === roles;
      },

      addToCart: (movie) => {
        set((state) => {
          const movieId = movie?.id ? String(movie.id) : null;
          const movieTitle = movie?.title?.trim().toLowerCase();

          const existingMovie = state.cart.find((item) => {
            const currentId = item?.movie?.id ? String(item.movie.id) : null;
            const currentTitle = item?.movie?.title?.trim().toLowerCase();

            if (movieId && currentId) {
              return currentId === movieId;
            }

            return currentTitle === movieTitle;
          });

          if (existingMovie) {
            Swal.fire({
              title: "Esa película ya está en tu lista",
              icon: "warning",
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 1800,
            });

            return { cart: [...state.cart] };
          }

          Swal.fire({
            title: "Película agregada",
            icon: "success",
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 1800,
          });

          return {
            cart: [
              ...state.cart,
              {
                movie: {
                  id: movie?.id ?? null,
                  title: movie?.title ?? "",
                  description: movie?.description ?? "",
                  category: movie?.category ?? "",
                  type: movie?.type ?? "",
                  price: Number(movie?.price) || 0,
                  image: movie?.image ?? "",
                },
              },
            ],
          };
        });
      },

      removeFromCart: (movieId) =>
        set((state) => ({
          cart: state.cart.filter(
            (item) => String(item.movie?.id) !== String(movieId),
          ),
        })),

      clearCart: () => set({ cart: [] }),

      checkoutRentals: async () => {
        const { cart, user, apiUrl } = get();

        if (!user || cart.length === 0) {
          Swal.fire({
            title: "Tu lista está vacía",
            text: "Agrega al menos una película antes de confirmar.",
            icon: "warning",
          });
          return false;
        }

        try {
          for (let i = 0; i < cart.length; i++) {
            const movie = cart[i].movie;

            await axios.post(`${apiUrl}/rentas`, {
              userId: user?.id ?? null,
              userEmail: user?.email ?? "",
              title: movie.title,
              image: movie.image,
              price: movie.price,
              date: new Date().toISOString(),
            });
          }

          set({ cart: [] });

          Swal.fire({
            title: "Renta confirmada",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          });

          return true;
        } catch {
          Swal.fire({
            title: "Error",
            text: "No se pudo procesar la renta",
            icon: "error",
          });
          return false;
        }
      },
    }),
    {
      name: "blockbuster-digital",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
