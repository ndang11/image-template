import Home from "./pages/Home";
import { ImageProvider } from "./context/ImageContext";

function App() {
  return (
    <ImageProvider>
      <Home />
    </ImageProvider>
  );
}

export default App;