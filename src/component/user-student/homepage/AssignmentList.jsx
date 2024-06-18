import FilterListIcon from '@mui/icons-material/FilterList';
import { AppBar, Box, Container, Divider, IconButton, List, ListItem, ListItemText, Toolbar, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { UserAuth } from '../../../context/AuthContext';
import { findTeacher } from '../../../services/AccountService';
import { getStudentAssignment } from '../../../services/AssignmentsService';
function AssignmentList() {
    const { user } = UserAuth();
    const [assignments, setAssignments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            const fetchAssignments = async () => {
                try {
                    const studentId = user.uid;
                    const assignmentsData = await getStudentAssignment(studentId);
                    const assignmentsWithTeachers = await Promise.all(assignmentsData.map(async (assignment) => {
                        const teacherInfo = await findTeacher(assignment.teacherId);
                        return {
                            ...assignment,
                            teacherName: teacherInfo.found ? teacherInfo.data.name : "Unknown Teacher"
                        };
                    }));
                    setAssignments(assignmentsWithTeachers);
                } catch (error) {
                    console.error("Error fetching assignments:", error);
                } finally {
                    setLoading(false);
                }
            };

            fetchAssignments();
        }
    }, [user]);

    if (loading) {
        return <Typography>Loading...</Typography>;
    }

    return (
        <Container>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Sort By Date 
                        </Typography>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                            <FilterListIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                    {assignments.map((assignment) => (
                        <React.Fragment key={assignment.assignmentId}>
                            <ListItem>
                                <ListItemText
                                    primary={assignment.title}
                                    secondary={`Due Date: ${assignment.dueDate} | Teacher: ${assignment.teacherName}`}
                                />
                            </ListItem>
                            <Divider variant="inset" component="li" />
                        </React.Fragment>
                    ))}
                </List>
            </Box>
        </Container>
    );
}

export default AssignmentList;
