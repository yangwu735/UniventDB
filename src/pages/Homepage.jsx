import React from 'react'
import { db } from '../lib/firebase';
import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';

// import { BsCurrencyDollar } from 'react-icons/bs';
// import { GoPrimitiveDot } from 'react-icons/go';
// import { IoIosMore } from 'react-icons/io';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';

// import { Stacked, Pie, Button, LineChart, SparkLine } from '../components';
import { dropdownData, } from '../data/dummy';
// import { useStateContext } from '../contexts/ContextProvider';
// import product9 from '../data/lollipop.jpg';
import GetDocumentData from "../tools/GetDoc";
import GetDocumentCount from "../tools/GetQueryCount";
import GetHighestPoints from "../tools/GetHighestPoints";
import GetRandom from "../tools/GetRandom";
import GetQuery from '../tools/GetQuery';

const DropDown = ({ currentMode }) => (
  <div className="w-28 border-1 border-color px-2 py-1 rounded-md">
    <DropDownListComponent id="time" fields={{ text: 'Time', value: 'Id' }} style={{ border: 'none', color: (currentMode === 'Dark') && 'white' }} value="1" dataSource={dropdownData} popupHeight="220px" popupWidth="120px" />
  </div>
);

//Creates the home page
const Homepage = () => {
  const [generating, setGenerating] = useState(false);
  useEffect(() => {
  },[])
  let randomId = 1;
  //For winner generation
  const [grade, setGrade] = useState(0);
  const handleGradeChange = (event) => {
    setGrade(event.target.value);
  };

  //Rendering below
  return (
    <div className="mt-1">
      <div className="flex flex-wrap lg:flex-nowrap justify-center ">
        <div className="flex m-3 flex-wrap justify-center gap-10 items-center">
          <div key={'Freshmen'} className="bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56  p-4 pt-1 rounded-2xl ">
            <div>
              <Link to="/Students">
                <button
                  type="button"
                  style={{ color: '#03C9D7', backgroundColor: '#E5FAFB' }}
                  className="text-2xl opacity-0.9 rounded-full p-4 hover:drop-shadow-xl"
                >
                  <GetDocumentCount coll='students' field='studentGrade' comp='==' value={9}/> Students
                </button>
              </Link>
            </div>
            <p className="mt-3 ml-1">
              <span className="text-lg font-semibold">Freshmen</span>
            </p>
            <p className="text-sm text-gray-400  mt-1 ml-1">9th grade</p>
          </div>
          <div key={'Sophomores'} className="bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56  p-4 pt-1 rounded-2xl ">
            <Link to="/Students">
              <button
                type="button"
                style={{ color: '#03C9D7', backgroundColor: '#E5FAFB' }}
                className="text-2xl opacity-0.9 rounded-full  p-4 hover:drop-shadow-xl"
              >
                <GetDocumentCount coll='students' field='studentGrade' comp='==' value={10}/> Students
              </button>
            </Link>
            <p className="mt-3">
              <span className="text-lg font-semibold ml-1">Sophomores</span>
            </p>
            <p className="text-sm text-gray-400  mt-1 ml-1">10th grade</p>
          </div>
          <div key={'Juniors'} className="bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56  p-4 pt-1 rounded-2xl ">
            <Link to="/Students">
              <button
                type="button"
                style={{ color: '#03C9D7', backgroundColor: '#E5FAFB' }}
                className="text-2xl opacity-0.9 rounded-full  p-4 hover:drop-shadow-xl"
              >
                <GetDocumentCount coll='students' field='studentGrade' comp='==' value={11}/> Students
              </button>
              </Link>
            <p className="mt-3">
              <span className="text-lg font-semibold ml-1">Juniors</span>
            </p>
            <p className="text-sm text-gray-400  mt-1 ml-1">11th grade</p>
          </div>
          <div key={'Seniors'} className="bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56  p-4 pt-1 rounded-2xl ">
            <Link to="/Students">
              <button
                type="button"
                style={{ color: '#03C9D7', backgroundColor: '#E5FAFB' }}
                className="text-2xl opacity-0.9 rounded-full  p-4 hover:drop-shadow-xl"
              >
                <GetDocumentCount coll='students' field='studentGrade' comp='==' value={12}/> Students
              </button>
            </Link>
            <p className="mt-3">
              <span className="text-lg font-semibold ml-1">Seniors</span>
            </p>
            <p className="text-sm text-gray-400  mt-1 ml-1">12th grade</p>
          </div>
        </div>
      </div>

      <div className="justify-center">
        <div className="w-350 bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl p-6 m-3">
          <div className=" justify-between">
            <p className="text-2xl font-semibold">Top Points - All Grades</p>
          </div>

          <div className=" ml-5 mt-5 center mx-auto text-xl font-semibold text-black">
            <GetHighestPoints/>
          </div>
          <p className="text-2xl font-semibold mt-5">Top Points - Per Grade</p>
          <div className=" ml-5 mt-5 center mx-auto text-xl font-semibold text-black">
            <GetHighestPoints grade={9} className="mt-2"/>
            <GetHighestPoints grade={10} className="mt-2"/>
            <GetHighestPoints grade={11} className="mt-2"/>
            <GetHighestPoints grade={12} className="mt-2"/>
          </div>
        </div>



        <div className="w-350 bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl p-6 m-3">
          <div className="justify-between">
            <p className="text-2xl font-semibold">Generate Winners</p>
          </div>
          <div className='w-full mt-3'>
            <select value={grade} onChange={handleGradeChange}>
              <option value={0}>Please select a grade level</option>
              <option value={9}>9th Grade</option>
              <option value={10}>10th Grade</option>
              <option value={11}>11th Grade</option>
              <option value={12}>12th Grade</option>
            </select>

          </div>
          <button 
            className='mt-5 opacity-0.9 rounded-xl content-center p-4 hover:drop-shadow-xl h-auto'type="button"
            style={{color: '#03C9D7', backgroundColor: '#E5FAFB'}}
            onClick={() => {
              if(grade == 0){
                alert("Grade not set!");
              }
              else{
                setGenerating(!generating);
              }
            }}>
            {generating ? (<p>Regenerate!</p>) : (<p>Generate!</p>)}
          </button>
          
          {generating ? (
            <div className= "ml-5 mt-5 center mx-auto text-xl font-semibold text-black">
              <GetHighestPoints grade={parseInt(grade)} className="mt-2"/>
              <GetRandom grade={parseInt(grade)} className="mt-2"/>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Homepage;