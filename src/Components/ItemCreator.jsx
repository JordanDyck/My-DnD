import {useState} from "react"
import {GiChestArmor, GiCrossedSwords, GiPotionBall} from "react-icons/gi"

import WeaponCategory from "./GearItemCategories/WeaponCategory"
import ArmorCategory from "./GearItemCategories/ArmorCategory"
import OtherCategory from "./GearItemCategories/OtherCategory"

const ItemCreator = () => {
  const [itemType, setItemType] = useState()
  const [createdItem, setCreatedItem] = useState([])
  const [activeButton, setActiveButton] = useState()

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
      <div className="item-types">
        {/* <input type="radio" value="weapon" id="weapon" name="category" /> */}
        <button
          type="button"
          className={`option ${activeButton === "weapon" && "active"}`}
          name="weapon"
          onClick={(e) => {
            setItemType(e.target.name)
            setCreatedItem("")
            setActiveButton(e.target.name)
          }}
        >
          Weapon <GiCrossedSwords />
        </button>

        <div className="divider" />

        {/* <input type="radio" value="armor" id="armor" name="category" /> */}
        <button
          type="button"
          className={`option ${activeButton === "armor" && "active"}`}
          name="armor"
          onClick={(e) => {
            setItemType(e.target.name)
            setCreatedItem("")
            setActiveButton(e.target.name)
          }}
        >
          armor <GiChestArmor />
        </button>

        <div className="divider" />

        {/* <input type="radio" value="other" id="other" name="category" /> */}
        <button
          type="button"
          className={`option ${activeButton === "other" && "active"}`}
          name="other"
          onClick={(e) => {
            setItemType(e.target.name)
            setCreatedItem("")
            setActiveButton(e.target.name)
          }}
        >
          other <GiPotionBall />
        </button>
      </div>
      <div className="item-creator">{itemType && createItem()}</div>
    </div>
  )
}
export default ItemCreator
