import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <section className="page-card details-page">
      <div className="details-placeholder">
        <div className="details-placeholder-icon">404</div>
        <h3>Страница не найдена</h3>
        <p>Такого раздела в John Mail нет.</p>

        <Link className="primary-link" to="/">
          Вернуться на главную
        </Link>
      </div>
    </section>
  )
}

export default NotFoundPage