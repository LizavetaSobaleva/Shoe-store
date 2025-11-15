import { Button, Typography, Image } from "antd";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";

const { Text } = Typography;

export function Navbar() {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const navigate = useNavigate();

  if (!user) return null;

  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
        backdropFilter: "blur(12px)",
        background: "rgba(255, 255, 255, 0.75)",
        padding: "12px 24px",
        borderBottom: "1px solid rgba(255,255,255,0.4)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <Image src="/logo.png" width={40} alt="Logo" preview={false} />
        <Text strong style={{ fontSize: 20 }}>
          Shoe Store
        </Text>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 40 }}>
        <Text>
          Welcome, {user?.firstName} {user?.lastName}
          {/* ({user?.email}) */}
        </Text>

        <Button
          style={{ height: 36 }}
          onClick={() => {
            logout();
            navigate("/login");
          }}
        >
          Logout
        </Button>
      </div>
    </div>
  );
}
