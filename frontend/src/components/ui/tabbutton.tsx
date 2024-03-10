interface TabButtonProps {
  tab: string
  activeTab: string
  onClick: (tab: string) => void
  children: React.ReactNode
}

const TabButton: React.FC<TabButtonProps> = ({ tab, activeTab, onClick, children }) => {
  const isActive = tab === activeTab
  return (
    <button
      className={`w-full p-2 text-center ${isActive ? 'zealix-bg zealix-text-brown' : 'transparent'} hover:backdrop-blur-md`}
      onClick={() => onClick(tab)}
    >
      {children}
    </button>
  )
}

export default TabButton
