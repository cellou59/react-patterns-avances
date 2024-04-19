// Composants composés
// 🚀 Tabs composant composés
// http://localhost:3000/alone/exercise/01.bonus-1.js

/* eslint-disable no-unused-vars */
import * as React from 'react'
import {default as TabsComponent} from '../tab'

const options = [
  {title: 'London', display: 'London is the capital city of England.'},
  {title: 'Paris', display: 'Paris is the capital of France.'},
  {title: 'Tokyo', display: 'Tokyo is the capital of Japan.'},
]


function CompoundComponentParent({children}) {
  const [selectedTabId, setSelectedTabId] = React.useState(0)
  const selectTab = id => setSelectedTabId(id)

  // 🐶 remplace <TabsComponent> en clonant tous les enfants (children)
  // Pour parcourir tous les children utilise `React.Children.map`
  // Pour cloner utilise `React.cloneElement`
  // lors du clone passe les props 'selectedTabId' et 'selectTab'
  // 🤖
  return React.Children.map(children, child =>React.cloneElement(child, {
    selectedTabId: selectedTabId,
    selectTab: selectTab,
  }),)
  // 📑 https://fr.reactjs.org/docs/react-api.html#reactchildren
  // 📑 https://fr.reactjs.org/docs/react-api.html#cloneelement
  
}

// 🐶 Accepte les props 'selectedTabId' et'children' pour les 3 composants London,Paris,Tokyo

function London({selectedTabId, children}) {
  // 🐶 conditionne l'affichage de `<div>{children}</div>` si l'onglet selectionné est 'Londre'
  // 🤖 selectedTabId === 0
  return selectedTabId === 0 ?<div>{children}</div> : null
}

function Paris({selectedTabId, children}) {
  // 🐶 conditionne l'affichage de `<div>{children}</div>` si l'onglet selectionné est 'Paris'
  return selectedTabId === 1 ?<div>{children}</div> : null
}

function Tokyo({selectedTabId, children}) {
  // 🐶 conditionne l'affichage de `<div>{children}</div>` si l'onglet selectionné est 'Tokyo'
  return selectedTabId === 2 ?<div>{children}</div> : null
}


function Tabs({children, ...props}) {
  const [selectedTabId, setSelectedTabId] = React.useState(0)
  const selectTab = id => setSelectedTabId(id)
  const clones = React.Children.map(children, child => {
    return typeof child.type === 'string'
      ? child
      : React.cloneElement(child, {
          selectedTabId: selectedTabId,
          selectTab: selectTab,
          ...props,
        })
  })
  return (
    <div className="tabs" {...props}>
      {clones}
    </div>
  )
}
function TabList({children, selectedTabId, selectTab, ...props}) {
  const clones = React.Children.map(children, (child, tabId) =>
    React.cloneElement(child, {
      selectedTabId,
      tabId,
      selectTab,
      ...props,
    }),
  )
  return (
    <div className="tab" {...props}>
      {clones}
    </div>
  )
}
function Tab({selectedTabId, selectTab, tabId, children}) {
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

function TabPanels({selectedTabId, children}) {
  return React.Children.map(children, (child, panelId) =>
    React.cloneElement(child, {
      selectedTabId,
      panelId,
      className: 'tabcontent',
    }),
  )
}

function Panel({selectedTabId, panelId, children, ...props}) {
  return selectedTabId === panelId ? <div {...props}>{children}</div> : null
}
function App() {
  return (
    <Tabs>
      <TabList>
        <Tab>Londre</Tab>
        <Tab>Paris</Tab>
        <Tab>Tokyo</Tab>
      </TabList>
      <TabPanels>
        <Panel>💷 Inscription pour aller à Londre</Panel>
        <Panel>🥖 Inscription pour aller à Paris</Panel>
        <Panel>🗻 Inscription pour aller à Tokyo</Panel>
      </TabPanels>
      <small> * Ceci est un autre composant</small>
      <div> * Ceci est un autre div</div>
    </Tabs>
  )
}

export default App
