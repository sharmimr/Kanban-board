import React, {useState, useRef, useEffect} from 'react';

function DragNDrop({data,handleAddTask,handleDeleteTask}){console.log(data);
   const [list,setList ] = useState(data);
   const [dragging,setDragging] = useState(false);
   const dragItem = useRef();
   const dragNode = useRef();
    const handleDragStart=(e,params)=>{
        console.log("TARTED DRAGGING",params);
        dragItem.current = params;
        dragNode.current = e.target;
        dragNode.current.addEventListener('dragend',handleDragEnd);
        setTimeout(()=>{
            setDragging(true);
        },0)
    }

    const handleDragEnd = () =>{
        console.log("Drag end");
        setDragging(false);
        dragNode.current.removeEventListener('dragend',handleDragEnd);
        dragItem.current = null;
        dragNode.current = null;
    }

    useEffect(()=>{
        setList(data)
    },[data])

    const handleDragEnter=(e,params)=>{
        console.log("DARG ENTER",params);
        const currentItem=dragItem.current;
        if(e.target !== dragNode.current){
            console.log("TARGET NOTT AME");
            setList(oldList=>{
                let newList = JSON.parse(JSON.stringify(oldList));
                newList[params.grpI].items.splice(params.itemI,0,newList[currentItem.grpI].items.splice(currentItem.itemI,1)[0]);
                dragItem.current=params;
                console.log(newList,"NEWLIST")
                return newList;
            })
        }
    }

    const getStyles = (params) =>{
        const currentItem = dragItem.current;
        console.log(currentItem,"currentItem",params)
        if(currentItem.grpI === params.grpI && currentItem.itemI === params.itemI)
            return "current dnd-item";
        else return "dnd-item";
    } 

    return (
        <>
            
        <h3>Kanban Board</h3>
        <button onClick={handleAddTask}>Add Task</button>
        <div className="drag-n-drop">
        {list.map((grp,grpI)=>{
          return (<div key={grp.title} className="dnd-group"
          onDragEnter={dragging && !grp.items.length?(e)=>handleDragEnter(e,{grpI,itemI:0}):null}>
            <div className='group-title'>{grp.title}</div>
            {grp.items.map((item,itemI)=>{
              return (<div draggable 
              onDragStart={(e)=>{handleDragStart(e,{itemI,grpI})}} 
              onDragEnter={dragging?(e)=>handleDragEnter(e,{grpI,itemI}):null} onClick={handleDeleteTask}
              className={dragging?getStyles({itemI,grpI}):"dnd-item"} 
              key={item}>
                {item}
                </div>)
            })}
            </div>)
        })}
            
        </div>
        </>
    )
}

export default DragNDrop;