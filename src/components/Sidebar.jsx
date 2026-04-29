import { NavLink, useNavigate } from 'react-router-dom'

const folders = [
  { key: 'All', label: 'Все письма', icon: '📥' },
  { key: 'Inbox', label: 'Входящие', icon: '📨' },
  { key: 'Work', label: 'Работа', icon: '💼' },
  { key: 'Personal', label: 'Личное', icon: '👤' },
  { key: 'Unread', label: 'Непрочитанные', icon: '🔔' },
]

function Sidebar({ counts, activeFolder, onFolderChange }) {
  const navigate = useNavigate()

  const handleFolderClick = (folderKey) => {
    onFolderChange(folderKey)
    navigate('/')
  }

  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-logo">✉️</div>
        <div>
          <h2 className="brand-title">John Mail</h2>
          <p className="brand-subtitle">React email client</p>
        </div>
      </div>

      <div className="route-nav">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? 'route-link route-link--active' : 'route-link'
          }
        >
          Почта
        </NavLink>

        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive ? 'route-link route-link--active' : 'route-link'
          }
        >
          О проекте
        </NavLink>
      </div>

      <nav className="folder-list">
        {folders.map((folder) => (
          <button
            key={folder.key}
            className={`folder-button ${
              activeFolder === folder.key ? 'folder-button--active' : ''
            }`}
            onClick={() => handleFolderClick(folder.key)}
          >
            <span className="folder-left">
              <span className="folder-icon">{folder.icon}</span>
              <span>{folder.label}</span>
            </span>

            <span className="folder-count">{counts[folder.key] ?? 0}</span>
          </button>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar