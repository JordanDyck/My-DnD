import {useSelector, useDispatch} from "react-redux"

import InventoryItem from "../InventoryItem"
import {useEffect} from "react"
import {setInventory} from "../../Store/slices/inventorySlice"

const Inventory = () => {
  const inventory = useSelector((store) => store.inventory.value)
  const character = useSelector((store) => store.character.value)

  const dispatch = useDispatch()

  useEffect(() => {
    // sets inventory to sync up to localStorage when localStorage changes.
    dispatch(setInventory(character.inventory))
  }, [character.inventory, dispatch])

  return (
    <div className="inventory-wrapper">
      <div className="tab-header">
        <header>Inventory</header>
      </div>
      {inventory?.map((item) => {
        const id = item.find((prop) => prop[0] === "id")?.[1]
        const quantity = item.find((prop) => prop[0] === "amount")?.[1]

        return (
          <InventoryItem item={item} id={id} key={id} quantity={quantity} />
        )
      })}
    </div>
  )
}
export default Inventory
