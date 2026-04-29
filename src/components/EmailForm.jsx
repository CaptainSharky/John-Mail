import { useEffect, useState } from 'react'

const defaultForm = {
  sender: '',
  subject: '',
  message: '',
  folder: 'Inbox',
}

function EmailForm({ initialData, onClose, onSave }) {
  const [formData, setFormData] = useState(defaultForm)

  useEffect(() => {
    if (initialData) {
      setFormData({
        sender: initialData.sender,
        subject: initialData.subject,
        message: initialData.message,
        folder: initialData.folder,
      })
    } else {
      setFormData(defaultForm)
    }
  }, [initialData])

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const preparedData = {
      sender: formData.sender.trim(),
      subject: formData.subject.trim(),
      message: formData.message.trim(),
      folder: formData.folder,
    }

    if (
      !preparedData.sender ||
      !preparedData.subject ||
      !preparedData.message
    ) {
      return
    }

    onSave(preparedData)
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(event) => event.stopPropagation()}>
        <div className="modal-header">
          <h2>{initialData ? 'Изменить письмо' : 'Новое письмо'}</h2>

          <button className="modal-close" onClick={onClose}>
            ✕
          </button>
        </div>

        <form className="email-form" onSubmit={handleSubmit}>
          <label>
            Отправитель
            <input
              type="text"
              name="sender"
              value={formData.sender}
              onChange={handleChange}
              placeholder="Например: Иван Иванов"
            />
          </label>

          <label>
            Тема
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Введите тему письма"
            />
          </label>

          <label>
            Категория
            <select
              name="folder"
              value={formData.folder}
              onChange={handleChange}
            >
              <option value="Inbox">Inbox</option>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
            </select>
          </label>

          <label>
            Сообщение
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Введите текст письма"
              rows="7"
            />
          </label>

          <div className="form-actions">
            <button type="button" className="secondary-button" onClick={onClose}>
              Отмена
            </button>

            <button type="submit" className="primary-button">
              {initialData ? 'Сохранить' : 'Добавить'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EmailForm