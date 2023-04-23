import React from 'react'

const ErrorPage = () => {
  return (
    <div>
      <h1>Page Not Found</h1>
    </div>
  )
}

export const getServersideProps = async () => {
  const menuItems = await getMainMenu()

  return {
    props: {
      menuItems
    }
  }
}

export default ErrorPage
