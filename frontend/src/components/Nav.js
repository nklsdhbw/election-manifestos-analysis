import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { AiFillGithub } from 'react-icons/ai';
import { Link } from 'react-router-dom';


export default function Example() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="bg-white">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Election Manifesto</span>
              Election Manifesto
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            <Link to="/" className="text-sm font-semibold leading-6 text-gray-900">
              Home
            </Link>
            <Link to="/dashboard" className="text-sm font-semibold leading-6 text-gray-900">
              Dashboard
            </Link>
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <a target="_blank" href="https://github.com/nklsdhbw/election-manifestos-analysis">
              <AiFillGithub />
            </a>
          </div>
        </nav>
        <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
          <div className="fixed inset-0 z-50" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Election Manifesto</span>
                Election Manifesto
              </a>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root list-none">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6 ">
                <li>
                    <Link to="/" className="text-sm font-semibold leading-6 text-gray-900" >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link to="/dashboard" className="text-sm font-semibold leading-6 text-gray-900" >
                      Dashboard
                    </Link>
                  </li>
                </div>
                <div className="py-6">
                <a target="_blank" href="https://github.com/nklsdhbw/election-manifestos-analysis">
              <AiFillGithub />
            </a>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>

      
    </div>
  )
}
