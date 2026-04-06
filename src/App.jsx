import { useEffect, useMemo, useState } from 'react'
import './App.css'

import Sidebar from './components/Sidebar'
import SearchBar from './components/SearchBar'
import EmailList from './components/EmailList'
import EmailDetails from './components/EmailDetails'
import EmailForm from './components/EmailForm'

const initialEmails = [
  {
    id: '1',
    sender: 'Анна Петрова',
    subject: 'Добро пожаловать в команду',
    message:
      'Привет! Рады видеть тебя в проекте. На этой неделе запланированы вводные встречи, после которых ты сможешь приступить к основной задаче.',
    folder: 'Work',
    read: false,
    date: '06 апр, 09:30',
  },
  {
    id: '2',
    sender: 'Code Academy',
    subject: 'Ваш новый курс уже доступен',
    message:
      'Открыт доступ к новому курсу по React. Внутри — практика по компонентам, state, props, событиям и работе со списками.',
    folder: 'Inbox',
    read: true,
    date: '05 апр, 18:10',
  },
  {
    id: '3',
    sender: 'Игорь Смирнов',
    subject: 'Встреча в пятницу',
    message:
      'Давай созвонимся в пятницу в 14:00 и обсудим дизайн интерфейса. Я подготовлю несколько референсов и замечаний по текущему экрану.',
    folder: 'Personal',
    read: false,
    date: '05 апр, 13:45',
  },
  {
    id: '4',
    sender: 'HR Department',
    subject: 'Обновление по отпуску',
    message:
      'Напоминаем, что график отпусков на следующий квартал необходимо заполнить до конца недели. Если нужны изменения, сообщите заранее.',
    folder: 'Work',
    read: true,
    date: '04 апр, 11:20',
  },
  {
    id: '5',
    sender: 'Мария Волкова',
    subject: 'Список покупок',
    message:
      'Купи, пожалуйста: молоко, хлеб, сыр и кофе. Если увидишь хороший чай, тоже возьми одну упаковку.',
    folder: 'Personal',
    read: true,
    date: '03 апр, 19:05',
  },
]

function createId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

function getCurrentDateLabel() {
  return new Date().toLocaleString('ru-RU', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function App() {
  const [emails, setEmails] = useState(initialEmails)
  const [activeFolder, setActiveFolder] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingEmail, setEditingEmail] = useState(null)
  const [selectedEmailId, setSelectedEmailId] = useState(initialEmails[0]?.id ?? null)

  const counts = useMemo(() => {
    return {
      All: emails.length,
      Inbox: emails.filter((email) => email.folder === 'Inbox').length,
      Work: emails.filter((email) => email.folder === 'Work').length,
      Personal: emails.filter((email) => email.folder === 'Personal').length,
      Unread: emails.filter((email) => !email.read).length,
    }
  }, [emails])

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

  const selectedEmail =
    emails.find((email) => email.id === selectedEmailId) ?? null

  useEffect(() => {
    if (filteredEmails.length === 0) {
      setSelectedEmailId(null)
      return
    }

    const existsInFiltered = filteredEmails.some(
      (email) => email.id === selectedEmailId
    )

    if (!existsInFiltered) {
      setSelectedEmailId(filteredEmails[0].id)
    }
  }, [filteredEmails, selectedEmailId])

  const openCreateForm = () => {
    setEditingEmail(null)
    setIsFormOpen(true)
  }

  const openEditForm = (email) => {
    setEditingEmail(email)
    setIsFormOpen(true)
  }

  const closeForm = () => {
    setEditingEmail(null)
    setIsFormOpen(false)
  }

  const handleSaveEmail = (formData) => {
    if (editingEmail) {
      setEmails((prevEmails) =>
        prevEmails.map((email) =>
          email.id === editingEmail.id
            ? { ...email, ...formData }
            : email
        )
      )
    } else {
      const newEmail = {
        id: createId(),
        sender: formData.sender,
        subject: formData.subject,
        message: formData.message,
        folder: formData.folder,
        read: false,
        date: getCurrentDateLabel(),
      }

      setEmails((prevEmails) => [newEmail, ...prevEmails])
      setSelectedEmailId(newEmail.id)
    }

    closeForm()
  }

  const handleDeleteEmail = (id) => {
    setEmails((prevEmails) => prevEmails.filter((email) => email.id !== id))

    if (selectedEmailId === id) {
      setSelectedEmailId(null)
    }
  }

  const handleSelectEmail = (id) => {
    setSelectedEmailId(id)

    setEmails((prevEmails) =>
      prevEmails.map((email) =>
        email.id === id ? { ...email, read: true } : email
      )
    )
  }

  const handleToggleRead = (id) => {
    setEmails((prevEmails) =>
      prevEmails.map((email) =>
        email.id === id ? { ...email, read: !email.read } : email
      )
    )
  }

  return (
    <>
      <div className="app-shell">
        <Sidebar
          counts={counts}
          activeFolder={activeFolder}
          onFolderChange={setActiveFolder}
        />

        <main className="content">
          <SearchBar
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            onComposeClick={openCreateForm}
          />

          <section className="mail-layout">
            <div className="mail-list-panel">
              <div className="panel-header">
                <div>
                  <h1 className="panel-title">Письма</h1>
                  <p className="panel-subtitle">
                    Найдено: {filteredEmails.length}
                  </p>
                </div>
              </div>

              <EmailList
                emails={filteredEmails}
                selectedEmailId={selectedEmailId}
                onSelect={handleSelectEmail}
                onEdit={openEditForm}
                onDelete={handleDeleteEmail}
                onToggleRead={handleToggleRead}
              />
            </div>

            <div className="mail-details-panel">
              <EmailDetails email={selectedEmail} />
            </div>
          </section>
        </main>
      </div>

      {isFormOpen && (
        <EmailForm
          initialData={editingEmail}
          onClose={closeForm}
          onSave={handleSaveEmail}
        />
      )}
    </>
  )
}

export default App