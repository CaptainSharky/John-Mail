function SearchBar({
  searchTerm,
  onSearchChange,
  onComposeClick,
  onReloadApi,
}) {
  return (
    <header className="topbar">
      <div className="search-box">
        <span className="search-icon">🔎</span>

        <input
          type="text"
          placeholder="Поиск по теме, отправителю или тексту..."
          value={searchTerm}
          onChange={(event) => onSearchChange(event.target.value)}
        />
      </div>

      <button className="api-button" onClick={onReloadApi}>
        Загрузить
      </button>

      <button className="compose-button" onClick={onComposeClick}>
        + Новое письмо
      </button>
    </header>
  )
}

export default SearchBar