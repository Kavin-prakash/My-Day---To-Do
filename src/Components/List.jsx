import React, { useState } from 'react';
import '../Components/List.css';
import { Col, Container, Row } from 'react-bootstrap';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
// import Swal from "sweetalert2";
import CheckIcon from '@mui/icons-material/Check';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import GitHubIcon from '@mui/icons-material/GitHub';

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
            // const Toast = Swal.mixin({
            //     toast: true,
            //     position: "top-end",
            //     showConfirmButton: false,
            //     timer: 500,
            //     timerProgressBar: true,
            //     customClass: {
            //         container: 'custom-toast'
            //     },
            //     didOpen: (toast) => {
            //         toast.onmouseenter = Swal.stopTimer;
            //         toast.onmouseleave = Swal.resumeTimer;
            //     },
            // });
            // Toast.fire({
            //     icon: "success",
            //     title: "Task Added Successfully",
            // });

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
                        </Toolbar>
                    </AppBar>
                </Box>

            </div>
            <Container fluid id='todolist' className='todolist-container'>
                <Row id='header'>
                    {/* <h2>My<CheckIcon /><b>To</b>Do Application</h2> */}
                </Row>
                <Row>
                    <Col xs={2} sm={6} >
                        {/* <DayPicker
                            mode="single"
                            onSelect={setSelected}
                        /> */}
                    </Col>
                    <Col xs={10} sm={6}>
                        <Box
                            sx={{
                                width: '100%',
                                // maxWidth: 800,
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
                                <Button onClick={() => handleEdit(task.list, task.id)} variant='contained' className='edit-button'><EditIcon /></Button>
                                <Button onClick={() => handledeletelist(task.id)} variant='contained' color='error' className='delete-button'><DeleteForeverIcon /></Button>
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
