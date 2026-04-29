import { Link } from 'react-router-dom'

function EmailItem({
  email,
  onEdit,
  onDelete,
  onToggleRead,
  onMarkAsRead,
}) {
  return (
    <article
      className={`email-card ${!email.read ? 'email-card--unread' : ''}`}
    >
      <Link
        className="email-card-link"
        to={`/emails/${email.id}`}
        onClick={() => onMarkAsRead(email.id)}
      >
        <div className="email-card-top">
          <div className="email-meta">
            <span className="email-sender">{email.sender}</span>

            <span
              className={`email-badge email-badge--${email.folder.toLowerCase()}`}
            >
              {email.folder}
            </span>

            {email.source === 'api' && (
              <span className="source-badge">
                API
              </span>
            )}
          </div>

          <span className="email-date">{email.date}</span>
        </div>

        <h3 className="email-subject">{email.subject}</h3>
        <p className="email-preview">{email.message}</p>
      </Link>

      <div className="email-actions">
        <button
          className="action-button"
          onClick={() => onToggleRead(email.id)}
        >
          {email.read ? 'Отметить непрочитанным' : 'Отметить прочитанным'}
        </button>

        <button
          className="action-button"
          onClick={() => onEdit(email)}
        >
          Изменить
        </button>

        <button
          className="action-button action-button--danger"
          onClick={() => onDelete(email.id)}
        >
          Удалить
        </button>
      </div>
    </article>
  )
}

export default EmailItem