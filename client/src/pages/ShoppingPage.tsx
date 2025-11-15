import { useState } from "react";
import { Table, Button } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useNavigate } from "react-router-dom";
import type { Product } from "../types";
import { useCartStore } from "../store/cartStore";

export default function ShoppingPage() {
  const [products] = useState<Product[]>([]); // пустая заглушка
  const { items, setQuantity } = useCartStore();
  const navigate = useNavigate();

  const getQuantity = (id: number) =>
    items.find((i) => i.productId === id)?.quantity ?? 0;

  const columns: ColumnsType<Product> = [
    { title: "Code", dataIndex: "id" },
    { title: "Image", dataIndex: "image" },
    { title: "Description", dataIndex: "description" },
    { title: "Price", dataIndex: "price" },
    { title: "In stock", dataIndex: "quantityStock" },
    {
      title: "Quantity to buy",
      key: "qty",
      render: (_, record) => null, // пусто
    },
  ];

  return (
    <>
      <Table<Product>
        rowKey="id"
        dataSource={products}
        columns={columns}
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
