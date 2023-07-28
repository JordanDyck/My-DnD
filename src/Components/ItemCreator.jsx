import {useState} from "react"
import {useDispatch} from "react-redux"
import {v4 as uuid} from "uuid"

import {setInventory} from "../Store/slices/inventorySlice"
import {setGear} from "../Store/slices/gearSlice"
import WeaponCategory from "./GearItemCategories/WeaponCategory"

const ItemCreator = () => {
  const [itemType, setItemType] = useState()
  const [createdItem, setCreatedItem] = useState([])
  const dispatch = useDispatch()

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
        <div
          className="item-creator"
          onChange={(e) => {
            setCreatedItem((prev) => ({
              ...prev,
              [e.target.name]: e.target.value,
            }))
          }}
          key={"armor"}
        >
          <input type="text" name="name" id="item-name" placeholder="Name" />

          <input
            name="category"
            id="item-category"
            placeholder="light, medium, heavy"
          />

          <input name="AC" id="armor-class" placeholder="AC: 12 + dex" />
          <textarea
            name="desc"
            className="item-desc"
            placeholder="Description"
          ></textarea>

          <div className="add-btn-container">
            <button
              className="add-item"
              onClick={() => {
                dispatch(
                  setGear([...Object.entries(createdItem), ["id", uuid()]])
                )
              }}
            >
              Equip Item
            </button>

            <button
              className="add-item"
              onClick={() =>
                dispatch(setInventory(Object.entries(createdItem)))
              }
            >
              add to inventory
            </button>
          </div>
        </div>
      )
    } else if (itemType === "other") {
      // html for 'other' category
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
                dispatch(
                  setGear([...Object.entries(createdItem), ["id", uuid()]])
                )
              }}
              className="add-item"
            >
              Equip Item
            </button>
            <button
              className="add-item"
              onClick={() =>
                dispatch(setInventory(Object.entries(createdItem)))
              }
            >
              add to inventory
            </button>
          </div>
        </div>
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
