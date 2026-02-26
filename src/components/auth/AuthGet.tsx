import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Loader from "../ui/Loader";

export default function AuthGate({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();

  // wait for auth restore
  if (loading) return <Loader />;

  // not logged in → block whole app
  if (!user) return <Navigate to="/login" replace />;

  // logged in → allow
  return <>{children}</>;
}