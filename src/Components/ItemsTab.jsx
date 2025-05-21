import "../styles/ItemsTab.scss"
import Select from "react-select"
import axios from "axios"
import {useState, useEffect} from "react"
import {useDispatch, useSelector} from "react-redux"
import {MdCreate, MdClose} from "react-icons/md"
import {TbArrowBackUp} from "react-icons/tb"

import equipmentFilter from "./filters/EquipmentFilter.json"
import {filter, handleformat} from "./utilities.js"
import ItemCreator from "./ItemCreator"
import useCounter from "../hooks/useCounter.jsx"
import {updateCharacter} from "../Store/slices/characterSlice.js"

const ItemsTab = ({
  type,
  setDetails,
  details,
  linkedCharacter,
  setShowItemTab,
}) => {
  const [itemCategories, setItemCategories] = useState([])
  const [itemList, setItemList] = useState()
  const [currentItem, setCurrentItem] = useState()
  const [categoryURL, setCategoryURL] = useState("")
  const [currentItemData, setCurrentItemData] = useState([])
  const [showItemCreator, setShowItemCreator] = useState(false)
  const counter = useCounter(1, 9999)
  const dispatch = useDispatch()
  const character = useSelector((store) => store.character.value)

  const compareId = (store, currentItem) => {
    // check if store item id is the same as the current item
    const findId = store.map((item) => {
      const id = item.find((prop) => prop[0] === "id")?.[1]
      return id
    })

    if (findId.includes(currentItem)) {
      return true
    }
    return false
  }

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

  useEffect(() => {
    if (details) {
      setDetails((prev) => ({
        ...prev,
        starting_equipment: [],
      }))
    }
    // eslint-disable-next-line
  }, [])
  // fetch equipment categories
  useEffect(() => {
    axios
      .get(`https://www.dnd5eapi.co/api/equipment-categories/`)
      .then((res) => {
        try {
          const data = res.data.results
          setItemCategories(data)
        } catch (error) {
          console.log(error)
        }
      })
  }, [])

  // fetch items in that category
  useEffect(() => {
    axios
      .get(`https://www.dnd5eapi.co/api/equipment-categories/${categoryURL}`)
      .then((res) => {
        try {
          const data = res.data.equipment?.toSorted((a, b) => {
            let itemA = a.name.toUpperCase()
            let itemB = b.name.toUpperCase()
            return itemA < itemB ? -1 : itemA > itemB ? 1 : 0
          })

          setItemList(data)
        } catch (error) {
          console.log(error)
        }
      })
  }, [categoryURL])

  // fetch details about current item
  useEffect(() => {
    if (currentItem?.url) {
      axios
        .get(`https://www.dnd5eapi.co${currentItem?.url || ""}`)
        .then((res) => {
          try {
            const data = res.data
            setCurrentItemData(data)
          } catch (error) {
            console.log(error)
          }
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

    // if item name has a value, return true. else don't display it
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
                <div className={`item-info key_${key}`} key={`item_${key}`}>
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
          {currentItem && (
            <div className="counter-container">
              <h4 className="h4-title">amount:</h4>
              <label className="item-count">{counter.value}</label>
              <button onClick={() => counter.increment(0, 1)}>+</button>
              <button
                disabled={counter.value <= 1}
                onClick={() => counter.decrement(1)}
              >
                -
              </button>
            </div>
          )}

          {itemList && type === "items-tab" ? (
            <div className="add-btn-container">
              <button
                type="button"
                className="add-item"
                disabled={
                  compareId(character.inventory, filteredInfo[0][1]) === true ||
                  compareId(character.gear, filteredInfo[0][1]) === true
                }
                onClick={() =>
                  filteredInfo.length
                    ? dispatch(
                        updateCharacter({
                          ...character,
                          gear: [
                            ...character.gear,
                            [
                              ...filteredInfo,
                              ["id", filteredInfo[0][1]],
                              ["amount", counter.value],
                              ["linkedCharacter", character.characterName],
                            ],
                          ],
                        })
                      )
                    : ""
                }
              >
                Equip Item
              </button>
              <button
                type="button"
                className="add-item"
                disabled={
                  compareId(character.inventory, filteredInfo[0][1]) === true ||
                  compareId(character.gear, filteredInfo[0][1]) === true
                }
                onClick={() =>
                  filteredInfo.length
                    ? dispatch(
                        updateCharacter({
                          ...character,
                          inventory: [
                            ...character.inventory,
                            [
                              ...filteredInfo,
                              ["linkedCharacter", character.characterName],
                              ["amount", counter.value],
                              ["id", filteredInfo[0][1]],
                            ],
                          ],
                        })
                      )
                    : ""
                }
              >
                add to inventory
              </button>
            </div>
          ) : type === "starting-equipment" && filteredInfo.length ? (
            <button
              type="button"
              className="add-btn"
              onClick={() => {
                const stateCopy = {...details, starting_equipment: []}
                if (
                  !details?.starting_equipment?.includes(filteredInfo[0][1])
                ) {
                  return (
                    setDetails((prev) => ({
                      ...stateCopy,
                      starting_equipment: [
                        ...prev?.starting_equipment,
                        [
                          ...filteredInfo,
                          ["linkedCharacter", linkedCharacter],
                          ["amount", counter.value],
                          ["id", filteredInfo[0][1]],
                        ],
                      ],
                    })),
                    setCurrentItemData(""),
                    setCurrentItem(""),
                    setCategoryURL("")
                  )
                }
              }}
            >
              add
            </button>
          ) : (
            ""
          )}
        </div>
      )
    )
  }

  return (
    <div
      className={
        type === "items-tab"
          ? "items-tab-wrapper"
          : "starting-equipment-selector"
      }
    >
      {type === "items-tab" && (
        <div className="item-tab-btn-container">
          <button
            type="button"
            className="create-item-btn"
            onClick={() =>
              setShowItemTab((prev) => ({
                ...prev,
                items: !prev.items,
              }))
            }
          >
            <MdClose />
          </button>
          <button
            type="button"
            className="create-item-btn"
            onClick={() => {
              setShowItemCreator(!showItemCreator)
            }}
          >
            {!showItemCreator ? <MdCreate /> : <TbArrowBackUp />}
          </button>
        </div>
      )}

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
          maxMenuHeight={200}
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
          maxMenuHeight={200}
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
