// import React, { useState } from 'react';
// import '../Components/List.css';
// import { Container } from 'react-bootstrap';
// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
// import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
// import AddIcon from '@mui/icons-material/Add';
// import EditIcon from '@mui/icons-material/Edit';
// import Swal from "sweetalert2";
// export const List = () => {
//     const [textdata, SetTextdata] = useState('');
//     const [tasks, setTasks] = useState(() => {
//         const savedTasks = localStorage.getItem('To-do-List Data');
//         return savedTasks ? JSON.parse(savedTasks) : [];
//     });
//     const [updatestate, SetUpdatestate] = useState(false);
//     const [editId, SeteditId] = useState(null);

//     const handleInputchange = (event) => {
//         SetTextdata(event.target.value);
//     };

//     const AddTask = () => {
//         if (textdata.trim()) {
//             const newTask = {
//                 id: tasks.length + 1,
//                 list: textdata
//             };
//             const updatedTasks = [...tasks, newTask];
//             setTasks(updatedTasks);
//             localStorage.setItem('To-do-List Data', JSON.stringify(updatedTasks));

//             SetTextdata('');
//             const Toast = Swal.mixin({
//                 toast: true,
//                 position: "center",
//                 showConfirmButton: false,
//                 timer: 2000,
//                 timerProgressBar: true,
//                 customClass: {
//                     container: 'custom-toast'
//                 },
//                 didOpen: (toast) => {
//                     toast.onmouseenter = Swal.stopTimer;
//                     toast.onmouseleave = Swal.resumeTimer;
//                 },
//             });
//             Toast.fire({
//                 icon: "success",
//                 title: "Task Added Successfully",
//             });

//         }
//     };

//     const handledeletelist = (id) => {
//         const deleteUpdatedTask = tasks.filter(task => task.id !== id);
//         setTasks(deleteUpdatedTask);
//         localStorage.setItem('To-do-List Data', JSON.stringify(deleteUpdatedTask));
//     };



//     const handleEdit = (listvalue, id) => {
//         SetTextdata(listvalue);
//         SetUpdatestate(true);
//         SeteditId(id);
//     }

//     const updateTask = () => {
//         const updatedTasks = tasks.map(task =>
//             task.id === editId ? { ...task, list: textdata } : task
//         );
//         setTasks(updatedTasks); // update in the internal storage (statecomponent)
//         localStorage.setItem('To-do-List Data', JSON.stringify(updatedTasks)); // update in the locah storeage 
//         SetTextdata('');
//         SetUpdatestate(false);
//         SeteditId(null);

//     }

//     return (
//         <>
//             <Container fluid id='todolist' style={{ marginTop: '25px' }}>
//                 <Box
//                     sx={{
//                         width: 800,
//                         maxWidth: '100%',
//                     }}
//                 >
//                     <TextField value={textdata} onChange={handleInputchange} fullWidth label="Add Your Task Quickly" id="fullWidth" />
//                 </Box>

//                 {
//                     updatestate ?
//                         <Button onClick={updateTask} variant='contained'>Update Task</Button>
//                         :
//                         <Button onClick={AddTask} variant='contained'>Add Task<AddIcon /></Button>
//                 }
//             </Container>
//             <div>
//                 <h1>List of Tasks</h1>
//                 <ul style={{ textDecoration: 'none' }} >
//                     {tasks.map((task) => (
//                         <li key={task.id}>{task.list}
//                             <br></br>
//                             <Button onClick={() => handleEdit(task.list, task.id)} variant='contained'><EditIcon /></Button>
//                             <Button onClick={() => handledeletelist(task.id)} variant='contained' color='error'><DeleteForeverIcon /></Button>
//                         </li>
//                     ))}
//                 </ul>
//             </div>
//         </>
//     );
// };

import React, { useState } from 'react';
import '../Components/List.css';
import { Container, Row } from 'react-bootstrap';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import Swal from "sweetalert2";
import CheckIcon from '@mui/icons-material/Check';

export const List = () => {
    const [textdata, SetTextdata] = useState('');
    const [tasks, setTasks] = useState(() => {
        const savedTasks = localStorage.getItem('To-do-List Data');
        return savedTasks ? JSON.parse(savedTasks) : [];
    });
    const [updatestate, SetUpdatestate] = useState(false);
    const [editId, SeteditId] = useState(null);

    const handleInputchange = (event) => {
        SetTextdata(event.target.value);
    };

    const AddTask = () => {
        if (textdata.trim()) {
            const newTask = {
                id: tasks.length + 1,
                list: textdata
            };
            const updatedTasks = [...tasks, newTask];
            setTasks(updatedTasks);
            localStorage.setItem('To-do-List Data', JSON.stringify(updatedTasks));

            SetTextdata('');
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 500,
                timerProgressBar: true,
                customClass: {
                    container: 'custom-toast'
                },
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                },
            });
            Toast.fire({
                icon: "success",
                title: "Task Added Successfully",
            });

        }
    };

    const handledeletelist = (id) => {
        const deleteUpdatedTask = tasks.filter(task => task.id !== id);
        setTasks(deleteUpdatedTask);
        localStorage.setItem('To-do-List Data', JSON.stringify(deleteUpdatedTask));
    };

    const handleEdit = (listvalue, id) => {
        SetTextdata(listvalue);
        SetUpdatestate(true);
        SeteditId(id);
    }

    const updateTask = () => {
        const updatedTasks = tasks.map(task =>
            task.id === editId ? { ...task, list: textdata } : task
        );
        setTasks(updatedTasks);
        localStorage.setItem('To-do-List Data', JSON.stringify(updatedTasks));
        SetTextdata('');
        SetUpdatestate(false);
        SeteditId(null);
    }

    return (
        <>
            <Container fluid id='todolist' className='todolist-container'>
                <Row id='header'>
                    <h2>My<CheckIcon/><b>To</b>Do Application</h2>
                </Row>
                <Box
                    sx={{
                        width: '100%',
                        maxWidth: 800,
                        margin: '0 auto',
                        padding: '20px',
                    }}
                >
                    <TextField 
                        value={textdata} 
                        onChange={handleInputchange} 
                        fullWidth 
                        label="Add Your Task Quickly" 
                        id="fullWidth" 
                        variant="outlined"
                        margin="normal"
                    />
                </Box>

                {
                    updatestate ?
                        <Button onClick={updateTask} variant='contained' className='action-button'>Update Task</Button>
                        :
                        <Button onClick={AddTask} variant='contained' className='action-button'>Add Task<AddIcon /></Button>
                }
            </Container>
            <div className='task-list'>
                <h1>List of Tasks</h1>
                <ul>
                    {tasks.map((task) => (
                        <li key={task.id} className='task-item'>
                            {task.list}
                            <div className='task-actions'>
                                <Button onClick={() => handleEdit(task.list, task.id)} variant='contained' className='edit-button'><EditIcon /></Button>
                                <Button onClick={() => handledeletelist(task.id)} variant='contained' color='error' className='delete-button'><DeleteForeverIcon /></Button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <div className='footer'>
                <p>@designed by Kavin Prakash</p>
            </div>
        </>
    );
};
