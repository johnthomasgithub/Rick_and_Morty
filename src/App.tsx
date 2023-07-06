import Characters from './Components/characters/Characters'
import Header from './Components/header/Header'
import './styles/globalstyle.scss'

export const App = () => {
  return (
    <div className="main-parent">
      <Header />
      <Characters />
    </div>
  )
}
