import React from 'react'

function Error() {
  return (
    <div className="min-h-[calc(100vh-3.5rem)] grid place-items-center bg-primary-800 px-4">
      <div className="max-w-lg w-full rounded-lg bg-primary-700 border border-gray-700 p-8 text-center shadow-lg">
        <h1 className="text-6xl font-bold text-white">404</h1>
        <p className="mt-3 text-lg text-gray-300">Page Not Found</p>
        <div className="mt-6 flex justify-center gap-3">
          <a href="/" className="rounded-md bg-secondary-500 px-4 py-2 text-white hover:bg-secondary-600 transition">Home</a>
          <a href="/dashboard" className="rounded-md bg-accent-500 px-4 py-2 text-white hover:bg-accent-600 transition">Dashboard</a>
        </div>
      </div>
    </div>
  )
}

export default Error;