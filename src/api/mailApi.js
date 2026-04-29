const API_URL = 'https://jsonplaceholder.typicode.com'

function getFolderByPostId(id) {
  if (id % 3 === 0) return 'Work'
  if (id % 3 === 1) return 'Inbox'
  return 'Personal'
}

function getDateLabel(index) {
  const date = new Date()
  date.setHours(date.getHours() - index * 3)

  return date.toLocaleString('ru-RU', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export async function fetchEmailsFromApi() {
  const [postsResponse, usersResponse] = await Promise.all([
    fetch(`${API_URL}/posts?_limit=12`),
    fetch(`${API_URL}/users`),
  ])

  if (!postsResponse.ok || !usersResponse.ok) {
    throw new Error('Ошибка загрузки данных с API')
  }

  const posts = await postsResponse.json()
  const users = await usersResponse.json()

  return posts.map((post, index) => {
    const user = users.find((item) => item.id === post.userId)

    return {
      id: `api-${post.id}`,
      sender: user?.name || 'Unknown Sender',
      subject: post.title,
      message: post.body,
      folder: getFolderByPostId(post.id),
      read: post.id % 2 === 0,
      date: getDateLabel(index),
      source: 'api',
    }
  })
}