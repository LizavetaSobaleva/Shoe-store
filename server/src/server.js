import express from "express";
import cors from "cors";
import { db } from "./db.js";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(
  cors({
    origin: ["http://localhost:5173", "https://nielsen-shoe-store.netlify.app"],
  })
);

app.use(express.json());

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  db.get(
    `SELECT id, first_name, last_name, email
     FROM users
     WHERE email = ? AND password = ?`,
    [email, password],
    (err, row) => {
      if (err) return res.status(500).json({ message: "DB error" });
      if (!row) return res.status(401).json({ message: "Invalid credentials" });

      res.json({
        id: row.id,
        firstName: row.first_name,
        lastName: row.last_name,
        email: row.email,
      });
    }
  );
});

app.get("/api/products", (req, res) => {
  db.all(
    `SELECT id, description, price, quantity_stock, image, url FROM products`,
    [],
    (err, rows) => {
      if (err) return res.status(500).json({ message: "DB error" });

      res.json(
        rows.map((p) => ({
          id: p.id,
          description: p.description,
          price: p.price,
          quantityStock: p.quantity_stock,
          image: p.image,
          url: p.url,
        }))
      );
    }
  );
});

app.post("/api/purchase/complete", (req, res) => {
  const { items } = req.body;

  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ message: "Invalid payload" });
  }

  const errors = [];

  db.serialize(() => {
    db.all(
      `SELECT id, quantity_stock FROM products WHERE id IN (${items
        .map(() => "?")
        .join(",")})`,
      items.map((i) => i.id),
      (err, rows) => {
        if (err) return res.status(500).json({ message: "DB error" });

        const stock = new Map(rows.map((r) => [r.id, r.quantity_stock]));

        for (const item of items) {
          const available = stock.get(item.id);
          if (available == null || item.quantity > available) {
            errors.push(
              `Product ${item.id}: requested ${item.quantity}, available ${
                available ?? 0
              }`
            );
          }
        }

        if (errors.length > 0) {
          return res.status(400).json({ errors });
        }

        const stmt = db.prepare(
          `UPDATE products SET quantity_stock = quantity_stock - ? WHERE id = ?`
        );

        items.forEach((item) => {
          stmt.run(item.quantity, item.id);
        });

        stmt.finalize((err2) => {
          if (err2) return res.status(500).json({ message: "DB error" });

          return res.json({ success: true });
        });
      }
    );
  });
});

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
