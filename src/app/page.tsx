import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { AuthButtonServer } from './components/auth-button-server'
import { ComposePost } from './components/compose-post'
import { PostLists } from './components/posts-list'

export default async function Home () {
  const supabase = createServerComponentClient({ cookies })
  const { data: { session } } = await supabase.auth.getSession()
  if (session === null) {
    redirect('/login')
  }
  const { data: post } = await supabase
    .from('posts')
    .select('*, user:users(name, avatar_url, user_name)')
    .order('created_at', { ascending: false })

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">

    <section className="max-w-[600px] w-full mx-auto border-l border-r border-white/20 min-h-screen">
      <ComposePost userAvatarUrl={session.user?.user_metadata?.avatar_url} />
      <PostLists post={post} />
    </section>
    <AuthButtonServer />
  </main>
  )
}
