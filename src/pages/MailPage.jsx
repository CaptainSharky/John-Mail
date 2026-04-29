import { useMemo } from 'react'

import SearchBar from '../components/SearchBar'
import EmailList from '../components/EmailList'

function MailPage({
  emails,
  activeFolder,
  searchTerm,
  isLoading,
  error,
  onSearchChange,
  onComposeClick,
  onReloadApi,
  onEdit,
  onDelete,
  onToggleRead,
  onMarkAsRead,
}) {
  const filteredEmails = useMemo(() => {
    return emails.filter((email) => {
      const matchesFolder =
        activeFolder === 'All'
          ? true
          : activeFolder === 'Unread'
            ? !email.read
            : email.folder === activeFolder

      const query = searchTerm.trim().toLowerCase()

      const matchesSearch =
        query.length === 0 ||
        email.sender.toLowerCase().includes(query) ||
        email.subject.toLowerCase().includes(query) ||
        email.message.toLowerCase().includes(query)

      return matchesFolder && matchesSearch
    })
  }, [emails, activeFolder, searchTerm])

  return (
    <>
      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={onSearchChange}
        onComposeClick={onComposeClick}
        onReloadApi={onReloadApi}
      />

      <section className="page-card">
        <div className="panel-header">
          <div>
            <h1 className="panel-title">Письма</h1>
            <p className="panel-subtitle">
              Найдено: {filteredEmails.length}
            </p>
          </div>
        </div>

        {isLoading && (
          <div className="status-message">
            Загрузка писем с API...
          </div>
        )}

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {!isLoading && (
          <EmailList
            emails={filteredEmails}
            onEdit={onEdit}
            onDelete={onDelete}
            onToggleRead={onToggleRead}
            onMarkAsRead={onMarkAsRead}
          />
        )}
      </section>
    </>
  )
}

export default MailPage