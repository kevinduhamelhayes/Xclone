'use client'

import { ComposePostButton } from './compose-post-button'
import { addPost } from '../actions/add-post-action'
import { useRef } from 'react'

export function ComposePost ({
  userAvatarUrl
}: {
  userAvatarUrl: string
}) {
  const formRef = useRef<HTMLFormElement>(null)

  return (
<form ref={formRef} action={async (formData) => {
      await addPost(formData)
      formRef.current?.reset()
    }} className='flex flex-row p-3 border-b border-white/20 shadow-lg bg-gray-800'>
      <img className='rounded-full w-10 h-10 object-cover mr-4' src={userAvatarUrl} />
      <div className='flex flex-1 flex-col gap-y-4'>
      <textarea
        name='content'
        rows={4}
        className='w-full text-xl bg-black text-white placeholder-gray-300 p-3 border rounded-lg'
        placeholder='¡¿Qué está pasando!?'
      ></textarea>
        <button className='py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300'>
          Publicar
        </button>
      </div>
    </form>

  )
}