import axios from "axios"
import {useEffect, useState} from "react"

const CharacterOptionsPopUp = ({
  setPopUp,
  setOptionName,
  type,
  setIsCustom,
}) => {
  const [options, setOptions] = useState([])
  useEffect(() => {
    axios.get(`https://www.dnd5eapi.co/api/${type.name}/`).then((res) => {
      const data = res.data.results

      setOptions(data)
    })
  }, [type])

  return (
    <div className="popup-container">
      <button
        id="custom-char-btn"
        onClick={() => {
          setTimeout(() => {
            setPopUp((prev) => ({...prev, [type.name]: false}))
            setIsCustom((prev) => ({...prev, customClass: true}))
          }, 300)
        }}
      >
        Make Your Own
      </button>
      {options.length ? (
        options.map((option, index) => (
          <button
            className="type-option"
            key={index}
            onClick={() => {
              setTimeout(() => {
                setOptionName(option.name)

                setPopUp((prev) => ({...prev, [type.name]: false}))
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
