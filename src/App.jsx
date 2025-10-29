
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import LoginPage from "./pages/LoginPage.jsx";
import Register from "./pages/Register.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import UpdateProfilePage from "./pages/UpdateProfilePage.jsx";
import NotFound from "./pages/NotFound.jsx";
import Unauthorized from "./pages/Unauthorized.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import JournalUpload from './components/JournalUpload.jsx';
import JournalList from './components/JournalList.jsx';
import JournalDetail from './components/JournalDetail.jsx';
import Home from "./pages/Home.jsx";
import ManageJournal from "./pages/ManageJournal.jsx";
import LogoutPage from "./pages/LogoutPage.jsx";
import JournalArchive from "./pages/JournalArchive.jsx";
import JournalSubmission from "./components/JournalSubmission.jsx";
import Navigation from "./components/Navigation.jsx";
import About from "./components/About.jsx";
import Guide from "./components/Guide.jsx";
import Contact from "./components/Contact.jsx";
import CallForPapers from "./pages/CallForPapers.jsx";
import EditorialBoard from "./pages/EditorialBoard.jsx";
import Footer from "./components/Footer.jsx";
import TestComponent from "./components/TestComponent.jsx";

// Published Journal System Components
import PublishedJournals from "./pages/PublishedJournals.jsx";
import PublishedJournalHome from "./pages/PublishedJournalHome.jsx";
import PublishedJournalSearch from "./pages/PublishedJournalSearch.jsx";
import PublishedJournalStats from "./pages/PublishedJournalStats.jsx";
import PublishedJournalUpload from "./pages/PublishedJournalUpload.jsx";
import PublishedJournalBulk from "./pages/PublishedJournalBulk.jsx";
import SubmitJournal from "./pages/SubmitJournal.jsx";
import ManagePublishedJournals from "./pages/ManagePublishedJournals.jsx";
import PublishedJournalArchive from "./pages/PublishedJournalArchive.jsx";
import TestDownload from "./pages/TestDownload.jsx";
import TestBothSystems from "./pages/TestBothSystems.jsx";

function App() {
  const storedUser = localStorage.getItem('authUser');
  const user = storedUser ? JSON.parse(storedUser) : null;

  return (
    <Router>
      <div className="min-h-screen bg-slate-900 text-gray-100 flex flex-col">
        {/* Navigation */}
        <div className="fixed top-0 left-0 right-0 z-50">
          <Navigation user={user} />
        </div>

        {/* Main Content */}
        <main className="flex-grow pt-24 bg-white text-black px-6 pb-12 rounded-t-lg shadow-inner">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/logout" element={<LogoutPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="/resetpassword/:token" element={<ResetPassword />} />
            <Route path="/about" element={<About />} />
            <Route path="/call-for-papers" element={<CallForPapers />} />
            <Route path="/guide" element={<Guide />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/journals" element={<JournalList />} />
            <Route path="/journals/:id" element={<JournalDetail />} />
            <Route path="/archive" element={<JournalArchive />} />

            {/* Published Journal System Routes */}
            <Route path="/published-journal-home" element={<PublishedJournalHome />} />
            <Route path="/published-journals" element={<PublishedJournals />} />
            <Route path="/published-journal-search" element={<PublishedJournalSearch />} />
            <Route path="/published-journal-stats" element={<PublishedJournalStats />} />
            <Route path="/published-journal-archive" element={<PublishedJournalArchive />} />
            <Route path="/test-download" element={<TestDownload />} />
            <Route path="/test-both-systems" element={<TestBothSystems />} />

            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="/test" element={<TestComponent />} />

            <Route path="/editorial-board" element={<EditorialBoard />} />

            {/* Protected Routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute allowedRoles={["admin", "author", "user"]}>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/updateprofile" element={
              <ProtectedRoute allowedRoles={["admin", "author", "user"]}>
                <UpdateProfilePage />
              </ProtectedRoute>
            } />
            <Route path="/submission" element={
              <ProtectedRoute allowedRoles={["admin", "author", "user"]}>
                <JournalSubmission />
              </ProtectedRoute>
            } />

            {/* Published Journal Submission Route */}
            <Route path="/submit-journal" element={
              <ProtectedRoute allowedRoles={["admin", "author", "user"]}>
                <SubmitJournal />
              </ProtectedRoute>
            } />

            {/* Admin Only Routes */}
            <Route path="/journals/uploads" element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <JournalUpload />
              </ProtectedRoute>
            } />
            <Route path="/manage-journals" element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <ManageJournal />
              </ProtectedRoute>
            } />

            {/* Published Journal Management Routes */}
            <Route path="/manage-published-journals" element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <ManagePublishedJournals />
              </ProtectedRoute>
            } />
            <Route path="/published-journal-upload" element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <PublishedJournalUpload />
              </ProtectedRoute>
            } />
            <Route path="/published-journal-bulk" element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <PublishedJournalBulk />
              </ProtectedRoute>
            } />

            <Route path="*" element={<NotFound />} />
          </Routes>

          {/* Footer */}
          <Footer />
        </main>

        {/* Toast Notifications */}
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </Router>
  );
}

export default App;
