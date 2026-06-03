import {Header} from './components/Composition.jsx'
import {HomePage} from "./components/HomePage.jsx";
import {ArtistList, ArtistForm} from './components/ArtistList.jsx'
import {Route, Routes} from "react-router-dom";

function App() {
    return (
      <Header>
          <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/artists" element={<ArtistList/>}/>
          <Route path="/artists/new" element={<ArtistForm/>}/>
          </Routes>
      </Header>
    );
}

export default App
