'use server'

import { cookies } from 'next/headers'
import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { revalidatePath } from 'next/cache'

export const addPost = async (formData: FormData) => {
  const content = formData.get('content')?.toString().trim()

  if (!content) {
    console.error('El contenido está vacío')
    return { error: 'El contenido está vacío' }
  }

  try {
    const supabase = createServerActionClient({ cookies })
    const { data: { user }, error: userError } = await supabase.auth.getUser()

    if (userError) throw new Error('Error al obtener el usuario')
    if (!user) return { error: 'Usuario no encontrado' }

    const { error: insertError } = await supabase.from('posts').insert({ content, user_id: user.id })
    if (insertError) throw new Error('Error al insertar el post')

    revalidatePath(`/?content=${encodeURIComponent(content)}`)
    return { success: true }
  } catch (err) {
    console.error(err)
    return { error: err.message }
  }
}

