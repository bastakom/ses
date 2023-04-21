import { useRouter } from 'next/router'

const LanguageSwitcher = () => {
  const router = useRouter()

  const { pathname, query } = router

  console.log('pathname', pathname)
  console.log('query', query)

  const handleChangeLanguage = (lang) => {
    const { pathname, query } = router
    router.push(
      { pathname, query: { ...query, slug: router.query.slug } },
      pathname,
      { locale: lang }


    )
  }

  return (
    <div>
      <button
        onClick={() => handleChangeLanguage('en')}
        className="m-5"
      >
        EN
      </button>
      <button onClick={() => handleChangeLanguage('sv')}>
        SE
      </button>
    </div>
  )
}

export default LanguageSwitcher
