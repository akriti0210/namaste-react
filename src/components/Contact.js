import React from 'react'

const Contact = () => {
  return (
    <div>
      <h1 className='font-bold text-2xl p-4 m-4'>Contact</h1>
      <form>
        <input type='text'
          className='border border-black p-2 m-2'
          placeholder='name'
        />
        <input type='text'
          className='border border-black p-2 m-2'
          placeholder='message'
        />
        <button name='submit'>Submit</button>
      </form>
    </div>
  )
}

export default Contact
