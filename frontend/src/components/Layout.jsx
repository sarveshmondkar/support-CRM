import Sidebar from "./Sidebar";
import MobileHeader from "./MobileHeader";

function Layout({ children }) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="min-w-0 flex-1">
        {/* Mobile Header */}
        <MobileHeader />

        {children}
      </div>
    </div>
  );
}

export default Layout;