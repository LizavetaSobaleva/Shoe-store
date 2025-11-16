import { Button, Card, Form, Input, Typography, Space } from "antd";
import { useNavigate } from "react-router-dom";
import { login } from "../api/auth";
import { useAuthStore } from "../store/authStore";
import { loginWithGoogle, loginWithFacebook } from "../firebase";
import { trackEvent } from "../analytics";
import { useEffect } from "react";

const { Title, Text } = Typography;

export default function LoginPage() {
  const navigate = useNavigate();
  const setUser = useAuthStore((s) => s.setUser);

  useEffect(() => {
    trackEvent("view_login", {
      page: "login",
    });
  }, []);

  const onFinish = async (values: any) => {
    try {
      const user = await login(values.email, values.password);

      trackEvent("login_success", {
        method: "password",
      });

      setUser(user);
      navigate("/", { replace: true });
    } catch (e: any) {
      trackEvent("login_error", {
        method: "password",
        error_message: e.response?.data?.message || "unknown_error",
      });

      alert(e.response?.data?.message || "Login failed");
    }
  };

  const handleGoogle = async () => {
    try {
      const fbUser = await loginWithGoogle();

      trackEvent("login_success", {
        method: "google",
      });

      setUser({
        id: null,
        firstName: fbUser.displayName || "Google",
        lastName: "",
        email: fbUser.email || "",
      });
      navigate("/", { replace: true });
    } catch (e: any) {
      trackEvent("login_error", {
        method: "google",
        error_message: e?.message || "google_popup_error",
      });
    }
  };

  const handleFacebook = async () => {
    try {
      const fbUser = await loginWithFacebook();

      trackEvent("login_success", {
        method: "facebook",
      });

      setUser({
        id: null,
        firstName: fbUser.displayName || "Facebook",
        lastName: "",
        email: fbUser.email || "",
      });
      navigate("/", { replace: true });
    } catch (e: any) {
      trackEvent("login_error", {
        method: "facebook",
        error_message: e?.message || "facebook_popup_error",
      });
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
