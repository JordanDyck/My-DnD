import {useDispatch} from "react-redux"
import {v4 as uuid} from "uuid"
import {useMemo} from "react"

import {setInventory} from "../../Store/slices/inventorySlice"
import {setGear} from "../../Store/slices/gearSlice"

const WeaponCategory = ({createdItem, setCreatedItem}) => {
  const dispatch = useDispatch()

  const isValid = useMemo(() => {
    return !!(
      createdItem?.name &&
      createdItem?.damage?.damage_dice &&
      createdItem?.damage?.damage_type?.name
    )
  }, [createdItem])

  return (
    <div className="item-creator" key={"weapon"}>
      <input
        name="name"
        id="item-name"
        placeholder="Name"
        value={createdItem?.name || ""}
        onChange={(e) => {
          setCreatedItem((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
          }))
        }}
      />
      <div className="dmg-container">
        <input
          onChange={(e) => {
            setCreatedItem((prev) => ({
              ...prev,
              damage: {
                ...prev?.damage,
                [e.target.name]: e.target.value,
              },
            }))
          }}
          name="damage_dice"
          id="item-damage-dice"
          placeholder="damage: 1 d6"
          value={createdItem?.damage?.damage_dice || ""}
        />
        <input
          onChange={(e) => {
            setCreatedItem((prev) => ({
              ...prev,
              damage: {
                ...prev?.damage,
                [e.target.name]: {
                  name: e.target.value,
                },
              },
            }))
          }}
          name="damage_type"
          id="item-damage-type"
          placeholder="bludgeoning"
          value={createdItem?.damage?.damage_type || ""}
        />
      </div>

      <div className="range-container">
        <input
          onChange={(e) => {
            setCreatedItem((prev) => ({
              ...prev,
              range: {
                ...prev?.range,
                [e.target.name]: e.target.value,
              },
            }))
          }}
          name="normal"
          id="item-range-normal"
          placeholder="range: 15ft"
          value={createdItem?.range?.normal || ""}
        />
        <input
          onChange={(e) => {
            setCreatedItem((prev) => ({
              ...prev,
              range: {
                ...prev?.range,
                [e.target.name]: e.target.value,
              },
            }))
          }}
          name="long"
          id="item-range-long"
          placeholder="range: 30ft"
          value={createdItem?.range?.long || ""}
        />
      </div>

      <textarea
        onChange={(e) => {
          setCreatedItem((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
          }))
        }}
        name="desc"
        className="item-desc"
        placeholder="Description"
        value={createdItem?.desc || ""}
        disabled={!createdItem.name}
      />
      <div className="add-btn-container">
        {/* add item to gear tab */}
        <button
          className="add-item"
          onClick={() => {
            dispatch(setGear([...Object.entries(createdItem), ["id", uuid()]]))
            setCreatedItem({})
          }}
          disabled={!isValid}
        >
          Equip Item
        </button>
        {/* add item to inventory */}
        <button
          className="add-item"
          onClick={() => dispatch(setInventory(Object.entries(createdItem)))}
        >
          add to inventory
        </button>
      </div>
    </div>
  )
}
export default WeaponCategory
