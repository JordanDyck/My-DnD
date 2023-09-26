import axios from "axios"
import {useEffect, useState} from "react"

const CharacterOptionsPopUp = ({setPopUp, setOptionName, type}) => {
  const [options, setoptions] = useState([])

  useEffect(() => {
    axios.get(`https://www.dnd5eapi.co/api/${type.name}/`).then((res) => {
      const data = res.data.results
      setoptions(data)
    })
  }, [type])

  return (
    <div className="popup-container">
      <input id="type-input" type="text" placeholder="Make your own" />
      {options.length ? (
        options.map((option, index) => (
          <button
            className="type-option"
            key={index}
            onClick={() => {
              setTimeout(() => {
                setOptionName(option.name)

                setPopUp(false)
              }, 300)
            }}
          >
            {option.name}
          </button>
        ))
      ) : (
        <p className="loading">loading</p>
      )}
    </div>
  )
}
export default CharacterOptionsPopUp
