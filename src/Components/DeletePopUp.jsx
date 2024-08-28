import {useSelector, useDispatch} from "react-redux"
import {clearCharacterDetails} from "../Store/slices/characterSlice"

const DeletePopUp = ({showDeleteComponent}) => {
  const currentCharacter = JSON.parse(localStorage.getItem("currentCharacter"))
  const character = useSelector((store) => store.character.value)
  const dispatch = useDispatch()

  return (
    <div className="delete-Character-container">
      <header>are you sure?</header>
      <p>
        all data for <span>"{currentCharacter}"</span> will be deleted
      </p>
      <div className="confirmation-btns">
        <button
          className="yes"
          onClick={() => {
            dispatch(clearCharacterDetails(character))
            showDeleteComponent(false)
          }}
        >
          yes
        </button>
        <button className="no" onClick={() => showDeleteComponent(false)}>
          no
        </button>
      </div>
    </div>
  )
}
export default DeletePopUp
