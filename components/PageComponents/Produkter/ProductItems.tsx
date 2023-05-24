import ProduktHead from '@/components/Template/ProduktHead/ProduktHead'
import Link from 'next/link'
import styles from './productitems.module.scss'
import Image from 'next/image'
import placeholder from '@/assets/images/placeholder.png'
import Layout from '@/components/Template/Layout/Layout'
import LoadingSkeleton from '@/components/Template/LoadingSkeleton/LoadingSkeleton'
import { useRouter } from 'next/router'

const ProductItems = ({ response, options }) => {
  const router = useRouter()
  const { locale } = router
  const SV = locale === 'sv'
  const skyddsmasker = response.map((data) => {
    const {
      products: { cat, product_pictures, description, description_engelska },
      title: { rendered }
    } = data

    const maxLength = 120
    let limitedDescription = SV
      ? description.substring(0, maxLength)
      : description_engelska?.substring(0, maxLength) ||
        description.substring(0, maxLength)
    if (description.length > maxLength) {
      limitedDescription += '...'
    }

    return (
      <>
        {cat === 'skyddsmasker' ? (
          <div className={`${styles.item_container}`}>
            <Link href={`/produkter/${data.slug}`}>
              <>
                <LoadingSkeleton>
                  <Image
                    src={product_pictures[0]?.url || placeholder}
                    width={400}
                    height={400}
                    alt={'Produktbild'}
                  />
                </LoadingSkeleton>
              </>
              <>
                {rendered && <h2>{rendered}</h2>}
                <div
                  style={{ maxWidth: 400 }}
                  dangerouslySetInnerHTML={{ __html: limitedDescription }}
                />
              </>
            </Link>
          </div>
        ) : null}
      </>
    )
  })
  const tillbehor = response.map((data) => {
    const {
      products: { cat, product_pictures, description, description_engelska },
      title: { rendered }
    } = data

    const maxLength = 120
    let limitedDescription = SV
      ? description.substring(0, maxLength)
      : description_engelska?.substring(0, maxLength) ||
        description.substring(0, maxLength)

    if (description.length > maxLength) {
      limitedDescription += '...'
    }

    return (
      <>
        {cat === 'tillbehör' ? (
          <div className={`${styles.item_container}`}>
            <Link href={`/produkter/${data.slug}`}>
              <div>
                <LoadingSkeleton>
                  <Image
                    src={product_pictures[0]?.url || placeholder}
                    width={400}
                    height={400}
                    alt={'Produktbild'}
                  />
                </LoadingSkeleton>
              </div>
              <div>
                {rendered && <h2>{rendered}</h2>}
                <div
                  style={{ maxWidth: 400 }}
                  dangerouslySetInnerHTML={{
                    __html: limitedDescription
                  }}
                />
              </div>
            </Link>
          </div>
        ) : null}
      </>
    )
  })

  const skyddsdrakter = response.map((data) => {
    const {
      products: { cat, product_pictures, description, description_engelska },
      title: { rendered }
    } = data

    const maxLength = 120
    let limitedDescription = SV
      ? description.substring(0, maxLength)
      : description_engelska?.substring(0, maxLength) ||
        description.substring(0, maxLength)

    if (description.length > maxLength) {
      limitedDescription += '...'
    }
    return (
      <>
        {cat === 'skyddsdräkter' ? (
          <div className={`${styles.item_container}`}>
            <Link href={`/produkter/${data.slug}`}>
              <>
                <LoadingSkeleton>
                  <Image
                    src={product_pictures[0]?.url || placeholder}
                    width={400}
                    height={400}
                    alt={'Produktbild'}
                  />
                </LoadingSkeleton>
              </>
              <>
                {rendered && <h2>{rendered}</h2>}
                <div
                  style={{ maxWidth: 400 }}
                  dangerouslySetInnerHTML={{ __html: limitedDescription }}
                />
              </>
            </Link>
          </div>
        ) : null}
      </>
    )
  })

  return (
    <Layout>
      <div className={`${styles.container}`}>
        <ProduktHead title={locale === 'sv' ? 'PRODUKTER' : 'PRODUCTS'} />
        <ul
          className={`flex gap-10 mb-20 uppercase items-center justify-center ${styles.pagination}`}
        >
          <li>
            <a href="#skyddsmasker">
              {locale === 'sv' ? '# Skyddsmasker' : '# PROTECTIVE MASKS'}
            </a>
          </li>
          <li>
            <a href="#tillbehör">
              {locale === 'sv' ? '# Tillbehör' : '# Accessories'}
            </a>
          </li>
          <li>
            <a href="#skyddsdräkter">
              {locale === 'sv' ? '# skyddsdräkter' : '# protective suits'}
            </a>
          </li>
        </ul>

        <div id="skyddsmasker">
          <div className={styles.inner_container}>
            <div className={styles.inner_container_head}>
              <h2>{SV ? 'Skyddsmasker' : 'PROTECTIVE MASKS'}</h2>
              <p>
                {locale === 'sv'
                  ? options.skyddsmasker
                  : options.skyddsmasker_engelska || options.skyddsmasker}
              </p>
            </div>
            <div
              className={`flex gap-5 md:items-start ml-5 mr-5 items-center md:flex-wrap flex-col mt-10 mb-10 md:flex-row`}
            >
              {skyddsmasker}
            </div>
          </div>
        </div>

        <div id="tillbehör">
          <div className={styles.inner_container}>
            <div className={styles.inner_container_head}>
              <h2>{SV ? 'Tillbehör' : 'ACCESSORIES'}</h2>
              <p>
                {locale === 'sv'
                  ? options.tillbehor
                  : options.tillbehor_engelska || options.tillbehor}
              </p>
            </div>
            <div
              className={`flex gap-5 md:items-start ml-5 mr-5 items-center md:flex-wrap flex-col mt-10 mb-10 md:flex-row`}
            >
              {tillbehor}
            </div>
          </div>
        </div>

        <div id="skyddsdräkter">
          <div className={styles.inner_container}>
            <div className={styles.inner_container_head}>
              <h2>{SV ? 'Skyddsdräkter' : 'PROTECTIVE SUITS'}</h2>
              <p>
                {locale === 'sv'
                  ? options.skyddsdrakter
                  : options.skyddsdrakter_engelska || options.skyddsdrakter}
              </p>
            </div>
            <div
              className={`flex gap-5 md:items-start ml-5 mr-5 items-center md:flex-wrap flex-col mt-10 mb-10 md:flex-row`}
            >
              {skyddsdrakter}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default ProductItems
