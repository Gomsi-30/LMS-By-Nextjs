
import Navbar from "../_components/Navbar";
import Sidebar from "../_components/Sidebar";

const Layout = ({ children }) => {
  return (
    <div className="h-full overflow-hidden">
    <div className="fixed flex-col h-[100vh] w-[260px] border-r bg-violet-300 shadow-lg" style={{ boxShadow: "0 2px 10px rgba(221, 211, 153)" }}>
        <Sidebar />
      </div>

      <div
        className="fixed shadow-lg bg-fuchsia-100 ml-[260px]"
        style={{ width: "calc(100vw - 260px)" }}
      >
        <Navbar className="z-[100]"/>
      </div>
      <main className="pt-[70px] pl-[260px] overflow-hidden z-[-10]"> {children}</main>
    </div>
  );
};

export default Layout;
