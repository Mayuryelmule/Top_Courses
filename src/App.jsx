import { useEffect, useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Filter from './components/Filter'
import Cards from './components/Cards'
import { apiUrl, filterData } from  './data'
import Spinner from './components/Spinner'
import {toast} from "react-toastify";

function App() {
  const [courses, setCourses] = useState(null);
  const [loading, setLoading] = useState(true);
  const [catagory, setCatagory] = useState(filterData[0].title);

  async function fetchData() {
    setLoading(true);
    try {
      let response = await fetch(apiUrl);
      let output = await response.json();
      //output ->
      setCourses(output.data);
    } catch (error) {
      toast.error("Network Problem");
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className='min-h-screen flex flex-col bg-gray-600'>
        <div>
          <Navbar />
        </div>

        <div className='bg-gray-600'>
          <div>
            <Filter
              filterData= {filterData} 
                catagory = {catagory}
                setCatagory = {setCatagory}
              />
          </div>

          <div className="w-11/12 max-w-screen-xl 
            mx-auto flex flex-wrap justify-center items-center min-h-[50vh]">
            {
              loading ? (<Spinner />) : (<Cards courses={courses} catagory={catagory}/>)
            }
          </div>
        </div>
      </div>
    </>
  );
};

export default App
