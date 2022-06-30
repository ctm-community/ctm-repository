import { SnackbarComponent } from 'components/Snackbar';
import Home from 'pages/Home';
import MapView from 'pages/MapView';
import NoMatch from 'pages/NoMatch';
import UploadMap from "pages/UploadMap";
import { HashRouter, Route, Routes } from "react-router-dom";


/**
 * HashRouter basename uses '/' instead of 'process.env.PUBLIC_URL'
 * because GitHub pages will append basename to repository name if included.
 * If HashRouter is replaced with BrowserRouter, basename should be changed
 * to the following: `basename={process.env.PUBLIC_URL}`
 * @returns {JSX.Element}
 */
function App() {
  return (
    <HashRouter basename="/">
      <SnackbarComponent>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/maps/:id/*" element={<MapView />} />
          <Route path="/upload" element={<UploadMap />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </SnackbarComponent>
    </HashRouter>
  );
}

export default App;
