import Select from "react-select"

const Class = () => {
  return (
    <div className="class-container">
      <div className="name-container">
        <label htmlFor="name">Name:</label>
        <input id="name" />
      </div>
      <div className="lvl-containter">
        <label id="lvl-label" htmlFor="level">
          Lvl:
        </label>
        <input id="level" />
      </div>
      <div className="race-container">
        <label htmlFor="race">Race:</label>
        <h4 id="race">placeholder</h4>
      </div>
      {/* <label htmlFor="background">background:</label>
      <input id="background" /> */}
    </div>
  )
}
export default Class
