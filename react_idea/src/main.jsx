import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { Navbar, Nav, NavDropdown, Container, Table, Button } from 'react-bootstrap';
import Navigation from "./components/Navigation.jsx";
import ArtistTable from "./components/ArtistTable.jsx";
import Footer from "./components/Footer.jsx";
// import App from './App.jsx'

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

    {/*<Container>*/}
    {/*  <h1>Artist List</h1>*/}
    {/*</Container>*/}

    {/* Navbar */}
    <Navigation />

    {/* Header */}
    <ArtistTable />

    {/* Footer */}
    <Footer />

  </StrictMode>,
)

    // 1. node_modules là gì? -> lưu ý xoá khi trước khi nộp bài
    // 2. Tại sao lại tồn tại 2 thư mục để chứa assets (hình ảnh ...) là public và src/assets