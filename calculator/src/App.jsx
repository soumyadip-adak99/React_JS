import { useState } from "react"

function App() {
  const [result, setResult] = useState("")

  const buttons = [
    ["AC", "DEL", "%", "/"],
    ["7", "8", "9", "X"],
    ["4", "5", "6", "-"],
    ["1", "2", "3", "+"],
    ["00", "0", ".", "="],
  ]

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#fa709a] via-[#fa709a] to-[#fee140] font-[Poppins]">
      <div className="calculator p-6 rounded-2xl bg-[#17171a] shadow-2xl">
        <input
          type="text"
          value={result || "0"}
          readOnly
          className="text-white text-right w-full py-3 px-4 rounded-2xl bg-transparent text-2xl outline-none mb-6 font-medium"
        />

        {buttons.map((row, i) => (
          <div key={i} className="flex justify-center mb-2">
            {row.map((btn) => (
              <button
                key={btn}
                className={`w-[60px] h-[65px] m-3 rounded-[20%] text-[20px] cursor-pointer bg-[#353536] text-white transition hover:bg-[#303031] hover:font-bold ${
                  btn === "="
                    ? "bg-orange-500 hover:bg-orange-600"
                    : btn === "AC"
                    ? "bg-red-500 hover:bg-red-600"
                    : btn === "DEL"
                    ? "bg-yellow-500 text-black hover:bg-yellow-600"
                    : ""
                }`}
              >
                {btn}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
