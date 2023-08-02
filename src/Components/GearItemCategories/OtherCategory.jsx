import {useDispatch} from "react-redux"
import {v4 as uuid} from "uuid"

import {addInventory} from "../../Store/slices/inventorySlice"
import {addGear} from "../../Store/slices/gearSlice"

const OtherCategory = ({createdItem, setCreatedItem}) => {
  const dispatch = useDispatch()

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

      <div className="add-btn-container">
        <button
          className="add-item"
          disabled={!createdItem.name}
          onClick={() => {
            dispatch(addGear([...Object.entries(createdItem), ["id", uuid()]]))
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
              addInventory([...Object.entries(createdItem), ["id", uuid()]])
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
