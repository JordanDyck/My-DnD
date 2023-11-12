import {useState} from "react"

const useCounter = (initialValue, maxValue) => {
  const [value, setValue] = useState(initialValue)

  const increment = () => value < maxValue && setValue((c) => c + 1)
  const decrement = () => value > 0 && setValue((c) => c - 1)
  const reset = () => setValue(initialValue)

  return {value, increment, decrement, reset}
}

export default useCounter
