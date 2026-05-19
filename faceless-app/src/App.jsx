import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Layout from './components/layout/Layout'
import LandingPage from './pages/LandingPage'
import ArchivePage from './pages/ArchivePage'
import LibraryPage from './pages/LibraryPage'
import ArticlePage from './pages/ArticlePage'
import AudioPlaybackPage from './pages/AudioPlaybackPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ForgotPassphrasePage from './pages/ForgotPassphrasePage'
import RegistrationSuccessPage from './pages/RegistrationSuccessPage'
import ManifestoPage from './pages/ManifestoPage'
import AdminPage from './pages/AdminPage'

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Registration Success — standalone layout */}
          <Route path="/registration-success" element={<RegistrationSuccessPage />} />

          {/* Admin Console — standalone layout */}
          <Route path="/admin" element={<AdminPage />} />

          {/* All pages with shared Navbar + Footer */}
          <Route element={<Layout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/archive" element={<ArchivePage />} />
            <Route path="/library" element={<LibraryPage />} />
            <Route path="/article/:slug" element={<ArticlePage />} />
            <Route path="/listen" element={<AudioPlaybackPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-passphrase" element={<ForgotPassphrasePage />} />
            <Route path="/manifesto" element={<ManifestoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
