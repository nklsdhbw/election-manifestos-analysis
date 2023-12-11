import Nav from "../components/Nav";

export default function Dashboard() {
    return (
        <div className="relative isolate px-6 pt-14 lg:px-8 min-h-full">
            <Nav />
            <header className="bg-white py-14">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>
          </div>
        </header>
        <main>
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">{/* Your content */}</div>
        </main>
        </div>
    )}