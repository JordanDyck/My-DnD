import {useDispatch} from "react-redux"
import {v4 as uuid} from "uuid"
import {useMemo} from "react"

import {setInventory} from "../../Store/slices/inventorySlice"
import {setGear} from "../../Store/slices/gearSlice"

const ArmorCategory = ({createdItem, setCreatedItem}) => {
  const dispatch = useDispatch()
  console.log(createdItem)
  const isValid = useMemo(() => {
    return !!(createdItem?.name && createdItem?.category && createdItem?.AC)
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
        name="category"
        id="item-category"
        placeholder="light, medium, heavy"
        value={createdItem?.category || ""}
      />

      <input
        onChange={(e) => {
          handleChange(e)
        }}
        name="AC"
        id="armor-class"
        placeholder="AC: 12 + dex"
        value={createdItem?.AC || ""}
      />
      <textarea
        onChange={(e) => {
          handleChange(e)
        }}
        name="desc"
        className="item-desc"
        placeholder="Description"
        value={createdItem?.desc || ""}
      ></textarea>

      <div className="add-btn-container">
        <button
          className="add-item"
          disabled={!isValid}
          onClick={() => {
            dispatch(setGear([...Object.entries(createdItem), ["id", uuid()]]))
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
