import {useDispatch, useSelector} from "react-redux"

import {updateCharacter} from "../../Store/slices/characterSlice"
import useCounter from "../../hooks/useCounter"

const OtherCategory = ({createdItem, setCreatedItem}) => {
  const dispatch = useDispatch()
  const character = useSelector((store) => store.character.value)
  const counter = useCounter(1, 9999)
  const getcurrentCharacter = JSON.parse(
    localStorage.getItem("currentCharacter")
  )

  const compareId = (store, currentItem) => {
    // check if store item id is the same as the current item

    const findId = store.map((item) => {
      const id = item.find((prop) => prop[0] === "id")?.[1]
      return id
    })

    if (findId.includes(currentItem.name)) {
      return true
    }
    return false
  }

  return (
    <div className="item-creator" key={"other"}>
      <input
        name="name"
        placeholder="Name"
        value={createdItem?.name || ""}
        onChange={(e) => {
          setCreatedItem((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
          }))
        }}
      />
      <textarea
        name="desc"
        className="item-desc"
        placeholder="Description (optional)"
        value={createdItem?.desc || ""}
        disabled={!createdItem.name}
        onChange={(e) => {
          setCreatedItem((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
          }))
        }}
      ></textarea>

      <div className="counter-container">
        <h4 className="h4-title">amount:</h4>
        <label className="item-count">{counter.value}</label>
        <button onClick={() => counter.increment(0, 1)}>+</button>
        <button
          disabled={counter.value <= 1}
          onClick={() => counter.decrement(1)}
        >
          -
        </button>
      </div>

      <div className="add-btn-container">
        <button
          className="add-item"
          disabled={
            compareId(character.gear, createdItem) ||
            compareId(character.inventory, createdItem) ||
            !createdItem.name
          }
          onClick={() => {
            dispatch(
              updateCharacter({
                ...character,
                gear: [
                  ...character.gear,
                  [
                    ...Object.entries(createdItem),
                    ["id", createdItem.name],
                    ["amount", counter.value],
                  ],
                ],
              })
            )
            setCreatedItem({})
          }}
        >
          Equip Item
        </button>
        <button
          className="add-item"
          disabled={
            compareId(character.gear, createdItem) ||
            compareId(character.inventory, createdItem) ||
            !createdItem.name
          }
          onClick={() => {
            dispatch(
              updateCharacter({
                ...character,
                inventory: [
                  ...character.inventory,
                  [
                    ...Object.entries(createdItem),
                    ["linkedCharacter", getcurrentCharacter],
                    ["amount", counter.value],
                    ["id", createdItem.name],
                  ],
                ],
              })
            )
            setCreatedItem({})
          }}
        >
          add to inventory
        </button>
      </div>
    </div>
  )
}
export default OtherCategory
