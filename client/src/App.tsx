import { Layout } from "antd";
import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { pageview } from "./analytics";

const { Content } = Layout;

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

export default function App() {
  const location = useLocation();

  useEffect(() => {
    pageview(location.pathname);
  }, [location.pathname]);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Content>
        <Outlet />
      </Content>
    </Layout>
  );
}
