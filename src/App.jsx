import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import RestaurantList from "./components/RestaurantList";
import Restaurant from "./components/Restaurant";
import Footer from "./components/Footer"; // Import Footer component

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<RestaurantList />} />
        <Route path="/restaurants" element={<RestaurantList />} />
        <Route path="/restaurants/:id" element={<Restaurant />} />
      </Routes>
      <Footer /> {/* Add Footer here */}
    </>
  );
};

export default App;
