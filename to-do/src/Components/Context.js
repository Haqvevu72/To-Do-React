import React , { createContext , useState , useRef } from 'react';

export const ToDoContext = createContext();

export default function Context(props) {
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

    const value = { addTask , removeTask , handleEnter , handleCheck , handleContentChange , 
        handleEdit , handleSave , tasks , previousText , inputRef , taskInputRefs };
    
    return (
        <ToDoContext.Provider value = {value}>
            {props.children}
        </ToDoContext.Provider>
    );
}