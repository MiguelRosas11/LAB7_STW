# LAB7 – Express Server and React Calculator

This project was developed for the course **Tecnologías y Sistemas Web** and corresponds to **Laboratory 7**.

The objective of this laboratory was to migrate the server functionality developed in Laboratory 6 from the native Node.js HTTP module to Express, while also building a basic calculator using React.

---

## Project Description

This project is divided into two main parts:

- An Express server that replaces the native `http` implementation from the previous laboratory
- A React calculator built to practice component structure, state management, and interface customization

The backend keeps the same routes and functionality from the previous lab, but now uses Express to make the code cleaner, easier to read, and easier to maintain.

The frontend consists of a functional calculator capable of performing basic arithmetic operations.

---

## Part 1 – Migration from Node.js HTTP to Express

In Laboratory 6, the server was built using the native `http` module included in Node.js. This required manually checking the requested route with `req.url`, manually setting response headers, and manually ending each response.

For Laboratory 7, the server was adapted to use Express. Express is a framework built on top of Node.js that simplifies server creation, routing, and response handling.

---

## Differences Between Node.js and Express

### Node.js with HTTP Module

Node.js is a JavaScript runtime environment. It allows JavaScript to run outside the browser and includes native modules such as `http`, `fs`, and `path`.

When using the native `http` module, the developer has to manually handle most of the server logic.

For example:

```js
if (req.url === "/info") {
  const info = {
    mensaje: "Información del servidor",
    curso: "Sistemas y Tecnologías Web",
    tecnologia: "Node.js"
  }

  res.writeHead(200, { "Content-Type": "application/json" })
  res.end(JSON.stringify(info))
}
```

In this approach, each route has to be checked manually. Also, the response headers and response format must be written explicitly.

This works for small projects, but as the application grows, the code can become harder to organize and maintain.

---

### Express

Express is a framework for Node.js. It does not replace Node.js, but instead works on top of it to simplify the development of web servers and APIs.

With Express, routes can be defined directly using methods such as `app.get()`, `app.post()`, `app.put()`, and `app.delete()`.

For example:

```js
app.get("/info", (req, res) => {
  res.json({
    mensaje: "Información del servidor",
    curso: "Sistemas y Tecnologías Web",
    tecnologia: "Node.js"
  })
})
```

This version is shorter, cleaner, and easier to understand. Express automatically handles many details, such as setting the correct response headers when using `res.json()`.

---

## Main Code Changes

The main changes made during the migration were:

- `http.createServer()` was replaced with `express()`
- Manual route validation using `req.url` was replaced with Express routes such as `app.get()`
- `res.writeHead()` and `res.end()` were replaced with `res.send()` and `res.json()`
- The 404 response was handled using Express middleware
- The file reading logic using `fs/promises` was kept because it was still necessary for reading `datos.json`

---

## Comparison of Previous and Updated Code

### Before: Node.js HTTP

```js
if (req.url === "/saludo") {
  res.writeHead(200, { "Content-Type": "text/plain" })
  res.end("Hola, bienvenido al servidor")
  return
}
```

### After: Express

```js
app.get("/saludo", (req, res) => {
  res.send("Hola, bienvenido al servidor")
})
```

The Express version is more direct because the route and the response are clearly separated and easier to read.

---

## Available Routes

| Route | Method | Description |
|------|--------|------------|
| `/` | GET | Returns "Servidor activo" |
| `/info` | GET | Returns server information in JSON |
| `/saludo` | GET | Returns a greeting message |
| `/api/status` | GET | Returns server status in JSON |
| `/api/student` | GET | Returns data from `datos.json` |
| Any other route | GET | Returns a 404 message |

---

## File Handling

The server reads data from a local JSON file:

- `datos.json`

Example content:

```json
{
  "nombre": "Miguel",
  "curso": "Sistemas y Tecnologías Web",
  "carnet": "241274"
}
```

The route `/api/student` reads the file using `fs/promises`, parses the JSON content, and returns it as a response.

---

## Part 2 – React Calculator

The second part of the laboratory consisted of creating a basic calculator using React.

The goal of this section was to understand how a React project is structured and how components can be used to separate the interface into smaller and more manageable parts.

The calculator was created using React and Vite.

---

## Calculator Description

The calculator allows users to perform the following basic operations:

- Addition
- Subtraction
- Multiplication
- Division

The user can click the calculator buttons to build an expression, clear the input, delete characters, and calculate the result.

---

## React Structure

The calculator uses a component-based structure.

The main logic is handled in the `App` component. This component stores the current input and updates it whenever the user presses a button.

React state is used to make the calculator dynamic.

Example:

```js
const [input, setInput] = useState("")
```

This state stores the current expression or result shown on the calculator display.

---

## Calculator Logic

The calculator checks which button the user clicked.

If the user clicks `C`, the input is cleared.

If the user clicks the delete button, the last character is removed.

If the user clicks `=`, the expression is evaluated and the result is displayed.

If the user clicks a number or operator, the value is added to the current input.

Example:

```js
const handleClick = (value) => {
  if (value === "C") {
    setInput("")
    return
  }

  if (value === "⌫") {
    setInput(input.slice(0, -1))
    return
  }

  if (value === "=") {
    try {
      const result = Function(`"use strict"; return (${input})`)()
      setInput(result.toString())
    } catch {
      setInput("Error")
    }
    return
  }

  if (input === "Error") {
    setInput(value)
  } else {
    setInput(input + value)
  }
}
```

This logic allows the calculator to react to user input and update the screen immediately.

---

## Interface Customization

The calculator interface was customized using CSS.

The design includes:

- A centered calculator layout
- A display area for the current input and result
- Buttons organized with CSS grid
- Custom colors
- Rounded borders
- Hover effects
- Different styles for operators, clear buttons, and the equals button

These changes were made so the calculator would not look exactly like the tutorial and would have a more personal visual style.

---

## How to Run Locally

### Backend

1. Navigate to the backend folder:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Run the server:

```bash
node servidor.js
```

4. Open the browser and test:

```txt
http://localhost:3000
```

---

### Frontend

1. Navigate to the frontend folder:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open the browser using the local Vite URL:

```txt
http://localhost:5174
```

The port may change depending on availability. If port `5173` is already in use, Vite automatically uses another available port.

---

## Testing the Server

The following backend routes were tested:

- `/`
- `/info`
- `/saludo`
- `/api/status`
- `/api/student`
- Invalid routes such as `/test` or `/hola`

All routes returned the expected responses.

---

## Testing the Calculator

The calculator was tested with the following operations:

- Addition
- Subtraction
- Multiplication
- Division
- Clearing input
- Deleting input
- Handling invalid expressions

The calculator worked correctly and displayed the expected results.

---

## Technologies Used

- Node.js
- Express
- React
- Vite
- JavaScript
- CSS
- File System module
- Path module

---

## Author

- Student: Miguel Rosas – 241274
- Course: Tecnologías y Sistemas Web
- Year: 2026

---

## Video
https://www.youtube.com/watch?v=YkCa4dUsBbo
