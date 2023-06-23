import { React,useEffect,useState } from 'react';
import { Header } from '../components';
import lollipop from '../data/lollipop.jpg'
import homework from '../data/homework.jpg'
import shirt from '../data/shirt.jpg'
import { db } from '../lib/firebase';

import { GetCollection } from '../tools/GetCollection';
import GetQuery from '../tools/GetQuery';
import GetDocumentData from '../tools/GetDoc';
import GetDocumentCount from '../tools/GetQueryCount';
import GetHighestPoints from '../tools/GetHighestPoints';

const Prizes = () => {
  const [button1Text, setButton1Text] = useState('Select');
  const [button2Text, setButton2Text] = useState('Select');
  const [button3Text, setButton3Text] = useState('Select');
  const [b1Style, setB1Style] = useState({ color: '#03C9D7', backgroundColor: '#E5FAFB' });
  const [b2Style, setB2Style] = useState({ color: '#03C9D7', backgroundColor: '#E5FAFB' });
  const [b3Style, setB3Style] = useState({ color: '#03C9D7', backgroundColor: '#E5FAFB' });
  const [b1, setB1] = useState(false);
  const [b2, setB2] = useState(false);
  const [b3, setB3] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  const handleButtonStyle = () => {
    let tempColor='#03C9D7';
    let tempBkColor='#E5FAFB';
    tempColor = ((b3 || b2) ? '#8F8F8F' : '#03C9D7');
    tempBkColor = ((b3 || b2) ? '#F3F3F3' : '#E5FAFB');
    setB1Style({color: tempColor, backgroundColor: tempBkColor});
    tempColor = ((b1 || b3) ? '#8F8F8F' : '#03C9D7');
    tempBkColor = ((b1 || b3) ? '#F3F3F3' : '#E5FAFB');
    setB2Style({color: tempColor, backgroundColor: tempBkColor});
    tempColor = ((b1 || b2) ? '#8F8F8F' : '#03C9D7');
    tempBkColor = ((b1 || b2) ? '#F3F3F3' : '#E5FAFB');
    setB3Style({color: tempColor, backgroundColor: tempBkColor});
  }
  const handleButton = (thisb1, thisb2, thisb3) => {
    setTimeout(() => {
      console.log(b1,b2,b3)
      if(thisb1){
        handleButtonStyle();
        setButton1Text('Selected!');
        setButton2Text('Select');
        setButton3Text('Select');
      }
      else if(thisb2){
        handleButtonStyle();
        setButton1Text('Select');
        setButton2Text('Selected!');
        setButton3Text('Select');
      }
      else if(thisb3){
        handleButtonStyle();
        setButton1Text('Select');
        setButton2Text('Select');
        setButton3Text('Selected!');
      }
      else{
        handleButtonStyle();
        setButton1Text('Select');
        setButton2Text('Select');
        setButton3Text('Select');
      }
    },100);
  }
  
  

  const [names, setNames] = useState(["Timmy Turret","Alex Lixler","Wilbur Walrus","Orange Ophelius","Jay Ninjago","Jojo Line","Jeffry Anode"]);
  const [grade, setGrade] = useState(0);
  const [name, setName] = useState('');
  const [studentsList, setStudentsList] = useState([]);
  let tempArr = []
  const handleGradeChange = (event) => {
    console.log(event.target.value);
    setGrade(event.target.value);
    updateStudentsList();
  };

  async function updateStudentsList() {
    const highestPoints = await GetHighestPoints();
    setStudentsList(highestPoints);
  }
  
  const handleNameChange = (event) => {
    setName(event.target.value);
    setGrade(GetDocumentData({coll: 'students', docu: 'S1', field: 'grade'}))
  };
  const handleSubmit = () => {
    setShowOptions(false);
    setSubmitted(true);
    let idGen = Math.floor(Math.random()*100000000);
    db.collection('prizeRequests').doc(idGen.toString()).set({id: idGen.toString(), name: name, grade: grade, prize: (b1 ? ('No Homework') : (b2 ? ('Giant Lollipop') : ('T-Shirt')))});
  }

  useEffect(() => {
    handleButton(b1,b2,b3);
    console.log(grade);
    if(name === 'Orange Ophelius' && grade == 11){ //update
      setShowOptions(true);
    }
    else{
      setShowOptions(false);
    }
  },[b1, b2, b3, name, grade, names, submitted]);

  return (
    <div className="m-2 p-2 ml-10 bg-white rounded-3xl">
      <Header category="Page" title="Prizes" />
    <div/>
    <div className="flex m-2 p-2 ml-10 bg-white rounded-3xl">
      <select value={grade} onChange={handleGradeChange}>
        <option value={0}>Please select a grade level</option>
        <option value={9}>9th Grade</option>
        <option value={10}>10th Grade</option>
        <option value={11}>11th Grade</option>
        <option value={12}>12th Grade</option>
      </select>
      <select className='ml-10' value={name} onChange={handleNameChange}>
        <option value="">Please select student name</option>
        { 
          names.map((name) =>
            <option value={name}>{name}</option>
          )
        }
      </select>
      <div className='ml-5'>
        <button 
        className='opacity-0.9 rounded-xl content-center p-4 hover:drop-shadow-xl h-auto'type="button"
        style={{color: '#03C9D7', backgroundColor: '#E5FAFB'}}
        onClick={() => {
          ((b1 || b2 || b3) ? (
            handleSubmit()
          ) : (
            alert('Prize not selected!')
          ))
        }}>
          Submit
        </button>
      </div>
    </div>
    {showOptions ? (
      <div className="flex flex-wrap lg:flex-nowrap justify-center h-screen">
        <div className="flex flex-wrap justify-center space-x-10">
          <div className="w-350 bg-white rounded-2xl p-6 m-3">
            <div className="flex justify-between">
              <p className="text-xl font-semibold">School Prize</p>
            </div>
            <div className="flex ml-5 mt-5 center mx-auto text-l text-black">
              No Homework <br/>
              for a Day
            </div>
            <img src={homework} alt='homework' width='250' height='250'></img>
            <div className="flex ml-5 mt-5 center mx-auto text-l text-black">
              <button
              type="button"
              style={b1Style}
              className="text-2xl opacity-0.9 rounded-full p-4 hover:drop-shadow-xl"
              onClick={() => {
                setB1(!b1);
                setB2(false);
                setB3(false);
              }}
            >
              {button1Text}
              </button>
            </div>
          </div>
          <div className="w-350 bg-whiterounded-2xl p-6 m-3">
            <div className="flex justify-between">
              <p className="text-xl font-semibold">Food Prize</p>
            </div>

            <div className="flex ml-5 mt-5 center mx-auto text-l text-black">
              Giant Lollipop
            </div>
            <img src={lollipop} alt='lollipop' width='250' height='250'></img>
            <div className="flex ml-5 mt-5 center mx-auto text-l text-black">
              <button
              type="button"
              style={b2Style}
              className="text-2xl opacity-0.9 rounded-full p-4 hover:drop-shadow-xl"
              onClick={() => {
                setB2(!b2);
                setB1(false);
                setB3(false);
              }}
            >
              {button2Text}
              </button>
            </div>
          </div>
          <div className="w-350 bg-white rounded-2xl p-6 m-3">
            <div className="flex justify-between">
              <p className="text-xl font-semibold">Spirit Prize</p>
            </div>

            <div className="flex ml-5 mt-5 center mx-auto text-l text-black">
              School T-Shirt
            </div>
            <img src={shirt} alt='t-shirt' width='250' height='250'></img>
            <div className="flex ml-5 mt-5 center mx-auto text-l text-black">
              <button
              type="button"
              style={b3Style}
              className="text-2xl opacity-0.9 rounded-full p-4 hover:drop-shadow-xl"
              onClick={() => {
                setB3(!b3);
                setB2(false);
                setB1(false);
              }}
            >
              {button3Text}
              </button>
            </div>
          </div>
        </div>
      </div>
    ) : (
      <div>
        {submitted ? (
          <div className="m-2 p-2 ml-10 text-xl h-screen">
            Thanks for submitting!
          </div>
        ) : (
          <div className="m-2 p-2 ml-10 text-xl h-screen">
            Sorry! You are not eligible for prizes.
          </div>
        )}
      </div>
    )}
      
    </div>
  );
};

export default Prizes;