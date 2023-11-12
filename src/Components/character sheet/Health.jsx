const Health = () => {
  const maxHP = 100
  const currentHP = 50

  return (
    <div className="health-container">
      <h4>
        {currentHP} / {maxHP}
      </h4>
    </div>
  )
}
export default Health
