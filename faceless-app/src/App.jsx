import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import LandingPage from './pages/LandingPage'
import ArchivePage from './pages/ArchivePage'
import LibraryPage from './pages/LibraryPage'
import ArticlePage from './pages/ArticlePage'
import AudioPlaybackPage from './pages/AudioPlaybackPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/archive" element={<ArchivePage />} />
          <Route path="/library" element={<LibraryPage />} />
          <Route path="/article/:slug" element={<ArticlePage />} />
          <Route path="/listen" element={<AudioPlaybackPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
