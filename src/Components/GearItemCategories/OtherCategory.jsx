import {useDispatch} from "react-redux"
import {v4 as uuid} from "uuid"

import {setInventory} from "../../Store/slices/inventorySlice"
import {setGear} from "../../Store/slices/gearSlice"

const OtherCategory = ({createdItem, setCreatedItem}) => {
  const dispatch = useDispatch()

  console.log(createdItem)

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
            dispatch(setGear([...Object.entries(createdItem), ["id", uuid()]]))
            setCreatedItem({})
          }}
        >
          Equip Item
        </button>
        <button
          className="add-item"
          disabled={!createdItem.name}
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
export default OtherCategory
