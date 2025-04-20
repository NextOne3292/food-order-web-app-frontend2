const AdminFooter = () => {
    return (
      <footer className="bg-gray-900 text-white text-center py-4 mt-4 rounded-md shadow-md">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Admin Panel. All rights reserved.
        </p>
      </footer>
    );
  };
  
  export default AdminFooter;
  