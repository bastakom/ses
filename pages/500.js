import { getPageStaticProps } from '../utils/getPageStaticProps'

const Error = () => {
  return (
    <div className="bg-white">
      <h1 style={{ color: 'black' }}>Page Not Found 500</h1>
    </div>
  )
}

export default Error

export const getStaticProps = getPageStaticProps
