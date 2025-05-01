import {useSelector, useDispatch} from "react-redux"
import {useState} from "react"

import InventoryItem from "../InventoryItem"
import {updateCharacter} from "../../Store/slices/characterSlice"
const Inventory = ({unfocused}) => {
  const character = useSelector((store) => store.character.value)
  const [selectedCoin, setSelectedCoin] = useState()
  const dispatch = useDispatch()
  const displayCoinEditor = (coin) => {
    setSelectedCoin(() => {
      return selectedCoin !== coin[0] ? coin[0] : undefined
    })
  }

  const editCurrency = (e) => {
    const currentValue = parseInt(character.currency[e.target.name])
    const newValue = parseInt(e.target.value || 0)
    const updateCurrency = {
      ...character,
      currency: {
        ...character.currency,
        [e.target.name]: currentValue + newValue,
      },
    }
    if (newValue) {
      dispatch(updateCharacter(updateCurrency))
    }
    setSelectedCoin()
  }

  return (
    <div
      className="inventory-wrapper"
      style={{pointerEvents: unfocused ? "none" : "initial"}}
    >
      <div className="tab-header">
        <header>Inventory</header>
      </div>
      <div className="currency-container">
        {Object.entries(character.currency).map((coin, i) => {
          return (
            <div className="coin-wrapper" key={`coin_${coin[0]}`}>
              <header className="tab-header">{coin[0]}</header>
              <div className={`coin-container ${coin[0]}`}>
                <h4 onClick={() => displayCoinEditor(coin)}>{coin[1]}</h4>
              </div>
              <input
                type="number"
                name={coin[0]}
                onBlur={(e) => {
                  editCurrency(e)
                  e.target.value = ""
                }}
                disabled={coin[0] !== selectedCoin}
              />
            </div>
          )
        })}
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
