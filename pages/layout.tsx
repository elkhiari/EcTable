import React from "react";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="container mx-auto">
        <script src="https://cdn.tailwindcss.com"></script>
        <header className="flex justify-between items-center py-4">
          <h1 className="text-4xl font-bold">My App</h1>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/tasks">Tasks</a>
              </li>
            </ul>
          </nav>
        </header>
        <main>{children}</main>
      </div>
    </>
  );
}

export default Layout;
