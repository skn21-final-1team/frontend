import { createContext, useContext } from 'react'

type SearchContextValue = {
  matchedIds: Set<number> | null
}

export const SearchContext = createContext<SearchContextValue>({
  matchedIds: null,
})

export const useSearchContext = () => useContext(SearchContext)
