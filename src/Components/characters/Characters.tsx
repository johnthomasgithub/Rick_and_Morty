import React, { useEffect, useState } from 'react'

const Characters = () => {
  const [characters, setCharacters] = useState([])

  const getUsers = async () => {
    const response = await fetch('https://rickandmortyapi.com/api/character')
    const FinalData = await response.json()
    console.log(FinalData)

    setCharacters(FinalData.results)
  }

  useEffect(() => {
    getUsers()
  }, [])

  return (
    <div className="container">
      {characters.map((item: any, index: any) => {
        return (
          <div className="card_item" key={item.id}>
            <div className="card_inner">
              <img src={item.image} alt="" />
              <div className="userName">{item.name}</div>
              {/* <div className="userUrl">{item.url}</div> */}
              <div className="detail-box">
                <div className="gitDetail">
                  <span>Gender</span>
                  {item.gender}
                </div>
                <div className="gitDetail">
                  <span>Status</span>
                  {item.status}
                </div>
                <div className="gitDetail">
                  <span>Species</span>
                  {item.species}
                </div>
              </div>
              <button className="seeMore">See More</button>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Characters
