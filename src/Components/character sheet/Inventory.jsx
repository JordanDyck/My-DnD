import {useSelector} from "react-redux"

import InventoryItem from "../InventoryItem"

const Inventory = () => {
  const character = useSelector((store) => store.character.value)

  return (
    <div className="inventory-wrapper">
      <div className="tab-header">
        <header>Inventory</header>
      </div>
      {character.inventory.length ? <span>*click item to equip</span> : ""}
      {character?.inventory?.map((item, index) => {
        const id = item.find((prop) => prop[0] === "id")?.[1]
        const quantity = item.find((prop) => prop[0] === "amount")?.[1]

        return (
          <InventoryItem
            item={item}
            index={index}
            id={id}
            key={id}
            quantity={quantity}
          />
        )
      })}
    </div>
  )
}
export default Inventory
