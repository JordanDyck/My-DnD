import Select from "react-select"
import axios from "axios"
import {useState, useEffect} from "react"

import equipmentFilter from "./EquipmentFilter.json"

const ItemsTab = () => {
  const [itemCategories, setItemCategories] = useState([])
  const [itemList, setItemList] = useState([])
  const [currentItem, setCurrentItem] = useState()
  const [categoryURL, setCategoryURL] = useState("")
  const [currentItemData, setCurrentItemData] = useState([])

  // changes category object names to work with react select options.
  const categoryOptions = itemCategories.map(({index, name}) => ({
    value: index,
    label: name,
  }))

  const itemOptions = itemList?.map(({index, name, url}) => ({
    value: index,
    label: name,
    url: url,
  }))

  // fetch equipment categories
  useEffect(() => {
    axios
      .get(`https://www.dnd5eapi.co/api/equipment-categories/`)
      .then((res) => {
        const data = res.data.results
        setItemCategories(data)
      })
  }, [])

  // fetch items in that category
  useEffect(() => {
    axios
      .get(`https://www.dnd5eapi.co/api/equipment-categories/${categoryURL}`)
      .then((res) => {
        const data = res.data.equipment
        setItemList(data)
      })
  }, [categoryURL])

  // fetch details about current item
  useEffect(() => {
    if (currentItem?.url) {
      axios
        .get(`https://www.dnd5eapi.co${currentItem?.url || ""}`)
        .then((res) => {
          const data = res.data
          setCurrentItemData(data)
        })
    }
  }, [currentItem, setCurrentItem])

  const displayItemData = () => {
    // creates array for currentItemData to be displayed
    const itemInfo = Object.entries(currentItemData)

    const gearCategory =
      equipmentFilter?.[currentItemData?.gear_category?.index]

    const equipmentCategory =
      equipmentFilter?.[currentItemData?.equipment_category?.index]

    const whitelist = equipmentFilter.base
      .concat(gearCategory)
      .concat(equipmentCategory)

    // if item name hase a value, return true. else don't display it
    const filteredInfo = itemInfo.filter((value) => {
      if (whitelist.includes(value[0])) {
        // if itemInfo values match the values of the json file
        if (Array.isArray(value[1]) && !value[1].length) {
          // if empty values are in an array, return false
          return false
        } else if (Object.keys(value[1])?.length) {
          // if values exist.
          return true
        }
        return !!value[1]
      } else {
        return false
      }
    })

    // console.log(currentItemData.cost.quantity)
    return filteredInfo.map(([key, value]) => (
      <div className="item-info" key={key}>
        <h4>{key}</h4>
        <p>{JSON.stringify(value)}</p>
      </div>
    ))
  }
  return (
    <div className="items-tab-wrapper">
      <Select
        options={categoryOptions}
        onChange={(choice) => setCategoryURL(choice.value)}
      />
      {itemList && (
        <Select
          options={itemOptions}
          onChange={(choice) => {
            setCurrentItem(choice)
          }}
        />
      )}
      {currentItemData && displayItemData()}
    </div>
  )
}
export default ItemsTab
