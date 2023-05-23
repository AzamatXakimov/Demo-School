import { Box, Button, IconButton, Menu, MenuItem, Stack, TextField, Typography } from '@mui/material';
import { useRef, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import { v4 as uuidv4 } from 'uuid';
import { LeadsItem } from '../LeadsItem/LeadsItem';
// export const Leads = () => {
// 	const [items, setItems] = useState([
// 		{ id: 'item1', content: 'Item 1', zone: 'zone1' },
// 		{ id: 'item2', content: 'Item 2', zone: 'zone2' },
// 		{ id: 'item3', content: 'Item 3', zone: 'zone3' },
// 	]);

// 	const onDragEnd = (result) => {
// 		const { source, destination } = result;

// 		if (!destination) {
// 			return;
// 		}

// 		if (
// 			destination.droppableId === source.droppableId &&
// 			destination.index === source.index
// 		) {
// 			return;
// 		}

// 		const updatedItems = [...items];
// 		const draggedItem = items[source.index];

// 		// Remove item from the source zone
// 		updatedItems.splice(source.index, 1);

// 		// Insert item into the destination zone
// 		updatedItems.splice(destination.index, 0, draggedItem);
// 		draggedItem.zone = destination.droppableId;

// 		setItems(updatedItems);
// 	};

// 	return (
// 		<Box
// 			style={{
// 				display: 'flex',
// 				width: '1204px',
// 				height: '181px',
// 				marginLeft: '160px',
// 				padding: '28px',
// 				background: 'none',
// 			}}
// 		>
// 			<DragDropContext onDragEnd={onDragEnd}>
// 				<Droppable droppableId='zone1'>
// 					{(provided, snapshot) => (
// 						<Box
// 							{...provided.droppableProps}
// 							ref={provided.innerRef}
// 							style={{
// 								flex: '1',
// 								height: '100%',
// 								backgroundColor: snapshot.isDraggingOver
// 									? 'lightgreen'
// 									: 'white',
// 							}}
// 						>
// 							{items
// 								.filter((item) => item.zone === 'zone1')
// 								.map((item, index) => (
// 									<Draggable
// 										key={item.id}
// 										draggableId={item.id}
// 										index={index}
// 									>
// 										{(provided, snapshot) => (
// 											<Box
// 												ref={provided.innerRef}
// 												{...provided.draggableProps}
// 												{...provided.dragHandleProps}
// 												style={{
// 													opacity: snapshot.isDragging
// 														? 0.5
// 														: 1,
// 													backgroundColor:
// 														'lightblue',
// 													padding: '0.5rem',
// 													marginBottom: '0.5rem',
// 													...provided.draggableProps
// 														.style,
// 												}}
// 											>
// 												{item.content}
// 											</Box>
// 										)}
// 									</Draggable>
// 								))}
// 							{provided.placeholder}
// 						</Box>
// 					)}
// 				</Droppable>
// 				<Droppable droppableId='zone2'>
// 					{(provided, snapshot) => (
// 						<Box
// 							{...provided.droppableProps}
// 							ref={provided.innerRef}
// 							style={{
// 								flex: '1',
// 								height: '100%',
// 								backgroundColor: snapshot.isDraggingOver
// 									? 'lightgreen'
// 									: 'white',
// 							}}
// 						>
// 							{items
// 								.filter((item) => item.zone === 'zone2')
// 								.map((item, index) => (
// 									<Draggable
// 										key={item.id}
// 										draggableId={item.id}
// 										index={index}
// 									>
// 										{(provided, snapshot) => (
// 											<Box
// 												ref={provided.innerRef}
// 												{...provided.draggableProps}
// 												{...provided.dragHandleProps}
// 												style={{
// 													opacity: snapshot.isDragging
// 														? 0.5
// 														: 1,
// 													backgroundColor:
// 														'lightblue',
// 													padding: '0.5rem',
// 													marginBottom: '0.5rem',
// 													...provided.draggableProps
// 														.style,
// 												}}
// 											>
// 												{item.content}
// 											</Box>
// 										)}
// 									</Draggable>
// 								))}
// 							{provided.placeholder}
// 						</Box>
// 					)}
// 				</Droppable>
// 				<Droppable droppableId='zone3'>
// 					{(provided, snapshot) => (
// 						<Box
// 							{...provided.droppableProps}
// 							ref={provided.innerRef}
// 							style={{
// 								flex: '1',
// 								height: '100%',
// 								backgroundColor: snapshot.isDraggingOver
// 									? 'lightgreen'
// 									: 'white',
// 							}}
// 						>
// 							{items
// 								.filter((item) => item.zone === 'zone3')
// 								.map((item, index) => (
// 									<Draggable
// 										key={item.id}
// 										draggableId={item.id}
// 										index={index}
// 									>
// 										{(provided, snapshot) => (
// 											<Box
// 												ref={provided.innerRef}
// 												{...provided.draggableProps}
// 												{...provided.dragHandleProps}
// 												style={{
// 													opacity: snapshot.isDragging
// 														? 0.5
// 														: 1,
// 													backgroundColor:
// 														'lightblue',
// 													padding: '0.5rem',
// 													marginBottom: '0.5rem',
// 													...provided.draggableProps
// 														.style,
// 												}}
// 											>
// 												{item.content}
// 											</Box>
// 										)}
// 									</Draggable>
// 								))}
// 							{provided.placeholder}
// 						</Box>
// 					)}
// 				</Droppable>
// 			</DragDropContext>
// 		</Box>
// 	);
// };

export const Leads = () => {

    // Question MENU  
    const [questionMenu, setQuestionMenu] = useState(null);
    const questionOpen = Boolean(questionMenu);
    const questionMenuHandleClick = (event) => {
        setQuestionMenu(event.currentTarget);
    };
    const questionMenuHandleClose = () => {
        setQuestionMenu(null);
    };

    // Wait MENU  
    const [waitMenu, setWaitMenu] = useState(null);
    const waitOpen = Boolean(waitMenu);
    const waitMenuHandleClick = (event) => {
        setWaitMenu(event.currentTarget);
    };
    const waitMenuHandleClose = () => {
        setWaitMenu(null);
    };

    // Collection MENU  
    const [collectionMenu, setCollectionMenu] = useState(null);
    const collectionOpen = Boolean(collectionMenu);
    const collectionMenuHandleClick = (event) => {
        setCollectionMenu(event.currentTarget);
    };
    const collectionMenuHandleClose = () => {
        setCollectionMenu(null);
    };



    // DRAG AND DROP ZONE CODE 


    const [items, setItems] = useState([]);

	const onDragEnd = (result) => {
        console.log(result);
		const { source, draggableId,  destination } = result;

		if (!destination) {
			return;
		}

		if (
			destination.droppableId === source.droppableId &&
			destination.index === source.index
		) {
			return;
		}

		const updatedItems = [...items];
		const draggedItem = items.find((obj) => obj.id == draggableId);
		const draggedItemIndex = items.findIndex((obj) => obj.id == draggableId);
        draggedItem.zone = destination.droppableId;

		updatedItems.splice(draggedItemIndex, 1, draggedItem);

		setItems(updatedItems);
	};


    // SUBMITS INPUTS 
    const zone1NameRef = useRef();
    const zone1PhoneRef = useRef();
    const zone1DescRef = useRef();
    
    const zone2NameRef = useRef();
    const zone2PhoneRef = useRef();
    const zone2DescRef = useRef();
    
    const zone3NameRef = useRef();
    const zone3PhoneRef = useRef();
    const zone3DescRef = useRef();
    

    const hendelSubmit = (name, phone, desc, zone) => {
        const updateItems = [...items];

        updateItems.push({
            id: uuidv4(),
            name: name,
            phoneNumber: phone,
            desc: desc,
            zone: zone,
        })

        setItems(updateItems)
    }


    const deleteFn = (id) => {
        const updateItems = [...items];
        const deletedItemIndex = updateItems.findIndex(data => data.id == id);
        updateItems.splice(deletedItemIndex, 1);
        setItems(updateItems);
    }


	return (
		<>
            <DragDropContext onDragEnd={onDragEnd}>
                <Box sx={{ ml: '160px', p: '16px' }}>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'stretch',
                            justifyContent: 'space-between',
                            p: '12px',
                            backgroundColor: '#fff',
                        }}
                    >
                        <Box
                            sx={{
                                flexGrow: '1',
                                maxWidth: "428px",
                                mr: '12px',
                                px: '16px',
                                py: '8px',
                                border: '1px solid #ededed',
                            }}
                        >
                            <Box>
                                <Typography
                                    variant='h6'
                                    component='h3'
                                    fontWeight='bold'
                                >
                                    So'rovlar
                                </Typography>

                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                    }}
                                >
                                    <Button
                                        id='basic-button'
                                        aria-controls={
                                            questionOpen ? 'basic-menu' : undefined
                                        }
                                        aria-haspopup='true'
                                        aria-expanded={questionOpen ? 'true' : undefined}
                                        onClick={questionMenuHandleClick}
                                        sx={{
                                            color: "#607D8B",
                                            textTransform: "none",
                                        }}
                                        startIcon={<AddCircleOutlineOutlinedIcon />}
                                    >
                                        So'rov qo'shish
                                    </Button>

                                    <IconButton >
                                        <FormatListBulletedOutlinedIcon />
                                    </IconButton>
                                    
                                    <Menu
                                        id='basic-menu'
                                        anchorEl={questionMenu}
                                        open={questionOpen}
                                        onClose={questionMenuHandleClose}
                                        sx={{
                                            '& .MuiMenu-paper': {
                                                maxWidth: "216px",
                                                width: "100%",
                                            }
                                        }}
                                        MenuListProps={{
                                            'aria-labelledby': 'basic-button',
                                        }}
                                    >
                                        {/* <MenuItem>
                                            Profile
                                        </MenuItem> */}

                                        <Box component="form" sx={{p: "8px", borderRadius: "8px"}}  onSubmit={evt => {
                                            evt.preventDefault();
                                            hendelSubmit(
                                                zone1NameRef.current.value, 
                                                zone1PhoneRef.current.value, 
                                                zone1DescRef.current.value, 
                                                "zone1"
                                            )
                                            questionMenuHandleClose();
                                        }}>
                                            <Stack spacing={1}>
                                                <TextField type='text' label="Ismi" size='small' inputRef={zone1NameRef} required/>
                                                <TextField type='number' label="Telefon raqami" size='small' inputRef={zone1PhoneRef} required/>
                                                <TextField type='text' label="Tasvir" size='small' inputRef={zone1DescRef} required/>
                                                <Button type='submit' className='visually-hidden' sx={{m: "0", p: "0"}}></Button>
                                            </Stack>
                                        </Box>
                                    </Menu>
                                </Box>
                            </Box>

                            <Droppable droppableId='zone1'>
                                {(provided, snapshot) => (
                                    <Box
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                        sx={{
                                            // flex: '1',

                                            minHeight: '60px',
                                            backgroundColor: snapshot.isDraggingOver
                                                ? '#eaeaea'
                                                : 'transparent',
                                                transition: "background-color 0.3s ease",
                                                borderRadius: "8px",
                                        }}
                                    >
                                        {items
                                            .filter((item) => item.zone === 'zone1')
                                            .map((item, index) => (
                                                <Draggable
                                                    key={item.id}
                                                    draggableId={item.id}
                                                    index={index}
                                                >
                                                    {(provided, snapshot) => (
                                                        <Box
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            style={{
                                                                ...provided.draggableProps
                                                                    .style,
                                                            }}
                                                        >
                                                            <LeadsItem obj={item} delFn={deleteFn}/>
                                                        </Box>
                                                    )}
                                                </Draggable>
                                            ))}
                                        {provided.placeholder}
                                    </Box>
                                )}
                            </Droppable>
                        </Box>

                        <Box
                            sx={{
                                flexGrow: '1',
                                maxWidth: "428px",
                                mr: '12px',
                                px: '16px',
                                py: '8px',
                                border: '1px solid #ededed',
                            }}
                        >
                            <Box>
                                <Typography
                                    variant='h6'
                                    component='h3'
                                    fontWeight='bold'
                                >
                                    Kutish
                                </Typography>

                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                    }}
                                >
                                    <Button
                                        id='basic-button'
                                        aria-controls={
                                            waitOpen ? 'basic-menu' : undefined
                                        }
                                        aria-haspopup='true'
                                        aria-expanded={waitOpen ? 'true' : undefined}
                                        onClick={waitMenuHandleClick}
                                        sx={{
                                            color: "#607D8B",
                                            textTransform: "none",
                                        }}
                                        startIcon={<AddCircleOutlineOutlinedIcon />}
                                    >
                                        So'rov qo'shish
                                    </Button>

                                    <IconButton >
                                        <FormatListBulletedOutlinedIcon />
                                    </IconButton>
                                    
                                    <Menu
                                        id='basic-menu'
                                        anchorEl={waitMenu}
                                        open={waitOpen}
                                        onClose={waitMenuHandleClose}
                                        sx={{
                                            '& .MuiMenu-paper': {
                                                maxWidth: "216px",
                                                width: "100%",
                                            }
                                        }}
                                        MenuListProps={{
                                            'aria-labelledby': 'basic-button',
                                        }}
                                    >

                                        <Box component="form" sx={{p: "8px", borderRadius: "8px"}}  onSubmit={evt => {
                                            evt.preventDefault();
                                            hendelSubmit(
                                                zone2NameRef.current.value, 
                                                zone2PhoneRef.current.value, 
                                                zone2DescRef.current.value, 
                                                "zone2"
                                            )
                                            waitMenuHandleClose()
                                        }}>
                                            <Stack spacing={1}>
                                                <TextField type='text' label="Ismi" size='small' inputRef={zone2NameRef} required/>
                                                <TextField type='number' label="Telefon raqami" size='small' inputRef={zone2PhoneRef} required/>
                                                <TextField type='text' label="Tasvir" size='small' inputRef={zone2DescRef} required/>
                                                <Button type='submit' className='visually-hidden' sx={{m: "0", p: "0"}}></Button>
                                            </Stack>
                                        </Box>
                                    </Menu>
                                </Box>
                            </Box>

                            <Droppable droppableId='zone2'>
                                {(provided, snapshot) => (
                                    <Box
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                        sx={{
                                            flex: '1',
                                            minHeight: '60px',
                                            backgroundColor: snapshot.isDraggingOver
                                                ? '#eaeaea'
                                                : 'transparent',
                                            transition: "background-color 0.3s ease",
                                            borderRadius: "8px",
                                        }}
                                    >
                                        {items
                                            .filter((item) => item.zone === 'zone2')
                                            .map((item, index) => (
                                                <Draggable
                                                    key={item.id}
                                                    draggableId={item.id}
                                                    index={index}
                                                >
                                                    {(provided, snapshot) => (
                                                        <Box
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            style={{
                                                                ...provided.draggableProps
                                                                    .style,
                                                            }}
                                                        >
                                                            <LeadsItem obj={item} delFn={deleteFn}/>
                                                        </Box>
                                                    )}
                                                </Draggable>
                                            ))}
                                        {provided.placeholder}
                                    </Box>
                                )}
                            </Droppable>
                        </Box>

                        <Box
                            sx={{
                                flexGrow: '1',
                                maxWidth: "428px",
                                mr: '12px',
                                px: '16px',
                                py: '8px',
                                border: '1px solid #ededed',
                            }}
                        >
                            <Box>
                                <Typography
                                    variant='h6'
                                    component='h3'
                                    fontWeight='bold'
                                >
                                    
                                    To'plam
                                </Typography>

                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                    }}
                                >
                                    <Button
                                        id='basic-button'
                                        aria-controls={
                                            collectionOpen ? 'basic-menu' : undefined
                                        }
                                        aria-haspopup='true'
                                        aria-expanded={collectionOpen ? 'true' : undefined}
                                        onClick={collectionMenuHandleClick}
                                        sx={{
                                            color: "#607D8B",
                                            textTransform: "none",
                                        }}
                                        startIcon={<AddCircleOutlineOutlinedIcon />}
                                    >
                                        So'rov qo'shish
                                    </Button>

                                    <IconButton >
                                        <FormatListBulletedOutlinedIcon />
                                    </IconButton>
                                    
                                    <Menu
                                        id='basic-menu'
                                        anchorEl={collectionMenu}
                                        open={collectionOpen}
                                        onClose={collectionMenuHandleClose}
                                        sx={{
                                            '& .MuiMenu-paper': {
                                                maxWidth: "216px",
                                                width: "100%",
                                            }
                                        }}
                                        MenuListProps={{
                                            'aria-labelledby': 'basic-button',
                                        }}
                                    >

                                        <Box component="form" sx={{p: "8px", borderRadius: "8px"}}  onSubmit={evt => {
                                            evt.preventDefault();
                                            hendelSubmit(
                                                zone3NameRef.current.value, 
                                                zone3PhoneRef.current.value, 
                                                zone3DescRef.current.value, 
                                                "zone3"
                                            )
                                            collectionMenuHandleClose();
                                        }}>
                                            <Stack spacing={1}>
                                                <TextField type='text' label="Ismi" size='small' inputRef={zone3NameRef} required/>
                                                <TextField type='number' label="Telefon raqami" size='small' inputRef={zone3PhoneRef} required/>
                                                <TextField type='text' label="Tasvir" size='small' inputRef={zone3DescRef} required/>
                                                <Button type='submit' className='visually-hidden' sx={{m: "0", p: "0"}}></Button>
                                            </Stack>
                                        </Box>
                                    </Menu>
                                </Box>
                            </Box>

                            <Droppable droppableId='zone3'>
                                {(provided, snapshot) => (
                                    <Box
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                        sx={{
                                            flex: '1',
                                            minHeight: '60px',
                                            backgroundColor: snapshot.isDraggingOver
                                                ? '#eaeaea'
                                                : 'transparent',
                                                transition: "background-color 0.3s ease",
                                                borderRadius: "8px",
                                        }}
                                    >
                                        {items
                                            .filter((item) => item.zone === 'zone3')
                                            .map((item, index) => (
                                                <Draggable
                                                    key={item.id}
                                                    draggableId={item.id}
                                                    index={index}
                                                >
                                                    {(provided, snapshot) => (
                                                        <Box
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            style={{
                                                                ...provided.draggableProps
                                                                    .style,
                                                            }}
                                                        >
                                                            <LeadsItem obj={item} delFn={deleteFn}/>
                                                        </Box>
                                                    )}
                                                </Draggable>
                                            ))}
                                        {provided.placeholder}
                                    </Box>
                                )}
                            </Droppable>
                        </Box>
                    </Box>
                </Box>
            </DragDropContext>
		</>
	);
};
