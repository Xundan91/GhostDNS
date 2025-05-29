'use client'
import { useRouter } from 'next/navigation'
// import { router } from 'next/router'
export default function page() {
  const router = useRouter()
  router.push('/login')
  return (<>heyy</>)
}
