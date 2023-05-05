const BaseStats = () => {
  const baseStats = [0, 1, 2, 3, 4, 5]

  return (
    <div className="stat-container">
      {baseStats.map((stat, index) => (
        <div className="base-stat" key={index}>
          {stat}
        </div>
      ))}
    </div>
  )
}
export default BaseStats
