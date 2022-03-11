import { useState, useEffect } from 'react'

const Activity = () => {
  const [dataAPI, setDataAPI] = useState();
  
  const fetchData = async () => {
    fetch('https://www.boredapi.com/api/activity')
      .then((response) => response.json())
      .then((data) => {
        setDataAPI(data)
      })
  }
  
  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      <h1>THIS API IS CONTROLLING MY LIFE</h1>
      {
        dataAPI &&
        <div>
          <h3>{dataAPI.activity}</h3>
        </div>
      }
    </>
  )
}

export default Activity