import Nav from "../components/Nav";
// import email from "./email.csv";
// import apple from "./apple.csv";
import * as dfd from "danfojs";
import { useEffect, useState } from "react";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import Chart from 'chart.js/auto';
import ChartAFD from "./charts/Afd.js";
import ChartSPD from "./charts/Spd.js";
import ChartFDP from "./charts/Fdp.js";
import Hfhfh from "./charts/hfhfh.js";
import ChartCdu1Csu from "./charts/CduCsu.js";
import ChartDie_Grünen from "./charts/Gruene.js";
import ChartDie_Linke from "./charts/Linke.js";

const chartComponents = {
  ChartAFD: () => import("./charts/Afd.js"),
  ChartSPD: () => import("./charts/Spd.js"),
  ChartFDP: () => import("./charts/Fdp.js"),
  ChartCdu1Csu: () => import("./charts/CduCsu.js"),
  ChartDie_Grünen: () => import("./charts/Gruene.js"),
  ChartDie_Linke: () => import("./charts/Linke.js"),
};


function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Dashboard() {
  
  // const CSVs = [email, apple];
  // const CSVsStrings = ["email", "apple"];
  // read csv with danfo.js
  const [currentChart, setCurrentChart] = useState(null);
  const [selectedParty, setSelectedParty] = useState('Options'); 
  const [ChartComponent, setChartComponent] = useState(null);
  const [showChartAFD, setShowChartAFD] = useState(false);
  const [showChartSPD, setShowChartSPD] = useState(false);
  const [showChartFDP, setShowChartFDP] = useState(false);
  const [showChartTest, setShowChartTest] = useState(false);
  const [showChartCdu1Csu, setShowChartCdu1Csu] = useState(false);
  
  const [showChartDie_Grünen, setShowChartDie_Grünen] = useState(false);
  const [showChartDie_Linke, setShowChartDie_Linke] = useState(false);


  const loadChartComponent = async (chartName) => {
    if (chartComponents[chartName]) {
      const importedComponent = await chartComponents[chartName]();
      setChartComponent(() => importedComponent.default);
      let party  = chartName.replace('Chart', '');
      party  = party.replace('_', ' ');
      party = party.replace('1', '&');
      setSelectedParty(party); // Aktualisieren des ausgewählten Parteinamens
    }
  };

  // useEffect(() => {
  //   if (currentChart && chartComponents[currentChart]) {
  //     (async () => {
  //       const importedComponent = await chartComponents[currentChart]();
  //       setChartComponent(() => importedComponent.default);
  //     })();
  //   }
  // }, [currentChart]);
  
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
                {selectedParty} <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
              </Menu.Button>

              <Transition as={Fragment} enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95">
                <Menu.Items className="absolute right-0 z-10 mt-12 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                  {Object.keys(chartComponents).map((chart) => {
  let modifiedChartName = chart.replace("Chart", "");
  modifiedChartName = modifiedChartName.replace("_", " ");
  modifiedChartName = modifiedChartName.replace("1", "&")
  return (
    <Menu.Item key={chart}>
      {({ active }) => (
        <button
          onClick={() => loadChartComponent(chart)}
          className={classNames(active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block w-full px-4 py-2 text-left text-sm')}
        >
          {modifiedChartName}
        </button>
      )}
    </Menu.Item>
  );
})}

                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </header>
        
        {selectedParty === "Options" ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-xl font-semibold">Please select a party</div>
          </div>
        ) : (
          ChartComponent && <ChartComponent />
        )}
      </div>
    </div>
  );
}
