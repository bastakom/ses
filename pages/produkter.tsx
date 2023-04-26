import { getProdukter } from '@/graphql/PostTypes/produkter'
import Link from 'next/link'
import { getOptions } from '@/graphql/Templates/FETCHOptions'

const Home = ({ response }) => {
  const skyddsmasker = response.map((data) => {
    const {
      products: { cat }
    } = data
    return (
      <>
        {cat === 'skyddsmasker' ? (
          <div>
            <Link href={`/produkter/${data.slug}`}>{data.slug}</Link>
          </div>
        ) : null}
      </>
    )
  })

  const Tillbehor = response.map((data) => {
    const {
      products: { cat }
    } = data
    return (
      <>
        {cat === 'tillbehör' ? (
          <div>
            <Link href={`/produkter/${data.slug}`}>{data.slug}</Link>
          </div>
        ) : null}
      </>
    )
  })

  const Skyddsdrakter = response.map((data) => {
    const {
      products: { cat }
    } = data
    return (
      <>
        {cat === 'skyddsdräkter' ? (
          <div>
            <Link href={`/produkter/${data.slug}`}>{data.slug}</Link>
          </div>
        ) : null}
      </>
    )
  })

  return (
    <div className="bg-white py-24 sm:py-32 mt-3 flex flex-col m-3">
      <ul className="flex gap-10 mb-20">
        <li>
          <a href="#skyddsmasker">Skyddsmasker</a>
        </li>
        <li>
          <a href="#tillbehör">Tillbehör</a>
        </li>
        <li>
          <a href="#skyddsdräkter">skyddsdrakter</a>
        </li>
      </ul>
      <div className="h-96" id="skyddsmasker">
        <h1>Skyddsmasker</h1>
        {skyddsmasker}
      </div>
      <div className="h-96" id="tillbehör">
        <h1>Tillbehör</h1>
        {Tillbehor}
      </div>
      <div className="h-96" id="skyddsdräkter">
        <h1>Skyddsdräkter</h1>
        {Skyddsdrakter}
      </div>
    </div>
  )
}

export const getServerSideProps = async ({ locale }) => {
  const options = await getOptions()
  const response = await getProdukter(locale)

  return {
    props: {
      response,
      options
    }
  }
}

export default Home
