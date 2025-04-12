import {useState} from "react"

const useCounter = (initialValue, initialMax) => {
  const [value, setValue] = useState(initialValue)
  const [maxValue, setMaxValue] = useState(initialMax)

  const setCurrent = (amount) => setValue(amount)
  const setMax = (amount) => setMaxValue(amount)
  const increment = (index, amount) => {
    if (typeof index === "number" && Array.isArray(value)) {
      const valueCopy = [...value]

      if (value[index] < maxValue) {
        valueCopy[index] = valueCopy[index] + 1
        setValue(valueCopy)
      }
    } else {
      value < maxValue &&
        setValue((c) => {
          return c + amount > maxValue ? (c = maxValue) : c + amount
        })
    }
  }
  const decrement = (amount) => value > 0 && setValue((c) => c - amount)
  const byAmount = (customValue) => setValue((c) => c + customValue)
  const toMax = () => setValue((c) => (c = maxValue))
  const reset = (index) => {
    if (typeof index === "number" && Array.isArray(value)) {
      const valueCopy = [...value]
      const filteredValue = valueCopy.filter((_, i) => i !== index)
      setValue(filteredValue)
    } else {
      setValue(initialValue)
    }
  }

  return {
    value,
    maxValue,
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
