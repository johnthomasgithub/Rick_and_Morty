import { useEffect, useState } from 'react'
import Characters from './Components/characters/Characters'
import Header from './Components/header/Header'
import './styles/globalstyle.scss'
import Popup from './Components/popup/Popup'

export const App = () => {
  const [selectedCharacter, setSelectedCharacter]: [number, Function] =
    useState(0)
  const [openPopUp, setOpenPupUp]: [boolean, Function] = useState(false)

  return (
    <div className="main-parent">
      <Header />
      <Characters
        setOpenPupUp={setOpenPupUp}
        setSelectedCharacter={setSelectedCharacter}
      />
      {openPopUp && (
        <Popup setOpenPupUp={setOpenPupUp} charId={selectedCharacter} />
      )}
    </div>
  )
}
