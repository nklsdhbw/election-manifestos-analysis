import Nav from "./Nav";

export default function Hero(){
    return(
        <div className="relative isolate px-6 pt-14 lg:px-8">
        <Nav />
        <div className="mx-auto max-w-2xl py-32 sm:py-46 lg:py-54">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            <span className='text-indigo-600'>Datengetriebene</span> Politik
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
            Daten im Dienst der Demokratie: Unser Weg zu einem unparteiischen Wahlprogramm
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="/dashboard"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Dashboard
              </a>
              <a href="#Features" className="text-sm font-semibold leading-6 text-gray-900">
                Learn more <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    )
}