import { Link } from 'react-router-dom'

function AboutPage() {
  return (
    <section className="page-card about-page">
      <div className="about-hero">
        <div className="about-icon">✉️</div>

        <div>
          <h1>О проекте John Mail</h1>
          <p>
            John Mail — учебный мини-клиент электронной почты на React.
            В проекте реализованы компоненты, props, state, события,
            списки, условный рендеринг, работа с API, маршрутизация и
            общее состояние.
          </p>
        </div>
      </div>

      <div className="about-grid">
        <article className="about-card">
          <h3>useEffect</h3>
          <p>
            Используется для первичной загрузки писем из LocalStorage или API,
            а также для автоматического сохранения писем в LocalStorage.
          </p>
        </article>

        <article className="about-card">
          <h3>API</h3>
          <p>
            Письма загружаются с внешнего API JSONPlaceholder через fetch.
            Полученные данные преобразуются в формат писем приложения.
          </p>
        </article>

        <article className="about-card">
          <h3>Routing</h3>
          <p>
            В приложении есть несколько страниц: список писем, страница
            конкретного письма и страница описания проекта.
          </p>
        </article>

        <article className="about-card">
          <h3>Sharing State</h3>
          <p>
            Основное состояние хранится в App и передается дочерним
            компонентам через props.
          </p>
        </article>
      </div>

      <Link className="primary-link" to="/">
        Перейти к почте
      </Link>
    </section>
  )
}

export default AboutPage