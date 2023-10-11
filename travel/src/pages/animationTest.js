import React,{useState} from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import{DragDropContext, Droppable} from 'react-beautiful-dnd';

const Column = ({title,tasks,id})=>{
    return(
        <div style={{
            backgroundColor:'blue',
            width:'300px',
            height:'470px',
            overflowY:'scroll', 
            msOverflowY:'none',
            border: '1px solid black',
        }}><h2>{title}
        </h2>

        <Droppable droppableId={id}>
            {
                (provide, snapshot)=>{
                    
                }
            }

        </Droppable>
        </div>
    )
}

export default function AnimationTest() {
    const [show,setShow] = useState(true);

    const [completed, setCompleted] = useState([]);
    const [incompleted, setIncompleted] = useState([]);
  return (
    <>
    <motion.h1
        initial={{x:-1000}}
        animate={{x:[900,0]}}
        transition={{
            // duration: "2",
            // delay: "1"
        }}
        whileHover={{scale: "0.5"}}
    >
        H1 element for animation.
    </motion.h1>
    
    <div style={{
            display:'flex', flexDirection:'column',
            gap:'10px',alignItems:'center'
        }}>
        <h1>Exit and enter animation</h1>

        <AnimatePresence>
            {
                show&& <motion.div style={{
                    width:'100px', height:'100px', background:'blue'}}
                    initial={{opacity:0, x:0}}   
                    animate={{opacity:1, x:-100}}
                    exit={{opacity:0,x:-150}}
                    transition={{
                        duration: "1"
                    }}
                >
                </motion.div>
            }
            
        </AnimatePresence>

            <button onClick={()=>{setShow(!show)}}>{
                show? "Remove cube":"Add Box"
            }</button>
    </div>

    <div>
        <h1 style={{textAlign:'center'}}>Draggable Object</h1>
    
        <div style={{
            display:'flex', flexDirection:'row',
            gap:'200px', alignItems:'center', justifyContent:'center',
            marginTop:'100px'
        }}>
            <div>
                <p>No constraint</p>
                <motion.div
                    style={{width:'100px', height:'100px', background:'blue'}}
                    drag
                >
                </motion.div>
            </div>

            <div>
                <p>Drag Y only</p>
                <motion.div
                    style={{width:'100px', height:'100px', background:'blue'}}
                    drag = "y"
                >
                </motion.div>
            </div>

            <div>
                <p>Drag constraint</p>
                <motion.div
                    style={{width:'100px', height:'100px', background:'blue'}}
                    drag
                    dragConstraints={{left:0, right:100, top:-100}}
                >
                </motion.div>
            </div>
        </div>
    </div>

{/* kanban board */}
    <DragDropContext>
        <h3>Progress board</h3>

        <div style={{
            display:"flex",
            justifyContent: "space-between",
            alignItems:"center",
            flexDirection:"row",
        }}>

        </div>

    </DragDropContext>

    </>
  )
}
