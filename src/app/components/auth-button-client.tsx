'use client'

import { type Session, createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { Button } from '@nextui-org/react'



export function AuthButton ({ session }: { session: Session | null }) {
  const supabase = createClientComponentClient()
  const router = useRouter()

  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: 'http://localhost:3000/auth/callback'
      }
    })
  }

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut()
      router.refresh()
    } catch (error) {
      console.error('Error during sign out:', error);
    }
  }

  return (
    <header>
      {
        session === null
          ? (
            <Button onClick={handleSignIn} color="primary" >
              Iniciar sesión con Github
            </Button>
            )
          : <Button onClick={handleSignOut} color="warning" >
              Cerrar sesión
            </Button>
      }
    </header>
  )
}