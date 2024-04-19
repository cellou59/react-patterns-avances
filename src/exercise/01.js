// Composants composés
// http://localhost:3000/alone/exercise/01.js

import * as React from 'react'
import CheckBox from '../checkbox'

// 🐶 transforme 'CompoundComponentParent' en vrai composant composé
function CompoundComponentParent({children}) {
  const [checked, setChecked] = React.useState(false)
  const tick = () => setChecked(!checked)

  // 🐶 remplace cela en clonant tous les enfants (children)
  // Pour parcourir tous les children utilise `React.Children.map`
  // Pour cloner utilise `React.cloneElement`
  // lors du clone passe les props 'checked' et 'tick'
 
  // 📑 https://fr.reactjs.org/docs/react-api.html#reactchildren
  // 📑 https://fr.reactjs.org/docs/react-api.html#cloneelement
  return  React.Children.map(children, child => React.cloneElement(child, {checked, tick}),)
}

// 🐶 Accepte les props 'checked' et 'children'
function Accept({checked,children}) {
  // 🐶 retourne le 'children' si 'checked' est à 'true', 'null' sinon
  return checked ? (<div>{children}</div>) : null
}

// 🐶 Accepte les props 'checked' et 'children'
function Decline({checked,children}) {
  // 🐶 retourne le 'children' si 'checked' est à 'true', 'null' sinon
  return checked ? null : (<div>{children}</div>)
}

// 🐶 Accepte les props 'checked' et 'tick' et ...props
function CheckBoxButton({checked,tick,props}) {
   return <CheckBox checked={checked} onChange={tick} {...props} />

}

function App() {
  return (
    <div>
      <CompoundComponentParent>
        <CheckBoxButton />
        <Accept>✅ J'accepte les termes du contrat</Accept>
        <Decline>❌ Je decline les termes du contrat</Decline>
      </CompoundComponentParent>
    </div>
  )
}

export default App
