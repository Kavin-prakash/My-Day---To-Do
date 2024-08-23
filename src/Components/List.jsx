import React, { useState } from 'react';
import '../Components/List.css';
import { Col, Container, Row } from 'react-bootstrap';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import GitHubIcon from '@mui/icons-material/GitHub';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import { Tooltip } from '@mui/material';
import NotificationSound from '../Asserts/Sound.wav'
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

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            updatestate ? updateTask() : AddTask();
        }
    }
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
        }
    };

    // Handle notification audio

    function play()
    {
        new Audio(NotificationSound).play();
    }

    const handledeletelist = (id) => {
        const deleteUpdatedTask = tasks.filter(task => task.id !== id);
        setTasks(deleteUpdatedTask);
        localStorage.setItem('To-do-List Data', JSON.stringify(deleteUpdatedTask));
        play();
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

    const handleImportance = (id) => {
        const taskIndex = tasks.findIndex(task => task.id === id);
        if (taskIndex > -1) {
            const updatedTasks = tasks.map(task =>
                task.id === id ? { ...task, important: !task.important } : task
            );
            const [importantTask] = updatedTasks.splice(taskIndex, 1);
            const finalTasks = [importantTask, ...updatedTasks];
            setTasks(finalTasks);
            localStorage.setItem('To-do-List Data', JSON.stringify(finalTasks));
        }
    };
    // Date only 
    const dateobject = new Date();
    const day = dateobject.getDay();
    const month = dateobject.getMonth();
    console.log(month)

    const dayarray = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const dayString = dayarray[day];
    console.log(dayString);
    const monthsarray = ["January", "February", "March", "April", "May", "June", "July", "August", "September",
        "octomber", "November", "December"];

    const monthstring = monthsarray[month];
    console.log(monthstring);

    return (
        <>
            <div>
                <Box sx={{ flexGrow: 1 }}>
                    <AppBar position="fixed">
                        <Toolbar variant="dense">
                            <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                                <MenuIcon />
                            </IconButton>
                            <Typography variant="h6" color="inherit" component="div">
                                To<CheckIcon />Do
                            </Typography>
                            {/* <Typography sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
                                {day},{monthstring}
                            </Typography> */}
                        </Toolbar>
                    </AppBar>
                </Box>
            </div>
            <Row style={{ marginTop: '60px' }}>
                <h2>{day},{monthstring}</h2>
            </Row>
            <Container fluid id='todolist' className='todolist-container'>
                <Row>
                    <Col xs={10} sm={6}>
                        <Box
                            sx={{
                                width: '100%',
                                margin: '0 auto',
                                padding: '5px',
                            }}
                        >
                            <TextField
                                value={textdata}
                                onChange={handleInputchange}
                                onKeyPress={handleKeyPress}
                                fullWidth
                                label="Add Your Task Quickly"
                                id="fullWidth"
                                variant="outlined"
                                margin="normal"
                            />
                        </Box>
                    </Col>

                </Row>


                {
                    updatestate ?
                        <Button onClick={updateTask} variant='contained' className='action-button'>Update Task</Button>
                        : textdata === '' ?
                            <Button disabled onClick={AddTask} variant='contained' className='action-button'>Add Task<AddIcon /></Button>
                            :
                            <Button onClick={AddTask} variant='contained' className='action-button'>Add Task<AddIcon /></Button>
                }

            </Container>
            <div className='task-list'>
                <h2>List of Tasks</h2>
                <ul>
                    {tasks.map((task) => (
                        <li key={task.id} className='task-item'>
                            {task.list}
                            <div className='task-actions'>
                                <Tooltip title={task.important ? "Importance" : "Mark as Important"} placement='top-start'>
                                    <Button onClick={() => handleImportance(task.id)} variant='contained'>
                                        {task.important ? <StarIcon /> : <StarBorderIcon />}
                                    </Button>
                                </Tooltip>
                                <Tooltip title="Edit Task" placement='top-start'>
                                    <Button onClick={() => handleEdit(task.list, task.id)} variant='contained' className='edit-button'><EditIcon /></Button>
                                </Tooltip>
                                <Tooltip title="Delete Task" placement='top-start'>
                                    <Button onClick={() => handledeletelist(task.id)} variant='contained' color='error' className='delete-button'><DeleteForeverIcon /></Button>
                                </Tooltip>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <div className='footer'>
                <div>
                    <h4>Reach Me </h4>
                </div>
                <p><a href='https://github.com/Kavin-prakash'><GitHubIcon /></a></p>
            </div>
        </>
    );
};
