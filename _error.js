import { getPageStaticProps } from './utils/getPageStaticProps'

const ErrorPage = () => {
  return (
    <div className="bg-white">
      <h1 style={{ color: 'black' }}>Page Not Found</h1>
    </div>
  )
}

export default ErrorPage

export const getStaticProps = getPageStaticProps
