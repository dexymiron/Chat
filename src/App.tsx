import { BrowserRouter } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import AppRouter from './components/AppRouter/AppRouter'
import { useContext } from 'react'
import {useAuthState} from 'react-firebase-hooks/auth';
import { Context } from '.'
import Loader from './components/Loader/Loader'
import { LoadScript } from '@react-google-maps/api'


const App= () => {

  const {auth} = useContext(Context)
  const [user, loading, error] = useAuthState(auth)

  if (loading) {
    return <Loader/>
  }

  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';

  if (!apiKey) {
    console.error('Google Maps API Key is missing!');
    return <div>Error: API Key is missing!</div>;
  }

  return (
   <BrowserRouter>
      <LoadScript googleMapsApiKey={apiKey} libraries={["places"]}>
        <Navbar/>
        <AppRouter/>
      </LoadScript>
   </BrowserRouter>
  )
}

export default App
