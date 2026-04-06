function EmailDetails({ email }) {
  if (!email) {
    return (
      <div className="details-placeholder">
        <div className="details-placeholder-icon">📩</div>
        <h3>Выбери письмо</h3>
        <p>Здесь отобразится полный текст выбранного сообщения.</p>
      </div>
    )
  }

  return (
    <div className="details-card">
      <div className="details-header">
        <div>
          <p className="details-label">Отправитель</p>
          <h3>{email.sender}</h3>
        </div>

        <div className="details-date-block">
          <p className="details-label">Дата</p>
          <span>{email.date}</span>
        </div>
      </div>

      <div className="details-subject-block">
        <p className="details-label">Тема</p>
        <h2>{email.subject}</h2>
      </div>

      <div className="details-message">
        <p className="details-label">Сообщение</p>
        <p>{email.message}</p>
      </div>
    </div>
  )
}

export default EmailDetails