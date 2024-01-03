import Nav from "../components/Nav";
import email from "./email.csv"
import apple from "./apple.csv"
import * as dfd from "danfojs"


export default function Dashboard() {

const CSVs = [email, apple]
const CSVsStrings = ["email", "apple"]
// read csv with danfo.js

async function fetchCSVData(file){
  // fetch csv file
  const csv = await fetch(file)
  .then(row => {return row.text()})

  // convert csv to array
  let csvToArray = csv.split("\n")

  // extract columns
  let columns = csvToArray[0].split(",")

  // extract data
  let data = csvToArray.slice(1, csvToArray.length)
  let rows = []
  data.forEach(row => {
    row = row.split(",")
    rows.push(row)
  });

  // create dataframe
  // dataframe is similar to pandas dataframe, e.g. df.head(), df.describe() or df[columnName] to access a column
  let df = new dfd.DataFrame(rows, {columns: columns})
  df.print()
  
}

    // display barchart with chart js react
    return (
        <div className="relative isolate px-6 pt-14 lg:px-8 min-h-full">
            <Nav />
            <header className="bg-white py-14">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>
          </div>
        </header>
        <main>
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
        </main>
        </div>
    )}