import {useEffect, useState} from "react"
import useCounter from "../../hooks/useCounter"
import {useDispatch, useSelector} from "react-redux"
import {updateCharacter} from "../../Store/slices/characterSlice"
const Health = ({currentCharacter}) => {
  const [toggleNewMax, setToggleNewMax] = useState(false)
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
      <h4>temp hp</h4>
      <div className="temp-health">
        <input
          type="number"
          value={character?.health.temp || 0}
          onChange={(e) => handleTempHealth(parseInt(e.target.value))}
          onFocus={(e) => e.target.select()}
        />
      </div>
      <h4>Health</h4>

      <div className="health-container">
        {/* decrement buttons */}
        <button
          style={{backgroundColor: "#ffa6a6"}}
          onClick={() => counter.decrement(5)}
        >{`<<`}</button>
        <button
          style={{backgroundColor: "#ffa6a6"}}
          onClick={() => counter.decrement(1)}
        >{`<`}</button>

        <div className="health">
          {/* health display */}
          {toggleNewMax ? (
            <input
              type="number"
              defaultValue={counter.maxValue}
              onChange={(e) => {
                counter.setMax(parseInt(e.target.value, 10))
              }}
            />
          ) : (
            <h4>
              {counter.value}/{counter.maxValue}
            </h4>
          )}
        </div>

        {/* increment buttons */}
        <button
          style={{backgroundColor: "#a7ffa7"}}
          onClick={() => counter.increment(0, 1)}
        >{`>`}</button>
        <button
          style={{backgroundColor: "#a7ffa7"}}
          onClick={() => counter.increment(0, 5)}
        >{`>>`}</button>
      </div>

      <div className="to-max-health">
        {!toggleNewMax && <button onClick={() => counter.toMax()}>max</button>}
        <button
          onClick={() => setToggleNewMax((toggleNewMax) => !toggleNewMax)}
        >
          {toggleNewMax ? "save" : "set max"}
        </button>
      </div>
    </div>
  )
}
export default Health
