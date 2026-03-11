import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "../../store/useAppStore";
import LoginForm from "../../components/Login/LoginForm";

const Login = () => {
  const navigate = useNavigate();
  const { login, user, isLoading } = useAppStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const success = await login(email, password);

    if (success) {
      navigate("/dashboard", { replace: true });
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/dashboard", { replace: true });
    }
  }, [user, navigate]);

  return (
    <LoginForm
      handleSubmit={handleSubmit}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      isLoading={isLoading}
    />
  );
};

export default Login;
