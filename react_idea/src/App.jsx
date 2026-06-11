import {Footer, Header} from './components/Composition.jsx'
import {HomePage} from "./components/HomePage.jsx";
import {Route, Routes} from "react-router-dom";
import {ArtistList} from "./components/artists/ArtistList.jsx";
import { ArtistForm } from "./components/artists/ArtistForm.jsx";
import {AlbumList} from "./components/albums/AlbumList.jsx";
import {GenreList} from "./components/genres/GenreList.jsx";
import {AlbumForm} from "./components/albums/AlbumForm.jsx";
import {GenreForm} from "./components/genres/GenreForm.jsx";
import {ArtistDelete} from "./components/artists/ArtistDelete.jsx";
import {AlbumDelete} from "./components/albums/AlbumDelete.jsx";
import {GenreDelete} from "./components/genres/GenreDelete.jsx";

function App() {
    return (
        <>
            <div className="d-flex flex-column min-vh-100">
                <Header/>
                     <main>
                        <Routes>

                            {/* Default Route */}
                            <Route path="/" element={<HomePage/>}/>

                            {/* Artist Route */}
                            <Route path="/danh-sach-nghe-si" element={<ArtistList/>}/>
                            <Route path="/them-moi-nghe-si" element={<ArtistForm/>}/>
                            <Route path="/chinh-sua-nghe-si/:artistId" element={<ArtistForm/>}/>
                            <Route path="/xoa-nghe-si/:artistId" element={<ArtistDelete/>}/>

                            {/* Album Route */}
                            <Route path="/danh-sach-album" element={<AlbumList/>}/>
                            <Route path="/them-moi-album" element={<AlbumForm/>}/>
                            <Route path="/chinh-sua-album/:albumId" element={<AlbumForm/>}/>
                            <Route path="/xoa-album/:albumId" element={<AlbumDelete/>}/>

                            {/* Genre Route */}
                            <Route path="/danh-sach-the-loai" element={<GenreList/>}/>
                            <Route path="/them-moi-the-loai" element={<GenreForm/>}/>
                            <Route path="/chinh-sua-the-loai/:genreId" element={<GenreForm/>}/>
                            <Route path="/xoa-the-loai/:genreId" element={<GenreDelete/>}/>

                        </Routes>
                     </main>
                <Footer/>
            </div>
        </>
    );
}

export default App
