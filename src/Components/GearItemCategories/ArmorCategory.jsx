import {useDispatch, useSelector} from "react-redux"

import {useMemo, useState} from "react"
import Select from "react-select"

import {armorStyles} from "../utilities"
import {updateCharacter} from "../../Store/slices/characterSlice"
import useCounter from "../../hooks/useCounter"

const ArmorCategory = ({createdItem, setCreatedItem}) => {
  const [resetInput, setResetInput] = useState(false)
  const character = useSelector((store) => store.character.value)
  const counter = useCounter(1, 9999)
  const dispatch = useDispatch()
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
  const isValid = useMemo(() => {
    return !!(
      createdItem?.name &&
      createdItem?.category &&
      createdItem?.armor_Class
    )
  }, [createdItem])

  const handleChange = (e) => {
    setCreatedItem((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const armorOptions = [
    {value: "Light", label: "Light"},
    {value: "Medium", label: "Medium"},
    {value: "Heavy", label: "Heavy"},
  ]

  return (
    <div className="item-creator" key={"armor"}>
      <input
        onChange={(e) => {
          handleChange(e)
        }}
        name="name"
        id="item-name"
        placeholder="Name"
        value={createdItem?.name || ""}
      />

      <Select
        onChange={(e) => {
          setCreatedItem((prev) => ({
            ...prev,
            category: e.value,
          }))
        }}
        name="armor_category"
        id="item-category"
        placeholder="light, medium, heavy"
        key={resetInput ? 1 : 0}
        options={armorOptions}
        defaultValue={createdItem?.category || ""}
        isSearchable={false}
        components={{
          DropdownIndicator: () => null,
          IndicatorSeparator: () => null,
        }}
        styles={armorStyles}
        isDisabled={!createdItem?.name}
      />

      <input
        onChange={(e) => {
          handleChange(e)
        }}
        name="armor_Class"
        id="armor-class"
        placeholder="AC: 12 + dex"
        value={createdItem?.armor_Class || ""}
        disabled={!createdItem.category}
      />
      <textarea
        onChange={(e) => {
          handleChange(e)
        }}
        name="desc"
        className="item-desc"
        placeholder="Description"
        value={createdItem?.desc || ""}
        disabled={!createdItem.name}
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
            !isValid
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
            setResetInput(!resetInput)
          }}
        >
          Equip Item
        </button>

        <button
          className="add-item"
          disabled={
            compareId(character.inventory, createdItem) ||
            compareId(character.gear, createdItem) ||
            !isValid
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
            setResetInput(!resetInput)
          }}
        >
          add to inventory
        </button>
      </div>
    </div>
  )
}
export default ArmorCategory
