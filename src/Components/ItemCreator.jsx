import {useState} from "react"

import WeaponCategory from "./GearItemCategories/WeaponCategory"
import ArmorCategory from "./GearItemCategories/ArmorCategory"
import OtherCategory from "./GearItemCategories/OtherCategory"

const ItemCreator = () => {
  const [itemType, setItemType] = useState()
  const [createdItem, setCreatedItem] = useState([])

  const createItem = () => {
    if (itemType === "weapon") {
      // html for weapon category
      return (
        <WeaponCategory
          createdItem={createdItem}
          setCreatedItem={setCreatedItem}
        />
      )
    } else if (itemType === "armor") {
      // html for armor category
      return (
        <ArmorCategory
          createdItem={createdItem}
          setCreatedItem={setCreatedItem}
        />
      )
    } else if (itemType === "other") {
      // html for 'other' category
      return (
        <OtherCategory
          createdItem={createdItem}
          setCreatedItem={setCreatedItem}
        />
      )
    }
  }
  return (
    <div className="item-creator-container">
      <div
        className="item-types"
        onChange={(e) => {
          setItemType(e.target.value)
          setCreatedItem("")
        }}
      >
        <input type="radio" value="weapon" id="weapon" name="category" />
        <label htmlFor="weapon">Weapon</label>

        <input type="radio" value="armor" id="armor" name="category" />
        <label htmlFor="armor">armor</label>

        <input type="radio" value="other" id="other" name="category" />
        <label htmlFor="other">other</label>
      </div>
      <div className="item-creator">{itemType && createItem()}</div>
    </div>
  )
}
export default ItemCreator
