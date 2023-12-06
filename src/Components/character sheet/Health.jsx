import {useEffect, useState} from "react"
import useCounter from "../../hooks/useCounter"
import {useDispatch, useSelector} from "react-redux"
import {setCurrentCharacter} from "../../Store/slices/characterSlice"
const Health = ({currentCharacter}) => {
  const counter = useCounter(50, 100)
  const dispatch = useDispatch()
  const [charStorage, setCharStorage] = useState(null)
  const characterStore = useSelector((store) => store.character.value)

  // sets health from characterName from local storage
  useEffect(() => {
    try {
      const storage = JSON.parse(localStorage.getItem(currentCharacter))
      counter.setCurrent(storage.health.currentHP)
      counter.setMax(storage.health.maxHP)
      setCharStorage(storage)
    } catch (error) {
      console.error("failed to get localstorage data for health", error)
    }
  }, [currentCharacter])

  // updates health
  useEffect(() => {
    if (currentCharacter?.length && charStorage) {
      const updatedStorage = {
        ...charStorage,
        health: {currentHP: counter.value, maxHP: counter.max},
      }
      setCurrentCharacter(updatedStorage)
      console.log(updatedStorage)
      console.log(counter)
      localStorage.setItem(currentCharacter, JSON.stringify(updatedStorage))
    }
  }, [counter, charStorage, currentCharacter, dispatch])

  return (
    <div className="health-wrapper">
      <header>Health</header>
      <div className="health-container">
        <button onClick={() => counter.decrement(5)}>{`<<`}</button>
        <button onClick={() => counter.decrement(1)}>{`<`}</button>
        <div className="health">
          <h4>{counter.value} /</h4>

          <input
            type="number"
            value={counter.max}
            onChange={(e) => counter.setMax(e.target.value)}
          />
        </div>
        <button onClick={() => counter.increment()}>{`>`}</button>
        <button onClick={() => counter.toMax()}>max</button>
      </div>
    </div>
  )
}
export default Health
