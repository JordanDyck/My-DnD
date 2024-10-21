import axios from "axios"
import {useEffect, useRef, useState} from "react"

const FeatureDesc = ({url, setUrl}) => {
  const [feature, setFeature] = useState()
  const closeRef = useRef()

  useEffect(() => {
    url &&
      axios.get(`https://www.dnd5eapi.co${url}`).then((res) => {
        const data = res.data
        setFeature(data)
      })
  }, [url])

  useEffect(() => {
    // close FeatureDesc when clicked outside.
    let clickOutside = (e) => {
      if (!closeRef.current.contains(e.target)) {
        setUrl()
      }
    }

    document.addEventListener("mousedown", clickOutside)
    return () => {
      document.removeEventListener("mousedown", clickOutside)
    }
  }, [closeRef, setUrl])

  return (
    feature && (
      <div className="feature-info" ref={closeRef}>
        <header className="tab-header">{feature.name}</header>
        <h4 className="h4-title">description:</h4>
        {feature.desc.map((desc, index) => (
          <p key={`${feature.name}_${index}`}>{desc}</p>
        ))}
      </div>
    )
  )
}
export default FeatureDesc
