import {useState} from "react"

const useCounter = (initialValue, initialMax) => {
  const [value, setValue] = useState(initialValue)
  const [maxValue, setMaxValue] = useState(initialMax)

  const setCurrent = (amount) => setValue(amount)
  const setMax = (amount) => setMaxValue(amount)
  const increment = () => value < maxValue && setValue((c) => c + 1)
  const decrement = (amount) => value > 0 && setValue((c) => c - amount)
  const byAmount = (customValue) => setValue((c) => c + customValue)
  const toMax = () => setValue((c) => (c = maxValue))
  const reset = () => setValue(initialValue)

  return {
    value: parseInt(value, 10),
    max: parseInt(maxValue, 10),
    setCurrent,
    setMax,
    increment,
    decrement,
    byAmount,
    toMax,
    reset,
  }
}

export default useCounter
