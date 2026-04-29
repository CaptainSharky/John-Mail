import { Link, useNavigate, useParams } from 'react-router-dom'

import EmailDetails from '../components/EmailDetails'

function EmailPage({
  emails,
  onEdit,
  onDelete,
  onToggleRead,
  onMarkAsRead,
}) {
  const { emailId } = useParams()
  const navigate = useNavigate()

  const email = emails.find((item) => item.id === emailId)

  if (!email) {
    return (
      <section className="page-card details-page">
        <div className="details-placeholder">
          <div className="details-placeholder-icon">📭</div>
          <h3>Письмо не найдено</h3>
          <p>Возможно, оно было удалено или ссылка устарела.</p>

          <Link className="primary-link" to="/">
            Вернуться к письмам
          </Link>
        </div>
      </section>
    )
  }

  const handleDelete = () => {
    onDelete(email.id)
    navigate('/')
  }

  const handleEdit = () => {
    onEdit(email)
  }

  const handleToggleRead = () => {
    onToggleRead(email.id)
  }

  return (
    <section className="page-card details-page">
      <div className="details-toolbar">
        <Link className="secondary-link" to="/">
          ← Назад к письмам
        </Link>

        <div className="details-actions">
          <button className="action-button" onClick={handleToggleRead}>
            {email.read ? 'Сделать непрочитанным' : 'Сделать прочитанным'}
          </button>

          <button className="action-button" onClick={handleEdit}>
            Изменить
          </button>

          <button
            className="action-button action-button--danger"
            onClick={handleDelete}
          >
            Удалить
          </button>
        </div>
      </div>

      <EmailDetails email={email} />
    </section>
  )
}

export default EmailPage