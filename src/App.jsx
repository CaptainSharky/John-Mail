import { useCallback, useEffect, useMemo, useState } from 'react'
import { Route, Routes } from 'react-router-dom'

import './App.css'

import Sidebar from './components/Sidebar'
import EmailForm from './components/EmailForm'

import MailPage from './pages/MailPage'
import EmailPage from './pages/EmailPage'
import AboutPage from './pages/AboutPage'
import NotFoundPage from './pages/NotFoundPage'

import { fetchEmailsFromApi } from './api/mailApi'

const STORAGE_KEY = 'john-mail-emails'

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
  const [emails, setEmails] = useState([])
  const [activeFolder, setActiveFolder] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')

  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingEmail, setEditingEmail] = useState(null)

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [isLoaded, setIsLoaded] = useState(false)

  const loadEmailsFromApi = useCallback(async () => {
    try {
      setIsLoading(true)
      setError('')

      const apiEmails = await fetchEmailsFromApi()
      setEmails(apiEmails)
    } catch (err) {
      setError('Не удалось загрузить письма с API')
      console.error(err)
    } finally {
      setIsLoading(false)
      setIsLoaded(true)
    }
  }, [])

  useEffect(() => {
    const savedEmails = localStorage.getItem(STORAGE_KEY)

    if (savedEmails) {
      setEmails(JSON.parse(savedEmails))
      setIsLoaded(true)
    } else {
      loadEmailsFromApi()
    }
  }, [loadEmailsFromApi])

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(emails))
    }
  }, [emails, isLoaded])

  const counts = useMemo(() => {
    return {
      All: emails.length,
      Inbox: emails.filter((email) => email.folder === 'Inbox').length,
      Work: emails.filter((email) => email.folder === 'Work').length,
      Personal: emails.filter((email) => email.folder === 'Personal').length,
      Unread: emails.filter((email) => !email.read).length,
    }
  }, [emails])

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
            ? {
                ...email,
                ...formData,
              }
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
        source: 'user',
      }

      setEmails((prevEmails) => [newEmail, ...prevEmails])
    }

    closeForm()
  }

  const handleDeleteEmail = (id) => {
    setEmails((prevEmails) => prevEmails.filter((email) => email.id !== id))
  }

  const handleToggleRead = (id) => {
    setEmails((prevEmails) =>
      prevEmails.map((email) =>
        email.id === id
          ? {
              ...email,
              read: !email.read,
            }
          : email
      )
    )
  }

  const handleMarkAsRead = (id) => {
    setEmails((prevEmails) =>
      prevEmails.map((email) =>
        email.id === id
          ? {
              ...email,
              read: true,
            }
          : email
      )
    )
  }

  const handleReloadApi = () => {
    localStorage.removeItem(STORAGE_KEY)
    loadEmailsFromApi()
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
          <Routes>
            <Route
              path="/"
              element={
                <MailPage
                  emails={emails}
                  activeFolder={activeFolder}
                  searchTerm={searchTerm}
                  isLoading={isLoading}
                  error={error}
                  onSearchChange={setSearchTerm}
                  onComposeClick={openCreateForm}
                  onReloadApi={handleReloadApi}
                  onEdit={openEditForm}
                  onDelete={handleDeleteEmail}
                  onToggleRead={handleToggleRead}
                  onMarkAsRead={handleMarkAsRead}
                />
              }
            />

            <Route
              path="/emails/:emailId"
              element={
                <EmailPage
                  emails={emails}
                  onEdit={openEditForm}
                  onDelete={handleDeleteEmail}
                  onToggleRead={handleToggleRead}
                  onMarkAsRead={handleMarkAsRead}
                />
              }
            />

            <Route path="/about" element={<AboutPage />} />

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
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