import { Button, Card, Form, Input, Typography, Space } from "antd";
import { useNavigate } from "react-router-dom";
import { login } from "../api/auth";
import { useAuthStore } from "../store/authStore";
import { loginWithGoogle, loginWithFacebook } from "../firebase";
import { trackEvent } from "../analytics";

const { Title, Text } = Typography;

export default function LoginPage() {
  const navigate = useNavigate();
  const setUser = useAuthStore((s) => s.setUser);

  const onFinish = async (values: any) => {
    try {
      const user = await login(values.email, values.password);
      setUser(user);
      navigate("/", { replace: true });
    } catch (e: any) {
      alert(e.response?.data?.message || "Login failed");
    }
  };

  const handleGoogle = async () => {
    const fbUser = await loginWithGoogle();
    setUser({
      id: null,
      firstName: fbUser.displayName || "Google",
      lastName: "",
      email: fbUser.email || "",
    });
    navigate("/", { replace: true });
  };

  const handleFacebook = async () => {
    const fbUser = await loginWithFacebook();
    setUser({
      id: null,
      firstName: fbUser.displayName || "Facebook",
      lastName: "",
      email: fbUser.email || "",
    });
    navigate("/", { replace: true });
  };

  return (
    <Card style={{ maxWidth: 400, margin: "40px auto" }}>
      <Title level={3}>Login</Title>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Email required" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Password required" }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Login
          </Button>
        </Form.Item>
      </Form>

      <Text>Or sign in with</Text>
      <Space direction="vertical" style={{ width: "100%", marginTop: 8 }}>
        <Button onClick={handleGoogle} block>
          Login with Google
        </Button>
        <Button onClick={handleFacebook} block>
          Login with Facebook
        </Button>
      </Space>
    </Card>
  );
}
