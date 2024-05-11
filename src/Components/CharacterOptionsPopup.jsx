import axios from "axios"
import {useEffect, useState} from "react"

const CharacterOptionsPopUp = ({
  setPopUp,
  setOptionName,
  url,
  type,
  setIsCustom,
}) => {
  const [options, setOptions] = useState([])
  useEffect(() => {
    axios.get(`https://www.dnd5eapi.co/api/${url}/`).then((res) => {
      const data = res.data.results

      setOptions(data)
    })
  }, [url])

  return (
    <div className="popup-container">
      <button
        id="custom-char-btn"
        onClick={() => {
          setTimeout(() => {
            setPopUp((prev) => ({...prev, [url]: false}))
            if (url === "classes") {
              setIsCustom((prev) => ({...prev, customClass: true}))
            } else if (url === "races") {
              setIsCustom((prev) => ({...prev, customRace: true}))
            }
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
                setIsCustom((prev) => ({...prev, [type]: true}))
                setPopUp((prev) => ({...prev, [url]: false}))
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
