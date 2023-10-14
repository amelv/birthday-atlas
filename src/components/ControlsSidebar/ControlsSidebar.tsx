import './ControlsSidebar.css'

interface ControlsSidebarProps {
  children: React.ReactNode
}

function ControlsSidebar ({children}: ControlsSidebarProps) {
  return <aside className='controls-sidebar'>{children}</aside>
}

export default ControlsSidebar
