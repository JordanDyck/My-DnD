// import {useState} from "react"

const CreateOwnCharacter = ({type}) => {
  // const [details, setDetails] = useState()

  // fetch /api/equipment-categories/{index}

  const onSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData)
    console.log(data)
  }
  return (
    <div className="perk-wrapper">
      <form onSubmit={onSubmit}>
        <label htmlFor="name">{`${type}:`}</label>
        <input name="class" />
        <label htmlFor="hit dice">Hit dice:</label>
        <input name="hit dice" />
        <label htmlFor="proficiencies">proficiencies</label>
        <input name="proficiencies" />
        <button type="submit">Save</button>
      </form>
    </div>
  )
}
export default CreateOwnCharacter
