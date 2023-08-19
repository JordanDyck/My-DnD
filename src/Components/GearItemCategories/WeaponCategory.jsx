import {useDispatch} from "react-redux"
import {v4 as uuid} from "uuid"
import {useMemo, useState} from "react"
import Select from "react-select"

import {addInventory} from "../../Store/slices/inventorySlice"
import {addGear} from "../../Store/slices/gearSlice"
import {damageTypes} from "../utilities"

const WeaponCategory = ({createdItem, setCreatedItem}) => {
  const dispatch = useDispatch()
  const [resetInput, setResetInput] = useState(false)

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
          // value={createdItem?.damage?.damage_type?.name || damageTypes[0]}
          components={{
            DropdownIndicator: () => null,
            IndicatorSeparator: () => null,
          }}
          styles={{
            control: (base, {isDisabled}) => ({
              ...base,
              border: "none",
              borderBottom: "2px solid",
              borderRadius: "0",
              textAlign: "center",
              maxWidth: "137px",
              minWidth: "115px",
              height: "32px",
              minHeight: "32px",
              fontSize: "14px",
              top: "-5px",
              backgroundColor: isDisabled ? "transparent" : "transparent",
            }),
            menu: (base) => ({
              ...base,
              width: "150px",
            }),
          }}
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
          disabled={!createdItem.damage?.damage_type}
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
        disabled={!createdItem?.damage?.damage_type}
      />
      <div className="add-btn-container">
        {/* add item to gear tab */}
        <button
          className="add-item"
          disabled={!isValid}
          onClick={() => {
            dispatch(addGear([...Object.entries(createdItem), ["id", uuid()]]))
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
              addInventory([...Object.entries(createdItem), ["id", uuid()]])
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
