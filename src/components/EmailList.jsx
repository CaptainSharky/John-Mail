import EmailItem from './EmailItem'

function EmailList({
  emails,
  selectedEmailId,
  onSelect,
  onEdit,
  onDelete,
  onToggleRead,
}) {
  if (emails.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">📭</div>
        <h3>Ничего не найдено</h3>
        <p>Попробуй изменить поиск или выбрать другую категорию.</p>
      </div>
    )
  }

  return (
    <div className="email-list">
      {emails.map((email) => (
        <EmailItem
          key={email.id}
          email={email}
          isSelected={selectedEmailId === email.id}
          onSelect={onSelect}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggleRead={onToggleRead}
        />
      ))}
    </div>
  )
}

export default EmailList