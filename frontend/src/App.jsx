
import './App.css'
import { Container } from '@chakra-ui/react'
import {Routes , Route, Navigate  } from 'react-router-dom'
import Playlists from './pages/Playlists.jsx'
import Home from './pages/Home.jsx'
import AuthPage from './pages/AuthPage.jsx'
import { useRecoilValue } from 'recoil'
import userAtom from './atoms/userAtom.js';
import MovieDetails from './pages/MovieDetails.jsx'

function App() {

  const user  = useRecoilValue(userAtom);
  // console.log(user);

  return (
    <Container maxW={'100vw'} background={'black'} color={'white'} padding={'10px'}>
    

      <Routes>
        <Route path="/" element={user ? <Home /> : <Navigate to = "/auth" />} />
        <Route path="/auth" element={!user ? <AuthPage/> : <Navigate to = "/" />} />
        <Route path="/playlists" element={user ? <Playlists />: <Navigate to = "/auth" />} />
        <Route path="/moviesdetails/:imdbID" element={<MovieDetails/>} />

      </Routes>

      
    </Container>
  )
}

export default App
