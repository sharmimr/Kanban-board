import './App.css';
import DragNDrop from './components/DragNDrop';
import { useEffect, useState } from 'react';

const data = [
  {title:"To Do",items:[1,2,3]},
  {title:"In Development",items:[4,5]},
  {title:"In Testing",items:[6,7]},
  {title:"Released",items:[8,9]},
]
  

function App() {
  const [data1,setData1] = useState(data);
  const [addedTask,setAddedTask]=useState(10);
  const [val,setVal]=useState('');
useEffect(()=>{
  setData1(data);
},[]);

  const handleAddTask = () =>{
      setData1([...data1].map(obj=>{
        console.log(obj)
        if(obj.title==='To Do'){
          return {...obj, items:[...obj.items,addedTask]}
        }else return obj
      }));
      setAddedTask(addedTask+1);
  }

  const handleDeleteTask=(e)=>{
    e.target.remove();
  }



  return (
    <div className="App">
      <header className="App-header">
        <DragNDrop data={data1} handleAddTask={handleAddTask} handleDeleteTask={handleDeleteTask}/>
      </header>
    </div>
  );
}

export default App;
