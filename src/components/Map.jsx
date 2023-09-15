import { useNavigate, useSearchParams } from 'react-router-dom'
import styles from './Map.module.css'

function Map() {
   const navigate = useNavigate()
  const [searchParam, setSearchParam] = useSearchParams()

  const lat = searchParam.get("lat")
  const lng = searchParam.get("lng")
  return (
    <div onClick={()=>navigate("form")} className={styles.mapContainer}>Map</div>
  )
}

export default Map