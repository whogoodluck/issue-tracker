import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState
} from 'react'

import { Issue } from '@/types/issue'

interface IssuesContextType {
  issues: Issue[]
  setIssues: Dispatch<SetStateAction<Issue[]>>
}

const IssuesContext = createContext<IssuesContextType>({
  issues: [],
  setIssues: () => []
})

interface IssueProviderProps {
  children: ReactNode
}

export function IssueProvider({ children }: IssueProviderProps) {
  const [issues, setIssues] = useState<Issue[]>([])

  return (
    <IssuesContext.Provider value={{ issues, setIssues }}>
      {children}
    </IssuesContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useIssue = () => {
  return useContext(IssuesContext)
}
