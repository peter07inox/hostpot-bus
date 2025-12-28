import express from "express";
import cors from "cors";
import helmet from "helmet";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json({ limit: "2mb" }));

// Ruta para probar que el servidor está vivo
app.get("/", (req, res) => {
  res.json({ ok: true, message: "Backend WiFi Bus activo ✅" });
});

// Ruta de prueba para cuando el portal cautivo mande el plan
app.get("/buy", (req, res) => {
  const plan = req.query.plan || "2H";
  const mac = req.query.mac || "unknown";

  res.json({
    ok: true,
    plan,
    mac,
    message: "Este endpoint luego creará la transacción en Wompi"
  });
});

// Webhook de Wompi (aquí llega el pago aprobado)
app.post("/wompi/webhook", (req, res) => {
  console.log("✅ Webhook recibido:", JSON.stringify(req.body, null, 2));
  res.sendStatus(200);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server corriendo en puerto ${PORT}`));
