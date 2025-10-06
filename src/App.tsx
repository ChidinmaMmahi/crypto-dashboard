import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header, Dashboard, Market, CoinDetail, Profile } from "./components";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <BrowserRouter>
        <Header />
        <main className="p-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/market" element={<Market />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/coin/:id" element={<CoinDetail />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
