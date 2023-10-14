import CakeIcon from '@/assets/cake.svg'
import CompassIcon from '@/assets/compass.svg'
import SettingsIcon from '@/assets/settings.svg'
import './Header.css'
import useMediaQuery from '@/hooks/useMediaQuery'
import { useAppContext } from '@/context/AppContext'

function Header () {
  const isDesktop = useMediaQuery('(min-width: 768px)')
  const [, dispatch] = useAppContext()
  return (
    <header className='header-bar'>
      {isDesktop ? (
        <span style={{ marginRight: 'auto' }} />
      ) : (
        <button
          className='header-bar__settings-button'
          onClick={() => dispatch({ type: 'TOGGLE_SEARCH_TOOLS' })}
        >
          <img
            src={SettingsIcon}
            className='header-bar__settings-icon'
            alt=''
          />
        </button>
      )}
      <h1 className='header-bar__title'>The Birthday Atlas</h1>

      <span style={{ marginLeft: 'auto' }}></span>
    </header>
  )
}

export default Header
