import { Route, Routes } from 'react-router-dom'

import Header from './components/common/header'
import Home from './pages/home'
import NotFoundPage from './pages/not-found'
import { IssueProvider } from './providers/issue-provider'

function App() {
  return (
    <IssueProvider>
      <Header />
      <Routes>
        <Route path={'/'} element={<Home />} />
        <Route path={'*'} element={<NotFoundPage />} />
      </Routes>
    </IssueProvider>
  )
}

export default App
