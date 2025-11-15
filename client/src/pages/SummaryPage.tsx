import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Typography, Button, Alert, Space } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { Product } from "../types";
import { fetchProducts } from "../api/products";
import { useCartStore } from "../store/cartStore";
import { completePurchase } from "../api/purchase";

const { Title, Text } = Typography;

interface SummaryRow {
  id: number;
  description: string;
  price: number;
  quantity: number;
  subtotal: number;
}

export default function SummaryPage() {
  const navigate = useNavigate();
  const { items, reset } = useCartStore();
  const [rows, setRows] = useState<SummaryRow[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function buildSummary() {
      const products = await fetchProducts();
      const errs: string[] = [];
      const r: SummaryRow[] = [];

      items.forEach((item) => {
        const p = products.find((x) => x.id === item.productId);
        if (!p) return;
        if (!Number.isInteger(item.quantity) || item.quantity < 0) {
          errs.push(`Invalid quantity for product ${p.description}`);
        } else if (item.quantity > p.quantityStock) {
          errs.push(
            `Not enough stock for ${p.description}. Available: ${p.quantityStock}`
          );
        } else if (item.quantity > 0) {
          r.push({
            id: p.id,
            description: p.description,
            price: p.price,
            quantity: item.quantity,
            subtotal: p.price * item.quantity,
          });
        }
      });

      setRows(r);
      setErrors(errs);
    }
    buildSummary();
  }, [items]);

  const columns: ColumnsType<SummaryRow> = [
    { title: "Product", dataIndex: "description" },
    { title: "Price", dataIndex: "price", render: (p) => `$${p}` },
    { title: "Quantity", dataIndex: "quantity" },
    { title: "Subtotal", dataIndex: "subtotal", render: (s) => `$${s}` },
  ];

  const total = rows.reduce((acc, r) => acc + r.subtotal, 0);

  const handleComplete = async () => {
    setLoading(true);
    try {
      await completePurchase(
        rows.map((r) => ({ id: r.id, quantity: r.quantity }))
      );
      reset();
      navigate("/confirmation", { state: { total } });
    } catch (e: any) {
      const apiErrors: string[] = e.response?.data?.errors || [
        e.response?.data?.message || "Purchase failed",
      ];
      setErrors(apiErrors);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Title level={3}>Order Summary</Title>

      {errors.length > 0 && (
        <Space direction="vertical" style={{ width: "100%", marginBottom: 16 }}>
          {errors.map((er) => (
            <Alert key={er} type="error" message={er} />
          ))}
        </Space>
      )}

      <Table
        rowKey="id"
        dataSource={rows}
        columns={columns}
        pagination={false}
      />

      <Text strong style={{ display: "block", marginTop: 16 }}>
        Total: ${total}
      </Text>

      <Space style={{ marginTop: 16 }}>
        <Button onClick={() => navigate(-1)}>Back</Button>
        <Button
          type="primary"
          onClick={handleComplete}
          disabled={rows.length === 0 || errors.length > 0}
          loading={loading}
        >
          Complete the purchase
        </Button>
      </Space>
    </div>
  );
}
