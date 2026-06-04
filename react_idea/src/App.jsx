import {Footer, Header} from './components/Composition.jsx'
import {HomePage} from "./components/HomePage.jsx";
import {Route, Routes} from "react-router-dom";
import {ArtistList} from "./components/artists/ArtistList.jsx";
import { ArtistForm } from "./components/artists/ArtistForm.jsx";
import {AlbumList} from "./components/albums/AlbumList.jsx";

function App() {
    return (
        <>
            <div className="d-flex flex-column min-vh-100">
                <Header/>
                     <main>
                        <Routes>
                          <Route path="/" element={<HomePage/>}/>
                          <Route path="/danh-sach-nghe-si" element={<ArtistList/>}/>
                          <Route path="/them-moi-nghe-si" element={<ArtistForm/>}/>
                          <Route path="/danh-sach-album" element={<AlbumList/>}/>
                        </Routes>
                     </main>
                <Footer/>
            </div>
        </>
    );
}

export default App
