import {useDispatch, useSelector} from "react-redux"
import {useMemo, useState} from "react"
import Select from "react-select"

import {damageTypes, weaponStyles} from "../utilities"
import {updateCharacter} from "../../Store/slices/characterSlice"
import useCounter from "../../hooks/useCounter"

const WeaponCategory = ({createdItem, setCreatedItem}) => {
  const character = useSelector((store) => store.character.value)
  const dispatch = useDispatch()
  const counter = useCounter(1, 9999)
  const [resetInput, setResetInput] = useState(false)
  const getcurrentCharacter = JSON.parse(
    localStorage.getItem("currentCharacter")
  )

  const isValid = useMemo(() => {
    return !!(
      createdItem?.name &&
      createdItem?.damage?.damage_dice &&
      createdItem?.damage?.damage_type?.name
    )
  }, [createdItem])

  return (
    <div className="item-creator" key={"weapon"}>
      <input
        name="name"
        id="item-name"
        placeholder="Name"
        value={createdItem?.name || ""}
        onChange={(e) => {
          setCreatedItem((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
          }))
        }}
      />
      <div className="dmg-container">
        <input
          onChange={(e) => {
            setCreatedItem((prev) => ({
              ...prev,
              damage: {
                ...prev?.damage,
                [e.target.name]: e.target.value,
              },
            }))
          }}
          name="damage_dice"
          id="item-damage-dice"
          placeholder="damage: 1 d6"
          value={createdItem?.damage?.damage_dice || ""}
          disabled={!createdItem.name}
        />
        <Select
          onChange={(e) => {
            setCreatedItem((prev) => ({
              ...prev,
              damage: {
                ...prev?.damage,
                damage_type: {
                  name: e.value,
                },
              },
            }))
          }}
          name="damage_type"
          id="item-damage-type"
          placeholder="type: slash"
          key={resetInput ? 1 : 0}
          options={damageTypes}
          defaultValue={createdItem?.damage?.damage_type?.name || ""}
          components={{
            DropdownIndicator: () => null,
            IndicatorSeparator: () => null,
          }}
          styles={weaponStyles}
          isDisabled={!createdItem.damage?.damage_dice}
        />
      </div>

      <div className="range-container">
        <input
          onChange={(e) => {
            setCreatedItem((prev) => ({
              ...prev,
              range: {
                ...prev?.range,
                [e.target.name]: e.target.value,
              },
            }))
          }}
          name="normal"
          id="item-range-normal"
          placeholder="range: 15ft"
          type="number"
          value={createdItem?.range?.normal || ""}
          disabled={!createdItem.damage?.damage_type?.name}
        />
        <input
          onChange={(e) => {
            setCreatedItem((prev) => ({
              ...prev,
              range: {
                ...prev?.range,
                [e.target.name]: e.target.value,
              },
            }))
          }}
          name="long"
          id="item-range-long"
          placeholder="range: 30ft"
          type="number"
          value={createdItem?.range?.long || ""}
          disabled={!createdItem.range?.normal}
        />
      </div>

      <textarea
        onChange={(e) => {
          setCreatedItem((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
          }))
        }}
        name="desc"
        className="item-desc"
        placeholder="Description"
        value={createdItem?.desc || ""}
        disabled={!createdItem?.damage?.damage_type?.name}
      />
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
        {/* add item to gear tab */}
        <button
          className="add-item"
          disabled={!isValid}
          onClick={() => {
            dispatch(
              updateCharacter({
                ...character,
                gear: [
                  ...character.gear,
                  [
                    ...Object.entries(createdItem),
                    ["amount", counter.value],
                    ["id", `gear_${createdItem.name}`],
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
        {/* add item to inventory */}
        <button
          className="add-item"
          disabled={!isValid}
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
            setResetInput(!resetInput)
          }}
        >
          add to inventory
        </button>
      </div>
    </div>
  )
}
export default WeaponCategory
