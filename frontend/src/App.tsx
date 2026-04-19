import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import NotFoundPage from './pages/NotFoundPage'
import BlogPostPage from './components/Blog/BlogPostPage'
import AdminLogin from './components/Admin/AdminLogin'
import AdminSubmissions from './components/Admin/AdminSubmissions'
import TipsLoader, { shouldShowTip } from './components/TipsLoader/TipsLoader'

export default function App() {
  // Show the tip loader once per browser session on the homepage only
  const [showTip, setShowTip] = useState(() => shouldShowTip())

  return (
    <>
      {showTip && <TipsLoader onDone={() => setShowTip(false)} />}
      <Routes>
        <Route path="/"                     element={<HomePage />} />
        <Route path="/blog/:slug"           element={<BlogPostPage />} />
        <Route path="/admin"                element={<AdminLogin />} />
        <Route path="/admin/submissions"    element={<AdminSubmissions />} />
        <Route path="*"                     element={<NotFoundPage />} />
      </Routes>
    </>
  )
}
