import { Button, Card, Form, Input, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { login } from "../api/auth";
import { useAuthStore } from "../store/authStore";

const { Title } = Typography;

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
    </Card>
  );
}
