import Select, {components} from "react-select"
import axios from "axios"
import {useState, useEffect} from "react"
import {v4 as uuid} from "uuid"

import equipmentFilter from "./EquipmentFilter.json"
import {filter} from "./FilterValues"

const ItemsTab = () => {
  const [itemCategories, setItemCategories] = useState([])
  const [itemList, setItemList] = useState()
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

    const handleformat = (itemValue, key) => {
      // goes through filteredInfo item values to check for arrays and objects. returns the values
      if (Array.isArray(itemValue)) {
        return itemValue.map((item) => handleformat(item))
      } else if (
        (typeof itemValue === "string" && itemValue.length) ||
        typeof itemValue === "number"
      ) {
        // returns the value
        return (
          <p className={key} key={uuid()}>
            {itemValue}
          </p>
        )
      } else if (typeof itemValue === "boolean") {
        return itemValue.toString()
      } else if (Object.keys(itemValue)?.length) {
        const keys = Object.keys(itemValue)
        return keys.map((value) => (
          // this returns just the value keys
          <div className="item-value" key={uuid()}>
            <h4>{value}:</h4>
            {handleformat(itemValue[value])}
          </div>
        ))
      } else {
        return ""
      }
    }

    return filteredInfo.map(([key, value]) => {
      const customizeValue = filter?.[key]?.(value)
      const valueToCheck = customizeValue === undefined ? value : customizeValue
      const renderedValue = handleformat(valueToCheck, key)

      return (
        // displays the values
        <div className={`item-info key_${key}`} key={uuid()}>
          <h4>
            {key.replaceAll("_", " ")}
            {renderedValue ? ":" : ""}
          </h4>
          {renderedValue}
        </div>
      )
    })
  }

  // placeholder for select
  const Placeholder = (props) => {
    return <components.Placeholder {...props} />
  }

  return (
    <div className="items-tab-wrapper">
      <Select
        options={categoryOptions}
        components={{Placeholder}}
        placeholder={"Categories"}
        onChange={(choice) => {
          setCategoryURL(choice.value)
          setCurrentItem(null)
          setCurrentItemData(null)
        }}
      />
      {itemList && (
        <Select
          // key={currentItem?.label || "empty"}
          components={{Placeholder}}
          placeholder={"Items"}
          value={currentItem}
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
