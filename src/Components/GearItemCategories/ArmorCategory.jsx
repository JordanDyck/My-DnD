import {useDispatch} from "react-redux"
import {v4 as uuid} from "uuid"
import {useMemo} from "react"

import {setInventory} from "../../Store/slices/inventorySlice"
import {setGear} from "../../Store/slices/gearSlice"

const ArmorCategory = ({createdItem, setCreatedItem}) => {
  const dispatch = useDispatch()

  const isValid = useMemo(() => {
    return !!(createdItem?.name && createdItem?.category && createdItem?.AC)
  }, [createdItem])

  return (
    <div
      className="item-creator"
      onChange={(e) => {
        setCreatedItem((prev) => ({
          ...prev,
          [e.target.name]: e.target.value,
        }))
      }}
      key={"armor"}
    >
      <input type="text" name="name" id="item-name" placeholder="Name" />

      <input
        name="category"
        id="item-category"
        placeholder="light, medium, heavy"
      />

      <input name="AC" id="armor-class" placeholder="AC: 12 + dex" />
      <textarea
        name="desc"
        className="item-desc"
        placeholder="Description"
      ></textarea>

      <div className="add-btn-container">
        <button
          className="add-item"
          disabled={!isValid}
          onClick={() => {
            dispatch(setGear([...Object.entries(createdItem), ["id", uuid()]]))
          }}
        >
          Equip Item
        </button>

        <button
          className="add-item"
          onClick={() => dispatch(setInventory(Object.entries(createdItem)))}
        >
          add to inventory
        </button>
      </div>
    </div>
  )
}
export default ArmorCategory
