import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRouter.js";
import passwordRoutes from "./routes/passwordRouter.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173", // ✅ your frontend origin
    credentials: true, // ✅ allow sending cookies
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.status(200).send("hello user");
});

// routes
app.use("/api/auth", authRoutes);
app.use("/api/password", passwordRoutes);

export default app;