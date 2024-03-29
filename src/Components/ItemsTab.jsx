import Select from "react-select"
import axios from "axios"
import {useState, useEffect} from "react"
import {v4 as uuid} from "uuid"
import {useDispatch} from "react-redux"
import {MdCreate, MdClose} from "react-icons/md"

import equipmentFilter from "./EquipmentFilter.json"
import {filter, handleformat} from "./utilities.js"
import ItemCreator from "./ItemCreator"
import {addInventory} from "../Store/slices/inventorySlice"
import {addGear} from "../Store/slices/gearSlice"

const ItemsTab = () => {
  const [itemCategories, setItemCategories] = useState([])
  const [itemList, setItemList] = useState()
  const [currentItem, setCurrentItem] = useState()
  const [categoryURL, setCategoryURL] = useState("")
  const [currentItemData, setCurrentItemData] = useState([])
  const [showItemCreator, setShowItemCreator] = useState(false)

  // const inventory = useSelector((store) => store.inventory)

  const dispatch = useDispatch()

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

    return (
      !showItemCreator && (
        <div className="item-info-container ">
          {filteredInfo.map(([key, value]) => {
            const customizeValue = filter?.[key]?.(value)
            const valueToCheck =
              customizeValue === undefined ? value : customizeValue
            const renderedValue = handleformat(valueToCheck, key)
            if (!showItemCreator) {
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
            } else {
              return ""
            }
          })}

          {itemList && (
            <div className="add-btn-container">
              <button
                className="add-item"
                onClick={() =>
                  filteredInfo.length
                    ? dispatch(addGear([...filteredInfo, ["id", uuid()]]))
                    : ""
                }
              >
                Equip Item
              </button>
              <button
                className="add-item"
                onClick={() =>
                  filteredInfo.length
                    ? dispatch(addInventory([...filteredInfo, ["id", uuid()]]))
                    : ""
                }
              >
                add to inventory
              </button>
            </div>
          )}
        </div>
      )
    )
  }

  return (
    <div className="items-tab-wrapper">
      <button
        className="create-item-btn"
        onClick={() => {
          setShowItemCreator(!showItemCreator)
        }}
      >
        {!showItemCreator ? <MdCreate /> : <MdClose />}
      </button>

      {showItemCreator && <ItemCreator />}
      {!showItemCreator && (
        <Select
          options={categoryOptions}
          placeholder="Categories"
          onChange={(choice) => {
            setCategoryURL(choice.value)
            setCurrentItem(null)
            setCurrentItemData(null)
          }}
          styles={{
            option: (base) => ({
              ...base,
              border: "1px solid #a9a9a9",
            }),
          }}
        />
      )}
      {itemList && !showItemCreator ? (
        <Select
          placeholder="Items"
          value={currentItem}
          options={itemOptions}
          maxMenuHeight={270}
          onChange={(choice) => {
            setCurrentItem(choice)
          }}
          styles={{
            option: (base) => ({
              ...base,
              border: "1px solid #a9a9a9",
            }),
          }}
        />
      ) : (
        ""
      )}
      {currentItemData && displayItemData()}
    </div>
  )
}
export default ItemsTab
