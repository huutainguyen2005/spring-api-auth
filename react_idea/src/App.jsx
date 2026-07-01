import "./App.css";
import { Header } from "./components/Composition.jsx";
import { Routes, Route } from "react-router-dom";
import { HomePage } from "./components/HomePage.jsx";
import { ArtistList } from "./components/artists/ArtistList.jsx";
import { ArtistForm } from "./components/artists/ArtistForm.jsx";
import { ArtistDelete } from "./components/artists/ArtistDelete.jsx";
import { ContactsManagementPage } from "./components/contacts/ContactsManagementPage.jsx";
import { ThemeProvider } from "./contexts/ThemeContext.jsx";
import { AuthCallbackHandler } from "./auth/AuthCallbackHandler.jsx";
import { RequireAuth } from "./auth/RequireAuth.jsx";
import { AlbumList } from "./components/albums/AlbumList.jsx";
import { GenreList } from "./components/genres/GenreList.jsx";
import { AlbumForm } from "./components/albums/AlbumForm.jsx";
import { GenreForm } from "./components/genres/GenreForm.jsx";
import { AlbumDelete } from "./components/albums/AlbumDelete.jsx";
import { GenreDelete } from "./components/genres/GenreDelete.jsx";

function App() {
  // context   --- provider -> theme
  return (
    <>
      <ThemeProvider>
        <Header />
      </ThemeProvider>
      <main>
        {/* <AuthCallbackHandler /> */}
        <Routes>
          <Route path={"/"} element={<HomePage />} />

          {/* Artist Routes */}
          {/* <Route
            path={"/danh-sach-nghe-si"}
            element={
              <RequireAuth>
                <ArtistList />
              </RequireAuth>
            }
          /> */}
          <Route path={"/danh-sach-nghe-si"} element={<ArtistList />} />
          <Route path={"/them-moi-nghe-si"} element={<ArtistForm />} />
          <Route
            path={"/chinh-sua-nghe-si/:artistId"}
            element={<ArtistForm />}
          />
          <Route path={"/xoa-nghe-si/:artistId"} element={<ArtistDelete />} />

          {/* Album Routes */}
          <Route path={"/danh-sach-album"} element={<AlbumList />} />
          <Route path={"/them-moi-album"} element={<AlbumForm />} />
          <Route path={"/chinh-sua-album/:albumId"} element={<AlbumForm />} />
          <Route path={"/xoa-album/:albumId"} element={<AlbumDelete />} />

          {/* Genre Routes */}
          <Route path={"/danh-sach-the-loai"} element={<GenreList />} />
          <Route path={"/them-moi-the-loai"} element={<GenreForm />} />
          <Route
            path={"/chinh-sua-the-loai/:genreId"}
            element={<GenreForm />}
          />
          <Route path={"/xoa-the-loai/:genreId"} element={<GenreDelete />} />

          <Route path={"/contacts"} element={<ContactsManagementPage />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
