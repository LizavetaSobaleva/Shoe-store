import { useLocation, useNavigate } from "react-router-dom";
import { Result, Button } from "antd";

export default function ConfirmationPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const total = (location.state as { total?: number } | null)?.total ?? 0;

  return (
    <Result
      status="success"
      title="Purchase completed!"
      subTitle={`Total amount paid: $${total}`}
      extra={[
        <Button type="primary" key="shop" onClick={() => navigate("/")}>
          Back to shopping
        </Button>,
      ]}
    />
  );
}
