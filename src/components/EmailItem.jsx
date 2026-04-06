function EmailItem({
  email,
  isSelected,
  onSelect,
  onEdit,
  onDelete,
  onToggleRead,
}) {
  return (
    <article
      className={`email-card ${isSelected ? 'email-card--selected' : ''} ${
        !email.read ? 'email-card--unread' : ''
      }`}
      onClick={() => onSelect(email.id)}
    >
      <div className="email-card-top">
        <div className="email-meta">
          <span className="email-sender">{email.sender}</span>
          <span className={`email-badge email-badge--${email.folder.toLowerCase()}`}>
            {email.folder}
          </span>
        </div>

        <span className="email-date">{email.date}</span>
      </div>

      <h3 className="email-subject">{email.subject}</h3>
      <p className="email-preview">{email.message}</p>

      <div className="email-actions">
        <button
          className="action-button"
          onClick={(event) => {
            event.stopPropagation()
            onToggleRead(email.id)
          }}
        >
          {email.read ? 'Отметить непрочитанным' : 'Отметить прочитанным'}
        </button>

        <button
          className="action-button"
          onClick={(event) => {
            event.stopPropagation()
            onEdit(email)
          }}
        >
          Изменить
        </button>

        <button
          className="action-button action-button--danger"
          onClick={(event) => {
            event.stopPropagation()
            onDelete(email.id)
          }}
        >
          Удалить
        </button>
      </div>
    </article>
  )
}

export default EmailItem