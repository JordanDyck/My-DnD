import {useDispatch} from "react-redux"
import {v4 as uuid} from "uuid"

import {setInventory} from "../../Store/slices/inventorySlice"
import {setGear} from "../../Store/slices/gearSlice"

const OtherCategory = ({createdItem, setCreatedItem}) => {
  const dispatch = useDispatch()

  return (
    <div
      className="item-creator"
      onChange={(e) => {
        setCreatedItem((prev) => ({
          ...prev,
          [e.target.name]: e.target.value,
        }))
      }}
      key={"other"}
    >
      <input name="name" placeholder="Name" />
      <textarea
        name="desc"
        className="item-desc"
        placeholder="Description"
      ></textarea>

      <div className="add-btn-container">
        <button
          onClick={() => {
            dispatch(setGear([...Object.entries(createdItem), ["id", uuid()]]))
          }}
          className="add-item"
          disabled={!createdItem.name}
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
export default OtherCategory
