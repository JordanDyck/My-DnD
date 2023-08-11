import {useSelector, useDispatch} from "react-redux"
import {v4 as uuid} from "uuid"
import {setInventory} from "../../Store/slices/inventorySlice"

const Inventory = () => {
  const inventory = useSelector((store) => store.inventory)
  const dispatch = useDispatch()

  const deleteItem = (id) => {
    //finds the id of item & removes it. setGear replaces gear array with new updated array
    let updatedGear = inventory.value.filter(
      (item) => item.find((prop) => prop[0] === "id")[1] !== id
    )
    dispatch(setInventory(updatedGear))
  }

  return (
    <div className="inventory-wrapper">
      <div className="tab-header">
        <header>Inventory</header>
      </div>
      {inventory.value.map((item) => {
        const id = item.find((prop) => prop[0] === "id")?.[1]
        return (
          <div className="inventory-item" key={`inventoryId${uuid()}`}>
            <button className="delete-item-btn" onClick={() => deleteItem(id)}>
              delete
            </button>
            <h5>{item[0][1]}</h5>
          </div>
        )
      })}
    </div>
  )
}
export default Inventory
