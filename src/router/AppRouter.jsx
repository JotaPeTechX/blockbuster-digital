import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useAppStore } from "../store/useAppStore";
import Navbar from "../components/layout/Navbar";
import Home from "../pages/Home.jsx";
import Login from "../pages/Login/index.jsx";
import Dashboard from "../pages/Dashboard/index.jsx";
import Profile from "../pages/Profile/index.jsx";
import PanelAdmin from "../pages/panelAdmin/index.jsx";
import Unauthorized from "../pages/Unauthorized.jsx";
import Page404 from "../pages/Page404.jsx";
import MyList from "../pages/MyList/index.jsx";

const AppRouter = () => {
  const { user, hasRole } = useAppStore();

  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />

          <Route
            path="/dashboard"
            element={user ? <Dashboard /> : <Navigate to="/login" replace />}
          />

          <Route
            path="/mi-lista"
            element={user ? <MyList /> : <Navigate to="/login" replace />}
          />

          <Route
            path="/profile"
            element={user ? <Profile /> : <Navigate to="/login" replace />}
          />

          <Route
            path="/panel-admin"
            element={
              user ? (
                hasRole(["admin"]) ? (
                  <PanelAdmin />
                ) : (
                  <Navigate to="/unauthorized" replace />
                )
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/not-found" element={<Page404 />} />
          <Route path="*" element={<Navigate to="/not-found" replace />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default AppRouter;
