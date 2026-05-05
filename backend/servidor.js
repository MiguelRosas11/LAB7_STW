import express from "express"
import fs from "fs/promises"
import path from "path"

const app = express()
const PORT = 3000

app.get("/", (req, res) => {
  res.send("Servidor activo")
})

app.get("/info", (req, res) => {
  res.json({
    mensaje: "Información del servidor",
    curso: "Sistemas y Tecnologías Web",
    tecnologia: "Node.js"
  })
})

app.get("/saludo", (req, res) => {
  res.send("Hola, bienvenido al servidor")
})

app.get("/api/status", (req, res) => {
  res.json({
    ok: true,
    status: "Servidor funcionando correctamente",
    puerto: PORT
  })
})

app.get("/api/student", async (req, res) => {
  const filePath = path.join(process.cwd(), "datos.json")
  const texto = await fs.readFile(filePath, "utf-8")
  const data = JSON.parse(texto)

  res.json(data)
})

// 404
app.use((req, res) => {
  res.status(404).send(`Ruta no encontrada: ${req.url}`)
})

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
})