import React, { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Button, Typography, Box, TextField, InputAdornment
} from '@mui/material';
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import './AdminAcoountBoard.css';

// Dummy fetch function, replace with your API call
const fetchAccounts = async () => [
    { username: 'admin', email: 'admin@example.com', role: 'Admin' },
    { username: 'manager1', email: 'manager1@example.com', role: 'Manager' },
    { username: 'user123', email: 'user123@example.com', role: 'Customer' },
    { username: 'alice', email: 'alice@example.com', role: 'Customer' },
    { username: 'bob', email: 'bob@example.com', role: 'Manager' },
    { username: 'charlie', email: 'charlie@example.com', role: 'Admin' },
    { username: 'diana', email: 'diana@example.com', role: 'Customer' },
    { username: 'eve', email: 'eve@example.com', role: 'Manager' },
  ];

export default function AdminAccountsTable() {
  const [accounts, setAccounts] = useState([]);
  const [filteredAccounts, setFilteredAccounts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchAccounts().then(data => {
      setAccounts(data);
      setFilteredAccounts(data);
    });
  }, []);

  // Search functionality
  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    
    const filtered = accounts.filter(account => 
      account.username.toLowerCase().includes(query) ||
      account.email.toLowerCase().includes(query) ||
      account.role.toLowerCase().includes(query)
    );
    
    setFilteredAccounts(filtered);
  };

  // Example action handlers
  const handleDelete = (username) => {
    const updatedAccounts = accounts.filter(acc => acc.username !== username);
    setAccounts(updatedAccounts);
    setFilteredAccounts(updatedAccounts.filter(acc => 
      acc.username.toLowerCase().includes(searchQuery) ||
      acc.email.toLowerCase().includes(searchQuery) ||
      acc.role.toLowerCase().includes(searchQuery)
    ));
    // Add API call to delete here
  };  return (
    <Box className="admin-account-container">
      <Typography variant="h3" gutterBottom className="admin-account-title">
        Account Management
      </Typography>
      <Typography variant="subtitle1" gutterBottom className="admin-subtitle">
        Manage user accounts, roles, and permissions
      </Typography>
      
      <Box className="admin-account-controls">
        <Button 
          variant="contained" 
          color="primary"
          className="create-account-btn"
        >
          Create Account
        </Button>
        <TextField
          placeholder="Search accounts..."
          size="medium"
          value={searchQuery}
          onChange={handleSearch}
          className="search-field"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            )
          }}
        />
      </Box>
      
      <TableContainer component={Paper} className="table-container">
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow className="table-header">
              <TableCell className="table-header-cell">Username</TableCell>
              <TableCell className="table-header-cell">Email</TableCell>
              <TableCell className="table-header-cell">Role</TableCell>
              <TableCell align="center" className="table-header-cell">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredAccounts.map((acc, index) => (
              <TableRow 
                key={acc.username}
                className={`table-row ${index % 2 !== 0 ? 'table-row-odd' : ''}`}
              >
                <TableCell className="table-cell">{acc.username}</TableCell>
                <TableCell className="table-cell">{acc.email}</TableCell>
                <TableCell className="table-cell">
                  <span className={`role-badge role-${acc.role.toLowerCase()}`}>
                    {acc.role}
                  </span>
                </TableCell>
                <TableCell align="center" className="table-cell">
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDelete(acc.username)}
                    className="action-button"
                  >
                    Delete
                  </Button>
                  <Button
                    variant="outlined"
                    color="primary"
                    className="action-button"
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {filteredAccounts.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} align="center" className="empty-message">
                  <Typography variant="subtitle1">
                    No accounts found.
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}