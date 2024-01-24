import { useState, useRef } from 'react'

function App() {
  const inputRef = useRef()
  const [shortURL, setShortURL] = useState('')
  

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:5000/api/shorten', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          originalUrl: inputRef.current.value,
        }),
      })

      const data = await response.json()
      setShortURL(data.shortUrl)
    } catch (error) {
      console.error('Error shortening URL:', error)
    }
  }
  return (
    <main className='max-w-screen-lg mx-auto h-screen flex flex-col justify-center items-center px-8 py-4'>
      <div className='text-center mb-8'>
        <h1 className='text-4xl font-bold'>URL shortener</h1>
        <p className='text-[#414141] text-lg'>
          Shorten your URLs quickly and easily
        </p>
      </div>
      <form
        onSubmit={handleSubmit}
        className='flex flex-col sm:flex-row gap-4 pb-8 w-full justify-center items-center'
      >
        <input
          type='text'
          ref={inputRef}
          className='border border-gray-300 p-2 rounded w-full'
        />
        <button
          type='submit'
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        >
          Shorten
        </button>
      </form>
      <p>La url cortada es: http://localhost:5000/{shortURL}</p>
    </main>
  )
}

export default App
