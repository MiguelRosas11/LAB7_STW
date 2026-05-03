import http from "http"
import fs from "fs/promises"
import path from "path"

const PORT = 3000

const server = http.createServer(async (req, res) => {
  if (req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/plain" })
    res.end("Servidor activo")
    return
  }

  if (req.url === "/info") {
    const info = {
      mensaje: "Información del servidor",
      curso: "Sistemas y Tecnologías Web",
      tecnologia: "Node.js"
    }

    res.writeHead(200, { "Content-Type": "application/json" })
    res.end(JSON.stringify(info))
    return
  }

  if (req.url === "/saludo") {
    res.writeHead(200, { "Content-Type": "text/plain" })
    res.end("Hola, bienvenido al servidor")
    return
  }

  if (req.url === "/api/status") {
    const status = {
      ok: true,
      status: "Servidor funcionando correctamente",
      puerto: PORT
    }

    res.writeHead(200, { "Content-Type": "application/json" })
    res.end(JSON.stringify(status))
    return
  }

  if (req.url === "/api/student") {
    const filePath = path.join(process.cwd(), "datos.json")
    const texto = await fs.readFile(filePath, "utf-8")
    const data = JSON.parse(texto)

    res.writeHead(200, { "Content-Type": "application/json" })
    res.end(JSON.stringify(data))
    return
  }

  res.writeHead(404, { "Content-Type": "text/plain" })
  res.end(`Ruta no encontrada: ${req.url}`)
})

server.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
})