import React, { useEffect, useState } from 'react'

import Close from '../../Assets/close.svg'
import Card from '../cards/Card'
interface Props {
  charId: number
  setOpenPupUp: Function
}
const Popup = (props: Props) => {
  const [data, setData]: any = useState(null)
  const [dimension, setDimension] = useState(null)
  const [amount, setAmount] = useState(null)
  const [chapter, setChapter]: any = useState([])

  const getChapter = async (episodes: string[]) => {
    try {
      const chapterSArr: string[] = await Promise.all(
        episodes.map(async (element: string) => {
          const response = await fetch(element)
          const finalData = await response.json()
          return finalData.name
        })
      )
      setChapter(chapterSArr)
    } catch (error) {
      console.log(error)
    }
  }

  const handleGetDimension = async (url: string) => {
    const response = await fetch(url)
    const FinalData = await response.json()
    setDimension(FinalData.dimension)
    setAmount(FinalData.residents.length)
  }
  useEffect(() => {
    if (props.charId != 0) getUsers(props.charId)
  }, [props.charId])

  const getUsers = async (id: any) => {
    const response = await fetch(
      `https://rickandmortyapi.com/api/character/${id}`
    )
    const FinalData = await response.json()
    setData(FinalData)
    handleGetDimension(FinalData.location.url)
    getChapter(FinalData.episode)
  }
  return (
    <div className="Popup-parent">
      <div className="pop-wrapper">
        <div onClick={() => props.setOpenPupUp(false)} className="close-icon">
          <img src={Close} alt="close icon"></img>
        </div>
        {data != null && (
          <div className="pop_item" key={data.id}>
            <div className="card_inner">
              <div className="profile-section">
                <img src={data.image} alt="" />
                <div className="userName">{data.name}</div>
              </div>
              <div
                style={{
                  display: 'flex',
                  gap: '10px',
                  flex: 1,
                  overflow: 'auto',
                }}
              >
                <div className="detail-box">
                  <div className="gitDetail">
                    <span>Gender</span>
                    {data.gender}
                  </div>
                  <div className="gitDetail">
                    <span>Status</span>
                    <div>
                      {' '}
                      {data.status === 'Dead' ? (
                        <span className="dead"></span>
                      ) : data.status === 'Alive' ? (
                        <span className="alive"></span>
                      ) : null}{' '}
                      {data.status}
                    </div>
                  </div>
                  <div className="gitDetail">
                    <span>Species</span>
                    <div className="species" title={data.species}>
                      {data.species}
                    </div>
                  </div>
                  <div className="gitDetail">
                    <span>Origin</span>
                    <div className="species" title={data.origin.name}>
                      {data.origin.name}
                    </div>
                  </div>{' '}
                  <div className="gitDetail">
                    <span>Location</span>
                    <div className="species" title={data.location.name}>
                      {data.location.name}
                    </div>
                  </div>
                  {dimension && (
                    <div className="gitDetail" title={dimension}>
                      <span>Dimension</span>
                      <div className="species">{dimension}</div>
                    </div>
                  )}
                  {amount && (
                    <div className="gitDetail" title={amount}>
                      <span>Amount Of Residents</span>
                      <div className="species">{amount}</div>
                    </div>
                  )}
                  {chapter.length > 0 && (
                    <div className="gitDetail">
                      <span>Chapters</span>
                      {chapter.map((element: any, index: any) => {
                        return <div key={index}>{element}</div>
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Popup
