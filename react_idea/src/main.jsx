import{ StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Header, Footer} from "./components/Composition.jsx";
import {ArtistTable} from "./components/artists/ArtistList.jsx";
import {BrowserRouter, HashRouter, Route, Routes} from "react-router-dom";
import {AlbumTable} from "./components/albums/AlbumList.jsx";

// // JSX -> HTML/XML inside JS code
// const greet = <h1>Hello everyone!</h1>;
// // Tương đồng với nhau
// // Traditional
// const greetV2 =
//     React.createElement('h1', null, 'Hello version 2');

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/*<App />*/}
    {/*  {greet}*/}
    {/*{greetV2}*/}
    {/*  Code giao dien cho trang Artist List (Su dung cac Component cua Bootstrap)*/}

      {/*khuyên dùng <BrowserRouter>*/}
      <HashRouter>
          <div className="d-flex flex-column min-vh-100">
              <Header />

              <Routes>
                  <Route path="/" element={<ArtistTable />} />
                  <Route path="/artists" element={<ArtistTable />} />
                  <Route path="/albums" element={<AlbumTable />} />
              </Routes>

              <Footer />
          </div>
      </HashRouter>
    {/*</BrowserRouter>*/}

  </StrictMode>,
);

    // API endpoint @ Rest service a.k.a resource server: https://localhost:8080/api/v1/artists
    // FE/app react/SPA
    // http://localhost:8888/artists -> artist list ArtistTable
    // http://localhost:8888/artists/new -> create ArtistForm

    // 1. node_modules là gì? -> lưu ý xoá khi trước khi nộp bài
    // 2. Tại sao lại tồn tại 2 thư mục để chứa assets (hình ảnh ...) là public và src/assets