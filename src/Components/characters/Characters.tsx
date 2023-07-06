import React, { useEffect, useRef, useState } from 'react'
import loader from '../../Assets/Loader.gif'
import Card from '../cards/Card'

interface Props {
  setSelectedCharacter: Function
  setOpenPupUp: Function
}
const Characters = (props: Props) => {
  const scrollableDivRef = useRef(null)
  const [characters, setCharacters]: any = useState([])
  const [pageCount, setPageCount]: any = useState()
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)

  const getUsers = async () => {
    const response = await fetch('https://rickandmortyapi.com/api/character')
    const FinalData = await response.json()
    setPageCount(FinalData.info.pages)
    setCharacters(FinalData.results)
  }

  const getNextPage = async () => {
    const response = await fetch(
      `https://rickandmortyapi.com/api/character?page=${currentPage}`
    )
    const FinalData: any = await response.json()
    setTimeout(() => {
      setCharacters((prev: any) => [...prev, ...FinalData.results])
      setIsLoading((prev) => false)
    }, 1000)
  }

  useEffect(() => {
    getUsers()
  }, [])

  useEffect(() => {
    if (isLoading) setCurrentPage((prev) => prev + 1)
  }, [isLoading])

  useEffect(() => {
    if (currentPage > 1) {
      if (currentPage < pageCount) getNextPage()
      else {
        setIsLoading(false)
      }
    }
  }, [currentPage])

  const handleScroll = () => {
    const div: any = scrollableDivRef.current

    if (div.scrollTop + div.offsetHeight >= div.scrollHeight - 2) {
      setIsLoading(true)
    }
  }

  useEffect(() => {
    const div: any = scrollableDivRef.current
    div.addEventListener('scroll', handleScroll)
    return () => {
      div.removeEventListener('scroll', handleScroll)
    }
  }, [])
  const handleClickSeeMore = (id: number) => {
    props.setSelectedCharacter(id)
    props.setOpenPupUp(true)
  }
  return (
    <>
      <div className="container" ref={scrollableDivRef}>
        {characters.map((item: any, index: any) => {
          return (
            <Card
              key={item.id}
              handelClickSeeMore={handleClickSeeMore}
              character={item}
            />
          )
        })}
      </div>
      <div
        className="loader"
        style={{ visibility: isLoading ? 'visible' : 'hidden' }}
      >
        Loading...
        {/* <img src={loader} alt="Loader"></img> */}
      </div>
    </>
  )
}

export default Characters
