const GearItemDesc = ({id, update, showDesc, value}) => {
  return (
    <div className="desc-container">
      {value.length ? (
        <button
          onClick={() =>
            update((prev) => {
              if (prev.includes(id)) {
                return prev.filter((prevId) => prevId !== id)
              } else {
                return [...prev, id]
              }
            })
          }
        >
          Desc
        </button>
      ) : (
        ""
      )}
      {showDesc ? <p>{value}</p> : ""}
    </div>
  )
}
export default GearItemDesc
