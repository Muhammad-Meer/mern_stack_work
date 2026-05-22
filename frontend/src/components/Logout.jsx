import { logout } from "../api/auth.api";

function Logout() {
  const handleLogout = async () => {
    const res = await logout();
    alert(res.data.message);
  };

  return <button onClick={handleLogout}>Logout</button>;
}

export default Logout;