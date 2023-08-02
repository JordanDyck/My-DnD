import {useDispatch} from "react-redux"
import {v4 as uuid} from "uuid"
import {useMemo} from "react"

import {setInventory} from "../../Store/slices/inventorySlice"
import {addGear} from "../../Store/slices/gearSlice"

const ArmorCategory = ({createdItem, setCreatedItem}) => {
  const dispatch = useDispatch()

  const isValid = useMemo(() => {
    return !!(
      createdItem?.name &&
      createdItem?.armor_category &&
      createdItem?.armor_Class
    )
  }, [createdItem])

  const handleChange = (e) => {
    setCreatedItem((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

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

      <input
        onChange={(e) => {
          handleChange(e)
        }}
        name="armor_category"
        id="item-category"
        placeholder="light, medium, heavy"
        value={createdItem?.armor_category || ""}
        disabled={!createdItem.name}
      />

      <input
        onChange={(e) => {
          handleChange(e)
        }}
        name="armor_Class"
        id="armor-class"
        placeholder="AC: 12 + dex"
        value={createdItem?.armor_Class || ""}
        disabled={!createdItem.armor_category}
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
          }}
        >
          Equip Item
        </button>

        <button
          className="add-item"
          disabled={!isValid}
          onClick={() => {
            dispatch(setInventory(Object.entries(createdItem)))
            setCreatedItem({})
          }}
        >
          add to inventory
        </button>
      </div>
    </div>
  )
}
export default ArmorCategory
