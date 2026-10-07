import './App.css'
import {Routes,Route} from 'react-router-dom'
import PrincipalPage from './pages/PrincipalPage'
import ModoEditable from './pages/ModoEditable'
import Registros from './pages/Registros'

function App() {

  /**
   * Para context 
   * 
   * import { useContext } from 'react';

// Hook personalizado con validación de seguridad
export function useAppContext(): AppContextType {
  const context = useContext(AppContext);
  
  if (context === undefined) {
    throw new Error('useAppContext debe usarse dentro de un AppProvider');
  }
  
  return context;
}
   */
  
  /**
   * <Routes>
   *    <Route path="" element={}></Route>
   * </Routes>
   */

  return (
    <div>
      <Routes>
        <Route path="/" element={<PrincipalPage/>}></Route>
        <Route path="/ModoEditor" element={<ModoEditable/>}></Route>
        <Route path="/Registros" element={<Registros/>}></Route>
     </Routes>
    </div>
  )
}

export default App
