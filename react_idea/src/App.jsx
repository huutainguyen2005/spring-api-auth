import './App.css'
import {Header} from "./components/Composition.jsx";
import {Routes, Route} from 'react-router-dom';
import {HomePage} from "./components/HomePage.jsx";
import {ArtistList} from "./components/artists/ArtistList.jsx";
import {ArtistForm} from "./components/artists/ArtistForm.jsx";
import {ArtistDelete} from "./components/artists/ArtistDelete.jsx";
import {ContactsManagementPage} from "./components/contacts/ContactsManagementPage.jsx";

function App() {
    return (
        <>
            <Header/>
            <main>
                <Routes>
                    <Route path={'/'} element={<HomePage/>}/>
                    <Route path={'/danh-sach-nghe-si'} element={<ArtistList/>}/>
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