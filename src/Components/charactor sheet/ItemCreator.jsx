import {useState} from "react"
import {v4 as uuid} from "uuid"

const ItemCreator = () => {
  const [itemType, setItemType] = useState()
  const [createdItem, setCreatedItem] = useState({})
  const [inputList, setInputList] = useState([])

  const createItem = () => {
    if (itemType === "weapon") {
      // html for weapon category
      return (
        <div
          className="item-creator"
          onChange={(e) => {
            setCreatedItem((prev) => ({
              ...prev,
              [e.target.name]: e.target.value,
            }))
          }}
        >
          <input type="text" name="name" id="item-name" placeholder="Name" />
          <input name="damage" id="item-damage" placeholder="damage: 1 d6" />
          <input name="range" id="item-range" placeholder="range: 5ft" />
          <textarea
            name="description"
            className="item-desc"
            placeholder="Description"
          />
          <button className="add-item">add to gear</button>
          <button className="add-item">add to inventory</button>
        </div>
      )
    } else if (itemType === "armor") {
      // html for armor category
      return (
        <div className="item-creator">
          <input type="text" name="name" id="item-name" placeholder="Name" />
          <input
            name="category"
            id="item-category"
            placeholder="light, medium, heavy"
          />
          <input name="AC" id="armor-class" placeholder="AC: 12 + dex" />
          <textarea
            name="description"
            className="item-desc"
            placeholder="Description"
          ></textarea>
          <button className="add-item">add to gear</button>
          <button className="add-item">add to inventory</button>
        </div>
      )
    } else if (itemType === "other") {
      // html for 'other' category
      return (
        <div className="item-creator">
          <button
            className="add-input"
            onClick={() => setInputList((prev) => [...prev, {key: uuid()}])}
          >
            Add
          </button>
          {inputList.map((input) => {
            return (
              <div key={input.key}>
                <input />
                <button
                  onClick={() => {
                    setInputList(
                      inputList.filter((item) => item.key !== input.key)
                    )
                  }}
                >
                  X
                </button>
              </div>
            )
          })}
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
