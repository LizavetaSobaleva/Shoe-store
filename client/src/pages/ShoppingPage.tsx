import { useEffect, useState } from "react";
import { Table, InputNumber, Button, Typography, Image, Space } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useNavigate } from "react-router-dom";
import type { Product } from "../types";
import { fetchProducts } from "../api/products";
import { useCartStore } from "../store/cartStore";

export default function ShoppingPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const { items, setQuantity } = useCartStore();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetchProducts()
      .then(setProducts)
      .finally(() => setLoading(false));
  }, []);

  const getQuantity = (id: number) =>
    items.find((i) => i.productId === id)?.quantity ?? 0;

  const columns: ColumnsType<Product> = [
    {
      title: "Code",
      dataIndex: "id",
    },
    {
      title: "Image",
      dataIndex: "image",
      render: (img) => (
        <Image src={img} width={80} height={80} alt={img} fallback="" />
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      render: (text, record) => (
        <Button
          type="link"
          onClick={() =>
            navigate(`/product/${record.id}/video`, {
              state: { url: record.url },
            })
          }
        >
          {text}
        </Button>
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      render: (p) => `$${p}`,
    },
    {
      title: "In stock",
      dataIndex: "quantityStock",
    },
    {
      title: "Quantity to buy",
      key: "qty",
      render: (_, record) => (
        <InputNumber
          min={0}
          max={record.quantityStock}
          value={getQuantity(record.id)}
          onChange={(val) =>
            setQuantity(record.id, Number.isFinite(val) ? Number(val) : 0)
          }
        />
      ),
    },
  ];

  return (
    <>
      <Table<Product>
        rowKey="id"
        dataSource={products}
        columns={columns}
        loading={loading}
        pagination={false}
      />

      <Button
        type="primary"
        style={{ marginTop: 16, minWidth: 80 }}
        onClick={() => navigate("/summary")}
      >
        Buy
      </Button>
    </>
  );
}
