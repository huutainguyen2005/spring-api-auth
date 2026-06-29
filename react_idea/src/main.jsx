import React, {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.css';
import {HashRouter} from 'react-router-dom';
import App from "./App.jsx";
import {AuthProvider} from "./auth/AuthContext.jsx";

// const objProduct = {
//     id: 79,
//     price: 85,
//     name: 'T-Shirt'
// };
//
// function displayName(product) {
//     product.id
// }


createRoot(document.getElementById('root')).render(
    <StrictMode>
        <AuthProvider>
            {/*Code giao dien cho trang Artist List*/}
            {/*(Su dung cac Component cua React-Bootstrap)*/}
            {/*NavBar*/}
            <HashRouter>
                <App />
            </HashRouter>
            {/*<Header />*/}
            {/*<Container>*/}
            {/*    <h1>*/}
            {/*        Artist list*/}
            {/*    </h1>*/}
            {/*    <ArtistTable list={artistList}/>*/}
            {/*</Container>*/}
        </AuthProvider>
    </StrictMode>,
)
// API endpoint @ Rest service a.k.a resource server: http://localhost:8080/api/v1/artists
// FE/app react/SPA
// http://localhost:8888/artists -> artist list ArtistTable
// http://localhost:8888/artists/new -> create ArtistForm

// 1. node_modules là gì? -> luu ý, xóa đi trước khi nộp bài thi.
// 2. Tại sao lại tồn tại 2 thư mục để chứa assets (hình ảnh...) là public và src/assets