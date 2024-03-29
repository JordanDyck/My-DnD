import {useDispatch} from "react-redux"
import {v4 as uuid} from "uuid"
import {useMemo, useState} from "react"
import Select from "react-select"

import {addInventory} from "../../Store/slices/inventorySlice"
import {addGear} from "../../Store/slices/gearSlice"
import {armorStyles} from "../utilities"

const ArmorCategory = ({createdItem, setCreatedItem}) => {
  const [resetInput, setResetInput] = useState(false)

  const dispatch = useDispatch()

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

      <div className="add-btn-container">
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
export default ArmorCategory
