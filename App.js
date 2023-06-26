import React from 'react'
import { BudgetsProvider } from './contexts/AppContexts'
import RootNavigator from './navigation/RootNavigator'
export default function App() {
  return (
    <BudgetsProvider>
      <RootNavigator />
    </BudgetsProvider>
  )
}
