// Composants composés avec Context
// http://localhost:3000/alone/exercise/02.js

/* eslint-disable no-unused-vars */
import * as React from 'react'
import '../tab.css'

// 🐶 Créé un contexte 'TabsContext'
// 🤖 utilise `React.createContext()`
const TabsContext = React.createContext()

function useTabs(){
  const context = React.useContext(TabsContext)
  if(!context){
    throw new Error('Please use this context in TabsContext provider');
  }
  return context
}

function Tabs({children, ...props}) {
  const [selectedTabId, setSelectedTabId] = React.useState(0)
  const selectTab = id => setSelectedTabId(id)

  return (
    <div className="tabs">
    <TabsContext.Provider value={{selectedTabId, selectTab}} {...props}>
      {children}
    </TabsContext.Provider>
    </div>
  )
}


function TabList({children, ...props}) {
  const clones = React.Children.map(children, (child, tabId) =>
    React.cloneElement(child, {
      tabId: tabId,
      ...props,
    }),
  )
  return (
    <div className="tab" {...props}>
      {clones}
    </div>
  )
}

function Tab({ tabId, children}) {
  const {selectedTabId, selectTab} = useTabs()
  return (
    <button
      key={children}
      className={selectedTabId === tabId ? 'tablinks active' : 'tablinks'}
      onClick={e => selectTab(tabId)}
    >
      {children}
    </button>
  )
}


function TabPanels({ children}) {
  return React.Children.map(children, (child, panelId) =>
    React.cloneElement(child, {
      className: 'tabcontent',
      panelId,
    }),
  )
}

function Panel({ panelId, children, ...props}) {
  const {selectedTabId} = useTabs()
  return selectedTabId === panelId ? <div {...props}>{children}</div> : null
}

function App() {
  return (
    <>
      <Tabs>
        <TabList>
          <Tab>Londre</Tab>
          <Tab>Paris</Tab>
          <Tab>Tokyo</Tab>
          <Tab>Bali</Tab>
        </TabList>
        <TabPanels>
          <Panel>💷 Inscription pour aller à Londre</Panel>
          <Panel>🥖 Inscription pour aller à Paris</Panel>
          <Panel>🗻 Inscription pour aller à Tokyo</Panel>
          <Panel>🗻 Inscription pour aller à Bali</Panel>
        </TabPanels>
        <small> * Ceci est un autre composant</small>
      </Tabs>
    </>
  )
}

export default App
