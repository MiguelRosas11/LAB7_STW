import { useState } from "react"
import "./App.css"

function App() {
  const [input, setInput] = useState("")

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

  const buttons = [
    "C", "⌫", "/", "*",
    "7", "8", "9", "-",
    "4", "5", "6", "+",
    "1", "2", "3", ".",
    "0", "00", "="
  ]

  return (
    <main className="page">
      <section className="calculator">
        <h1>Calculadora React</h1>

        <div className="display">
          {input || "0"}
        </div>

        <div className="buttons">
          {buttons.map((button) => (
            <button
              key={button}
              onClick={() => handleClick(button)}
              className={
                button === "="
                  ? "equals"
                  : ["+", "-", "*", "/"].includes(button)
                  ? "operator"
                  : button === "C" || button === "⌫"
                  ? "clear"
                  : ""
              }
            >
              {button}
            </button>
          ))}
        </div>
      </section>
    </main>
  )
}

export default App