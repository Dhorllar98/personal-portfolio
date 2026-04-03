import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import BlogPostPage from './components/Blog/BlogPostPage'
import AdminLogin from './components/Admin/AdminLogin'
import AdminSubmissions from './components/Admin/AdminSubmissions'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/blog/:slug" element={<BlogPostPage />} />
      <Route path="/admin" element={<AdminLogin />} />
      <Route path="/admin/submissions" element={<AdminSubmissions />} />
    </Routes>
  )
}
