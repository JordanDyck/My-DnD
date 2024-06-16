import {useSelector} from "react-redux"

import InventoryItem from "../InventoryItem"

const Inventory = () => {
  const inventory = useSelector((store) => store.inventory)

  return (
    <div className="inventory-wrapper">
      <div className="tab-header">
        <header>Inventory</header>
      </div>
      {inventory.value.map((item) => {
        const id = item.find((prop) => prop[0] === "id")?.[1]
        const quantity = item.find((prop) => prop[0] === "quantity")?.[1]

        return (
          <InventoryItem
            item={item}
            id={id}
            key={id}
            inventory={inventory}
            quantity={quantity}
          />
        )
      })}
    </div>
  )
}
export default Inventory
