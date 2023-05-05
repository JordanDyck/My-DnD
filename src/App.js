import axios from "axios"
import "./App.scss"
import BaseStats from "./Components/charactor sheet/BaseStats"
import Class from "./Components/charactor sheet/Class"

function App() {
  const api = "https://www.dnd5eapi.co/api/"
  // const handelClick = () => {
  //   axios.get("https://www.dnd5eapi.co/api/classes/barbarian").then((res) => {
  //     console.log(res.data)
  //   })
  // }

  return (
    <div className="App">
      {/* <BaseStats /> */}
      <Class />
    </div>
  )
}

export default App
