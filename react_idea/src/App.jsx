import './App.css'
import {Header} from "./components/Composition.jsx";
import {Routes, Route} from 'react-router-dom';
import {HomePage} from "./components/HomePage.jsx";
import {ArtistList} from "./components/artists/ArtistList.jsx";
import {ArtistForm} from "./components/artists/ArtistForm.jsx";
import {ArtistDelete} from "./components/artists/ArtistDelete.jsx";
import {ContactsManagementPage} from "./components/contacts/ContactsManagementPage.jsx";
import {ThemeProvider} from "./contexts/ThemeContext.jsx";
import {AuthCallbackHandler} from "./auth/AuthCallbackHandler.jsx";
import {RequireAuth} from "./auth/RequireAuth.jsx";


function App() {
    // context   --- provider -> theme
    return (
        <>
            <ThemeProvider>
                <Header/>
            </ThemeProvider>
            <main>
                <AuthCallbackHandler/>
                <Routes>
                    <Route path={'/'} element={<HomePage/>}/>
                    <Route path={'/danh-sach-nghe-si'} element={<RequireAuth><ArtistList/></RequireAuth>}/>
                    <Route path={'/them-moi-nghe-si'} element={<ArtistForm/>}/>
                    <Route path={'/chinh-sua-nghe-si/:id'} element={<ArtistForm/>}/>
                    <Route path={'/xoa-nghe-si/:id'} element={<ArtistDelete/>} />
                    <Route path={'/contacts'} element={<ContactsManagementPage />} />
                </Routes>
            </main>
        </>
    );
}

export default App