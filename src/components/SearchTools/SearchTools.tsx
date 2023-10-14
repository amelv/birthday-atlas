import useMediaQuery from '@/hooks/useMediaQuery'

import { useAppContext } from '@/context/AppContext'
import './SearchTools.css'

function SettingsMenu () {
  const isMobile = useMediaQuery('(max-width: 768px)')
  const [{ isSearchToolsOpen }] = useAppContext()

  return (
    <aside aria-hidden={isMobile && !isSearchToolsOpen}
      className={`search-tools${isMobile && isSearchToolsOpen ? ' open' : ''}`}
    >Test</aside>
  )
}

export default SettingsMenu
