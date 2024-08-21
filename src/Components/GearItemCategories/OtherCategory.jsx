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
        placeholder="Description"
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
        <button onClick={() => counter.increment()}>+</button>
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
          disabled={!createdItem.name}
          onClick={() => {
            dispatch(
              updateCharacter({
                ...character,
                gear: [
                  ...character.gear,
                  [
                    ...Object.entries(createdItem),
                    ["id", `gear_${createdItem.name}`],
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
          disabled={!createdItem.name}
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
                    ["id", `inventory_${createdItem.name}`],
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
