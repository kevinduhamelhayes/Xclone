import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { type NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')

  if (code) {
    try {
      const supabase = createRouteHandlerClient({ cookies })
      const { error } = await supabase.auth.exchangeCodeForSession(code)

      if (error) {
        console.error('Error en el intercambio de código:', error)
        return NextResponse.redirect('/error') // Redirige a una página de error
      }

      // Redirige a una página de éxito o de inicio
      return NextResponse.redirect('/success')
    } catch (err) {
      console.error('Error de servidor:', err)
      return NextResponse.redirect('/error')
    }
  }

  return NextResponse.redirect(requestUrl.origin)
}
