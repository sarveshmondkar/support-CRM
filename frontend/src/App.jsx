import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";

import Dashboard from "./pages/Dashboard";
import CreateTicket from "./pages/CreateTicket";
import TicketDetails from "./pages/TicketDetails";
import AllTickets from "./pages/AllTickets"
function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/tickets/new" element={<CreateTicket />} />
          <Route
            path="/tickets/:ticketId"
            element={<TicketDetails />}
          />
          <Route path="/tickets" element={<AllTickets />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;