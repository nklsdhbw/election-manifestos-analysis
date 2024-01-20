import Nav from "../components/Nav";
// import email from "./email.csv";
// import apple from "./apple.csv";
import * as dfd from "danfojs";
import { useEffect, useState } from "react";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import Chart from 'chart.js/auto';
import ChartAfd from "./charts/Afd.js";
import ChartSpd from "./charts/Spd.js";
import ChartFdp from "./charts/Fdp.js";
import Hfhfh from "./charts/hfhfh.js";
import ChartCduCsu from "./charts/CduCsu.js";
import ChartGrune from "./charts/Gruene.js";
import ChartLinke from "./charts/Linke.js";


function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Dashboard() {
  // const CSVs = [email, apple];
  // const CSVsStrings = ["email", "apple"];
  // read csv with danfo.js
  const [showChartAfd, setShowChartAfd] = useState(false);
  const [showChartSpd, setShowChartSpd] = useState(false);
  const [showChartFdp, setShowChartFdp] = useState(false);
  const [showChartTest, setShowChartTest] = useState(false);
  const [showChartCduCsu, setShowChartCduCsu] = useState(false);
  const [showChartGrune, setShowChartGrune] = useState(false);
  const [showChartLinke, setShowChartLinke] = useState(false);

  
  return (
    <div>
      <div className="relative isolate px-6 pt-14 lg:px-8 min-h-full">
        <Nav />
        <header className="bg-white py-14">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            
            <Menu as="div" className="relative flex justify-between text-left ">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Dashboard
            </h1>
          <Menu.Button className="inline-flex justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
            Options
            <ChevronDownIcon
              className="-mr-1 h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </Menu.Button>
       

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-10 mt-12 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    onClick={() => {
                      setShowChartAfd(true); // Show chart 0
                      setShowChartSpd(false); // Hide other charts
                      setShowChartFdp(false); // Hide other charts
                      setShowChartCduCsu(false);
                      setShowChartGrune(false);
                      setShowChartLinke(false);
                    
                    }}
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block px-4 py-2 text-sm"
                    )}
                  >
                    AFD
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    onClick={() => {
                      setShowChartAfd(false); 
                      setShowChartSpd(true);
                      setShowChartFdp(false);
                      setShowChartCduCsu(false);
                      setShowChartGrune(false);
                      setShowChartLinke(false);
                    }}
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block px-4 py-2 text-sm"
                    )}
                  >
                    SPD
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    onClick={() => {
                      setShowChartAfd(false); 
                      setShowChartSpd(false);
                      setShowChartFdp(true);
                      setShowChartCduCsu(false);
                      setShowChartGrune(false);
                      setShowChartLinke(false);
                    }}
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block px-4 py-2 text-sm"
                    )}
                  >
                    FDP
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    onClick={() => {
                      setShowChartAfd(false); // Show chart 0
                      setShowChartSpd(false); // Hide other charts
                      setShowChartFdp(false); // Hide other charts
                      setShowChartCduCsu(true);
                      setShowChartGrune(false);
                      setShowChartLinke(false);
                      // setShowChart1(false); // Hide other charts
                      // Set other chart visibility as needed
                    }}
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block px-4 py-2 text-sm"
                    )}
                  >
                    CDU/CSU
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    onClick={() => {
                      setShowChartAfd(false); // Show chart 0
                      setShowChartSpd(false); // Hide other charts
                      setShowChartFdp(false); // Hide other charts
                      setShowChartCduCsu(false);
                      setShowChartGrune(true);
                      setShowChartLinke(false);
                      // setShowChart1(false); // Hide other charts
                      // Set other chart visibility as needed
                    }}
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block px-4 py-2 text-sm"
                    )}
                  >
                    B90 Die Grünen
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    onClick={() => {
                      setShowChartAfd(false); 
                      setShowChartSpd(false); 
                      setShowChartFdp(false); 
                      setShowChartCduCsu(false);
                      setShowChartGrune(false);
                      setShowChartLinke(true);
                    }}
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block px-4 py-2 text-sm"
                    )}
                  >
                    Die Linke
                  </a>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
          </div>
        </header>


        {/* Render the specific chart component based on state */}
        {showChartAfd && <ChartAfd />}
        {showChartSpd && <ChartSpd />}
        {showChartFdp && <ChartFdp />}
        {showChartCduCsu && <ChartCduCsu />}
        {showChartGrune && <ChartGrune />}
        {showChartLinke && <ChartLinke />}
        {/* {showChart1 && <Point1Chart />} */}

        {/* <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">Test</div>
        {CSVs.map(party => (
          <button
            key={party} // Don't forget to add a unique key for each button when mapping over an array in React
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={() => fetchCSVData(party)}
          >
            {CSVsStrings[CSVs.indexOf(party)]}
          </button>
        ))}
        <div>
          </div>
        </main> */}
      </div>

 
    </div>
  );
}
