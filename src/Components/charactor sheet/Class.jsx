const Class = () => {
  return (
    <div className="class-container">
      <div className="name-container">
        <label htmlFor="name">Name:</label>
        <input id="name" />
      </div>
      <div className="lvl-containter">
        <label id="lvl-label" htmlFor="level">
          level:
        </label>
        <input id="level" />
      </div>
      {/* <label htmlFor="race">race:</label>
      <input id="race" />
      <label htmlFor="background">background:</label>
      <input id="background" />*/}
    </div>
  )
}
export default Class
