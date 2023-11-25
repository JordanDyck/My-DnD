import {useEffect, useState} from "react"
import useCounter from "../../hooks/useCounter"
import {useDispatch} from "react-redux"
import {setCurrentCharacter} from "../../Store/slices/characterSlice"
const Health = ({currentCharacter}) => {
  const counter = useCounter(50, 100)
  const dispatch = useDispatch()
  const [charStorage, setCharStorage] = useState(null)

  // sets health from characterName from local storage
  useEffect(() => {
    try {
      const storage = JSON.parse(localStorage.getItem(currentCharacter))
      counter.setCurrent(storage.health.currentHP)
      counter.setMax(storage.health.maxHP)
      setCharStorage(storage)
    } catch (error) {
      console.error(error)
    }
  }, [currentCharacter])

  // updates health
  useEffect(() => {
    if (currentCharacter?.length && charStorage) {
      const updatedStorage = {
        ...charStorage,
        health: {currentHP: counter.value, maxHP: counter.max},
      }
      dispatch(setCurrentCharacter(updatedStorage))
    }
  }, [counter.value, counter.max, charStorage, currentCharacter])

  return (
    <div className="health-container">
      <header>Health</header>
      <div className="health">
        <button onClick={() => counter.decrement(5)}>{`<<`}</button>
        <button onClick={() => counter.decrement(1)}>{`<`}</button>
        <h4>
          {counter.value} / {counter.max}
        </h4>
        <button onClick={() => counter.increment()}>{`>`}</button>
        <button onClick={() => counter.toMax()}>max</button>
      </div>
    </div>
  )
}
export default Health
