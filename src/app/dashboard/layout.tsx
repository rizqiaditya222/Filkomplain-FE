import Sidebar from "../components/sidebar/sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-10 bg-white min-h-screen">
        {children}
      </main>
    </div>
  );
};
export default DashboardLayout;