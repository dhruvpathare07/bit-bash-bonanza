import { Navigate } from "react-router-dom";

export default function RequirePlayer({ children }) {
  const player = sessionStorage.getItem("playerProfile");

  if (!player) {
    return <Navigate to="/player-entry" replace />;
  }

  return children;
}
