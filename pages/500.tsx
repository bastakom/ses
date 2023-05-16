const Error = () => {
  return (
    <div className="h-screen">
      <div className="bg-white h-5/6 flex flex-col items-center justify-center">
        <h1 style={{ color: 'black' }}>SERVER ERROR 500</h1>
        <p>Sidan du sökt på verkar ej finns 🥲</p>
        <button className="button mt-10">
          <a href="/">Tillbaka till startsidan</a>
        </button>
      </div>
    </div>
  )
}

export default Error
