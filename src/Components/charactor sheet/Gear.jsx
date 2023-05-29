import {useState} from "react"

const Gear = () => {
  const [addGear, setAddGear] = useState(false)

  return (
    <div className="gear-wrapper">
      <button id="add-gear-btn" onClick={() => setAddGear(!addGear)}>
        +
      </button>

      {/* to filter gear from api */}
      {addGear && (
        <div className="add-gear">
          <label htmlFor="gear-name">
            name:
            <input id="gear-name" />
          </label>
          <label htmlFor="damage">
            dmg:
            <input id="damage" placeholder="1 d12 x 2" />
          </label>
          <label htmlFor="description">desc:</label>
          <textarea id="description" />
        </div>
      )}
    </div>
  )
}
export default Gear
