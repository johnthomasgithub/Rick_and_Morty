import React from 'react'
interface Props {
  character: any
  handleClickSeeMore?: Function
}
const Card = (props: Props) => {
  return (
    <div className="card_item" key={props.character.id}>
      <div className="card_inner">
        <img src={props.character.image} alt="" />
        <div className="userName">{props.character.name}</div>
        <div className="detail-box">
          <div className="gitDetail">
            <span>Gender</span>
            {props.character.gender}
          </div>
          <div className="gitDetail">
            <span>Status</span>

            <div>
              {' '}
              {props.character.status === 'Dead' ? (
                <span className="dead"></span>
              ) : props.character.status === 'Alive' ? (
                <span className="alive"></span>
              ) : null}{' '}
              {props.character.status}
            </div>
          </div>
          <div className="gitDetail">
            <span>Species</span>
            <div className="species" title={props.character.species}>
              {props.character.species}
            </div>
          </div>
        </div>
        <button
          className="seeMore"
          onClick={() =>
            props.handleClickSeeMore &&
            props.handleClickSeeMore(props.character.id)
          }
        >
          See More
        </button>
      </div>
    </div>
  )
}

export default Card
