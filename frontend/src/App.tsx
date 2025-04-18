import { Toaster } from 'react-hot-toast'
import { Route, Routes } from 'react-router-dom'

import Header from './components/common/header'
import CreateIssuePage from './pages/create-issue-page'
import Home from './pages/home'
import IssueDetails from './pages/issue-details'
import NotFoundPage from './pages/not-found'
import { IssueProvider } from './providers/issue-provider'

function App() {
  return (
    <IssueProvider>
      <Header />
      <Routes>
        <Route path={'/'} element={<Home />} />
        <Route path={'/issues/:id'} element={<IssueDetails />} />
        <Route path={'/create'} element={<CreateIssuePage />} />
        <Route path={'*'} element={<NotFoundPage />} />
      </Routes>
      <Toaster />
    </IssueProvider>
  )
}

export default App
