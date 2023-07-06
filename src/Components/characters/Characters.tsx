import React, { useEffect, useState } from 'react'

const Characters = () => {
  const [characters, setCharacters] = useState([])
  const [pageCount, setPageCount] = useState()
  const [currentPage, setCurrentPage] = useState(1)

  const getUsers = async () => {
    const response = await fetch('https://rickandmortyapi.com/api/character')
    const FinalData = await response.json()
    console.log(FinalData)
    setPageCount(FinalData.info.pages)
    setCharacters(FinalData.results)
  }

  useEffect(() => {
    getUsers()
  }, [])

  const handleScroll = () => {
    // Check if the user has reached the bottom of the page
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      //   setIsLoading(true);
      console.log('page end')
    }
  }

  useEffect(() => {
    // Attach the scroll event listener when the component mounts
    window.addEventListener('scroll', handleScroll)

    return () => {
      // Detach the scroll event listener when the component unmounts
      window.removeEventListener('scroll', handleScroll)
    }
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

                  <div>
                    {' '}
                    {item.status === 'Dead' ? (
                      <span className="dead"></span>
                    ) : item.status === 'Alive' ? (
                      <span className="alive"></span>
                    ) : null}{' '}
                    {item.status}
                  </div>
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
