import {useEffect} from "react"
import useCounter from "../../hooks/useCounter"
import {useDispatch, useSelector} from "react-redux"
import {updateCharacter} from "../../Store/slices/characterSlice"
const Health = ({currentCharacter}) => {
  const character = useSelector((store) => store.character.value)
  const dispatch = useDispatch()
  const counter = useCounter(
    character?.health.currentHP,
    character?.health.maxHP
  )

  // sets health from local storage
  useEffect(() => {
    try {
      counter.setCurrent(character.health.currentHP)
      counter.setMax(character.health.maxHP)
    } catch (error) {
      console.error("failed to get localstorage data for health", error)
    }

    // eslint-disable-next-line
  }, [currentCharacter, character.health.maxHP])

  const handleTempHealth = (tempHealth) => {
    const updateTempHealth = {
      ...character,
      health: {
        ...character.health,
        temp: tempHealth || 0,
      },
    }
    return dispatch(updateCharacter(updateTempHealth))
  }

  const updatedHealth = () => {
    if (currentCharacter?.length) {
      if (counter.value !== character?.Health?.currentHP) {
        const updatedStorage = {
          ...character,
          health: {
            ...character.health,
            currentHP: parseInt(counter.value, 10),
            maxHP: parseInt(counter.maxValue, 10),
          },
        }
        console.log(updatedStorage.health)
        dispatch(updateCharacter(updatedStorage))
      }
    }
  }

  // if health !== local storage health, update local storage with new health
  useEffect(() => {
    if (currentCharacter?.length) {
      if (
        counter.value !== character?.Health?.currentHP ||
        counter.max !== character?.Health?.maxHP
      ) {
        updatedHealth()
      }
    }
    // eslint-disable-next-line
  }, [counter.value, counter.maxValue])

  return (
    <div className="health-wrapper">
      <header>Health</header>

      <div className="temp-health">
        <input
          type="number"
          value={character?.health.temp || 0}
          onChange={(e) => handleTempHealth(parseInt(e.target.value))}
          onFocus={(e) => e.target.select()}
        />
      </div>

      <div className="health-container">
        <button onClick={() => counter.decrement(5)}>{`<<`}</button>
        <button onClick={() => counter.decrement(1)}>{`<`}</button>
        <div className="health">
          <h4>{counter.value} /</h4>
          <input
            type="number"
            value={counter.maxValue}
            onChange={(e) => counter.setMax(parseInt(e.target.value, 10))}
          />
        </div>
        <button onClick={() => counter.increment(0, 1)}>{`>`}</button>
        <button onClick={() => counter.increment(0, 5)}>{`>>`}</button>
      </div>
      <div className="to-max-health">
        <button onClick={() => counter.toMax()}>max</button>
      </div>
    </div>
  )
}
export default Health
