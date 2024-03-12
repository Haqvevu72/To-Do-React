import React , { useState , useRef } from 'react';
import buttonImg from './pen.png'
import saveImg from './diskette.png';
import '../ Styles/Main.css'
function Main()
{
    const [tasks , setTasks] = useState([]);
    const [previousText , setPreviousText] = useState('')
    const inputRef = useRef(null);
    const taskInputRefs = useRef([]);
    
    const addTask = () => {
        (inputRef.current.value) ? setTasks([...tasks , {taskContent: inputRef.current.value , status: false , save: false}]) : alert('Write Something !');
        setPreviousText(inputRef.current.value);
        inputRef.current.value = null;
    }
    
    const removeTask = (indexToDelete) => {
        setTasks(prevTasks => prevTasks.filter( ( task , index ) => index !== indexToDelete ) );
    }
    
    const handleEnter = (event) => {
        if(event.key === 'Enter')
        addTask();
}

const handleCheck = (indexToCheck) => {
    const updatedTasks = [...tasks];
    
    updatedTasks[indexToCheck] = { 
        ...updatedTasks[indexToCheck] , status: !updatedTasks[indexToCheck].status 
    };
    
    setTasks(updatedTasks);
}

const handleContentChange = (index , newValue) => {
    
    const updatedTasks = [...tasks];
    
    updatedTasks[index].taskContent = newValue;
    
    setTasks(updatedTasks);
};

const handleEdit = (indexToEdit) => {

    const updatedTasks = [...tasks];
    
    updatedTasks[indexToEdit].save = !tasks[indexToEdit].save;
    
    setTasks(updatedTasks);
}

const handleSave = (indexToEdit , text) => {

    const updatedTasks = [...tasks];
    
    updatedTasks[indexToEdit].save = !tasks[indexToEdit].save;
    updatedTasks[indexToEdit].taskContent ? updatedTasks[indexToEdit].taskContent = text : updatedTasks[indexToEdit].taskContent = previousText;

    setTasks(updatedTasks);

}

    return(
        <div>
            <div className='container-input'>
                <div>
                    <input placeholder='To-Do...' 
                           className='to-do-input'
                           ref = {inputRef}
                           onKeyDown={handleEnter}
                    ></input>
                </div>
                <div> 
                    <button class="button" type="button" onClick={ addTask }>
                    <span class = "button__text"  >Add Task</span>
                    <span class="button__icon"><svg class="svg" fill="none" height="24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><line x1="12" x2="12" y1="5" y2="19"></line><line x1="5" x2="19" y1="12" y2="12"></line></svg></span>
                    </button>
                </div>
            </div>
            <div>
                 <ul className='task-list'>
                    {
                        tasks.map ( ( task , index ) => (
                            <li key = { index } className='list-item'>
                                <div>
                                    <label class="container">
                                        <input  type="checkbox"  onChange={() => handleCheck(index)}/>
                                        <div class="checkmark"></div>
                                    </label>
                                </div>
                                <div>
                                    <input className='task' 
                                           value={task.taskContent} 
                                           style={ {textDecoration: (task.status) ? 'line-through' : 'none' , textDecorationThickness: '20px'} }
                                           onChange={(e) => handleContentChange(index , e.target.value)}
                                           ref={el => taskInputRefs.current[index] = el}
                                    ></input>
                                </div>
                                <div>
                                    <button class="bin-button" onClick = { () => removeTask(index) }>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 39 7"
                                            class="bin-top"
                                        >
                                            <line stroke-width="4" stroke="white" y2="5" x2="39" y1="5"></line>
                                            <line
                                            stroke-width="3"
                                            stroke="white"
                                            y2="1.5"
                                            x2="26.0357"
                                            y1="1.5"
                                            x1="12"
                                            ></line>
                                        </svg>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 33 39"
                                            class="bin-bottom"
                                        >
                                            <mask fill="white" id="path-1-inside-1_8_19">
                                            <path
                                                d="M0 0H33V35C33 37.2091 31.2091 39 29 39H4C1.79086 39 0 37.2091 0 35V0Z"
                                            ></path>
                                            </mask>
                                            <path
                                            mask="url(#path-1-inside-1_8_19)"
                                            fill="white"
                                            d="M0 0H33H0ZM37 35C37 39.4183 33.4183 43 29 43H4C-0.418278 43 -4 39.4183 -4 35H4H29H37ZM4 43C-0.418278 43 -4 39.4183 -4 35V0H4V35V43ZM37 0V35C37 39.4183 33.4183 43 29 43V35V0H37Z"
                                            ></path>
                                            <path stroke-width="4" stroke="white" d="M12 6L12 29"></path>
                                            <path stroke-width="4" stroke="white" d="M21 6V29"></path>
                                        </svg>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 89 80"
                                            class="garbage"
                                        >
                                            <path
                                            fill="white"
                                            d="M20.5 10.5L37.5 15.5L42.5 11.5L51.5 12.5L68.75 0L72 11.5L79.5 12.5H88.5L87 22L68.75 31.5L75.5066 25L86 26L87 35.5L77.5 48L70.5 49.5L80 50L77.5 71.5L63.5 58.5L53.5 68.5L65.5 70.5L45.5 73L35.5 79.5L28 67L16 63L12 51.5L0 48L16 25L22.5 17L20.5 10.5Z"
                                            ></path>
                                        </svg>
                                    </button>
                                </div>
                                <div>
                                    <button className='edit-btn' onClick={() => {
                                        handleEdit(index);
                                        taskInputRefs.current[index].focus();
                                    }}>
                                         <div>
                                            <img src={buttonImg} alt='edit' style = {{width:'22px'}}></img>
                                         </div>
                                    </button>
                                </div>
                                <div style = {{display: task.save ? 'inline' : 'none'}}>
                                    <button className='save-btn' onClick={() => 
                                        handleSave(index , taskInputRefs.current[index].value)
                                    }>
                                        <div>
                                            <img src={saveImg} alt="save" style={{width:'22px'}}></img>
                                        </div>
                                    </button>
                                </div>
                            </li>
                        ) )
                    }
                 </ul>
            </div>
        </div>
         
    );
}

export default Main;