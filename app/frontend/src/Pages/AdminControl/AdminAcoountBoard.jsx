import React, { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Button, Typography, Box, TextField, InputAdornment, Dialog, DialogTitle,
  DialogContent, DialogActions, FormControl, InputLabel, Select, MenuItem,
  FormHelperText, CircularProgress
} from '@mui/material';
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import './AdminAcoountBoard.css';
import { useAuth } from '../../customHook/useAuth';

// API functions for account management
const fetchAccounts = async (token) => {
  try {
    // In a real application, you would have an API endpoint to get all accounts
    // Here we'll use the /auth/me endpoint to demonstrate the concept
    const response = await fetch('http://127.0.0.1:8000/auth/me', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch accounts');
    }
    
    const data = await response.json();
    
    // For demonstration, we'll create a list with just this account
    // In a real app, you'd fetch all accounts from an admin endpoint
    return [data];
  } catch (error) {
    console.error('Error fetching accounts:', error);
    return [];
  }
};

// Create new account using signup API
const createAccount = async (accountData) => {
  try {
    const response = await fetch('http://127.0.0.1:8000/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(accountData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Failed to create account');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error creating account:', error);
    throw error;
  }
};

// Update account using the me/update API
const updateAccount = async (accountData, token) => {
  try {
    // Format the data correctly based on what the API expects
    const updateData = {
      full_name: accountData.full_name || '',
      phone_number: accountData.phone_number || '',
      address: accountData.address || '',
      dob: accountData.dob ? new Date(accountData.dob).toISOString() : null,
      sex: accountData.sex || 'male',
      email: accountData.email || ''
    };

    console.log('Updating account with data:', updateData);

    const response = await fetch('http://127.0.0.1:8000/auth/me/update', {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updateData)
    });

    if (!response.ok) {
      let errorMessage = 'Failed to update account';
      try {
        const errorData = await response.json();
        errorMessage = errorData.detail || errorMessage;
      } catch (e) {
        // If response is not JSON, try to get text
        errorMessage = await response.text() || errorMessage;
      }
      throw new Error(errorMessage);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error updating account:', error);
    throw error;
  }
};

export default function AdminAccountsTable() {
  const { isLoggedIn, token } = useAuth();
  const [accounts, setAccounts] = useState([]);
  const [filteredAccounts, setFilteredAccounts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Dialog states
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [currentAccount, setCurrentAccount] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  
  // Form state for create/edit
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    full_name: '',
    phone_number: '',
    address: '',
    dob: new Date().toISOString().split('T')[0], // Today's date as default
    role: 'Customer',
    sex: 'male'
  });

  useEffect(() => {
    if (isLoggedIn) {
      setIsLoading(true);
      fetchAccounts(token)
        .then(data => {
          setAccounts(data);
          setFilteredAccounts(data);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [isLoggedIn, token]);

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
  // Handle input change in the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear the error for this field when user types
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: ''
      });
    }
  };
  
  // Open the create account dialog
  const handleOpenCreateDialog = () => {
    // Reset form data and errors
    setFormData({
      username: '',
      email: '',
      password: '',
      full_name: '',
      phone_number: '',
      address: '',
      dob: new Date().toISOString().split('T')[0],
      role: 'Customer',
      sex: 'male'
    });
    setFormErrors({});
    setOpenCreateDialog(true);
  };
  
  // Open the edit account dialog
  const handleOpenEditDialog = (account) => {
    setCurrentAccount(account);
    setFormData({
      ...account,
      password: '', // Don't populate password field
    });
    setFormErrors({});
    setOpenEditDialog(true);
  };
  
  // Close dialogs
  const handleCloseDialog = () => {
    setOpenCreateDialog(false);
    setOpenEditDialog(false);
  };
  
  // Validate form before submission
  const validateForm = (isCreating = true) => {
    const errors = {};
    
    if (!formData.username) errors.username = 'Username is required';
    if (!formData.email) errors.email = 'Email is required';
    if (isCreating && !formData.password) errors.password = 'Password is required';
    if (!formData.full_name) errors.full_name = 'Full name is required';
    
    // Email validation
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (formData.email && !emailPattern.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    // Phone validation (simple)
    if (formData.phone_number && !/^\d{10,15}$/.test(formData.phone_number)) {
      errors.phone_number = 'Please enter a valid phone number';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  // Handle create account form submission
  const handleCreateAccount = async () => {
    if (!validateForm(true)) return;
    
    try {
      setIsLoading(true);
      const newAccount = await createAccount(formData);
      
      // Add the new account to the state
      const updatedAccounts = [...accounts, newAccount];
      setAccounts(updatedAccounts);
      setFilteredAccounts(updatedAccounts);
      
      handleCloseDialog();
      alert('Account created successfully!');
    } catch (error) {
      alert(`Failed to create account: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Handle edit account form submission
  const handleUpdateAccount = async () => {
    if (!validateForm(false)) return;
    
    try {
      setIsLoading(true);
      // For demonstration - normally you'd use a specific admin API to update other users
      // Here we're using the me/update API which typically only works for the current user
      const updatedAccount = await updateAccount(formData, token);
      
      // Update the account in the state
      const updatedAccounts = accounts.map(acc => 
        acc.username === currentAccount.username ? {...acc, ...updatedAccount} : acc
      );
      
      setAccounts(updatedAccounts);
      setFilteredAccounts(updatedAccounts);
      
      handleCloseDialog();
      alert('Account updated successfully!');
    } catch (error) {
      alert(`Failed to update account: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Example action handlers
  const handleDelete = (username) => {
    if (window.confirm('Are you sure you want to delete this account?')) {
      // In a real app, you would call an API to delete the account
      const updatedAccounts = accounts.filter(acc => acc.username !== username);
      setAccounts(updatedAccounts);
      setFilteredAccounts(updatedAccounts.filter(acc => 
        acc.username.toLowerCase().includes(searchQuery) ||
        acc.email.toLowerCase().includes(searchQuery) ||
        acc.role.toLowerCase().includes(searchQuery)
      ));
      // Add actual API call to delete here
    }
  };  return (
    <Box className="admin-account-container">
      <Typography variant="h3" gutterBottom className="admin-account-title">
        Account Management
      </Typography>
      <Typography variant="subtitle1" gutterBottom className="admin-subtitle">
        Manage user accounts, roles, and permissions
      </Typography>
      
      {isLoading && (
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress />
        </Box>
      )}
      
      <Box className="admin-account-controls">
        <Button 
          variant="contained" 
          color="primary"
          className="create-account-btn"
          onClick={handleOpenCreateDialog}
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
                </TableCell>                <TableCell align="center" className="table-cell">
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
                    onClick={() => handleOpenEditDialog(acc)}
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
        </Table>      </TableContainer>
      
      {/* Create Account Dialog */}
      <Dialog open={openCreateDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Create New Account</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ mt: 2 }} noValidate>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={formData.username}
              onChange={handleInputChange}
              error={!!formErrors.username}
              helperText={formErrors.username}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleInputChange}
              error={!!formErrors.email}
              helperText={formErrors.email}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
              value={formData.password}
              onChange={handleInputChange}
              error={!!formErrors.password}
              helperText={formErrors.password}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="full_name"
              label="Full Name"
              id="full_name"
              autoComplete="name"
              value={formData.full_name}
              onChange={handleInputChange}
              error={!!formErrors.full_name}
              helperText={formErrors.full_name}
            />
            <TextField
              margin="normal"
              fullWidth
              name="phone_number"
              label="Phone Number"
              id="phone_number"
              autoComplete="tel"
              value={formData.phone_number}
              onChange={handleInputChange}
              error={!!formErrors.phone_number}
              helperText={formErrors.phone_number}
            />
            <TextField
              margin="normal"
              fullWidth
              name="address"
              label="Address"
              id="address"
              value={formData.address}
              onChange={handleInputChange}
              error={!!formErrors.address}
              helperText={formErrors.address}
            />
            <TextField
              margin="normal"
              fullWidth
              name="dob"
              label="Date of Birth"
              type="date"
              id="dob"
              value={formData.dob}
              onChange={handleInputChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <FormControl fullWidth margin="normal">
              <InputLabel id="role-label">Role</InputLabel>
              <Select
                labelId="role-label"
                id="role"
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                label="Role"
              >
                <MenuItem value="Customer">Customer</MenuItem>
                <MenuItem value="Manager">Manager</MenuItem>
                <MenuItem value="Admin">Admin</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel id="sex-label">Gender</InputLabel>
              <Select
                labelId="sex-label"
                id="sex"
                name="sex"
                value={formData.sex}
                onChange={handleInputChange}
                label="Gender"
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button 
            onClick={handleCreateAccount} 
            variant="contained" 
            color="primary"
            disabled={isLoading}
          >
            {isLoading ? 'Creating...' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Edit Account Dialog */}
      <Dialog open={openEditDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Account</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ mt: 2 }} noValidate>
            <TextField
              margin="normal"
              fullWidth
              id="username"
              label="Username"
              name="username"
              value={formData.username}
              disabled
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleInputChange}
              error={!!formErrors.email}
              helperText={formErrors.email}
            />
            <TextField
              margin="normal"
              fullWidth
              name="full_name"
              label="Full Name"
              id="full_name"
              autoComplete="name"
              value={formData.full_name}
              onChange={handleInputChange}
              error={!!formErrors.full_name}
              helperText={formErrors.full_name}
            />
            <TextField
              margin="normal"
              fullWidth
              name="phone_number"
              label="Phone Number"
              id="phone_number"
              autoComplete="tel"
              value={formData.phone_number}
              onChange={handleInputChange}
              error={!!formErrors.phone_number}
              helperText={formErrors.phone_number}
            />
            <TextField
              margin="normal"
              fullWidth
              name="address"
              label="Address"
              id="address"
              value={formData.address}
              onChange={handleInputChange}
              error={!!formErrors.address}
              helperText={formErrors.address}
            />
            <TextField
              margin="normal"
              fullWidth
              name="dob"
              label="Date of Birth"
              type="date"
              id="dob"
              value={formData.dob ? formData.dob.split('T')[0] : ''}
              onChange={handleInputChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <FormControl fullWidth margin="normal">
              <InputLabel id="role-label">Role</InputLabel>
              <Select
                labelId="role-label"
                id="role"
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                label="Role"
              >
                <MenuItem value="Customer">Customer</MenuItem>
                <MenuItem value="Manager">Manager</MenuItem>
                <MenuItem value="Admin">Admin</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel id="sex-label">Gender</InputLabel>
              <Select
                labelId="sex-label"
                id="sex"
                name="sex"
                value={formData.sex || 'male'}
                onChange={handleInputChange}
                label="Gender"
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button 
            onClick={handleUpdateAccount} 
            variant="contained" 
            color="primary"
            disabled={isLoading}
          >
            {isLoading ? 'Updating...' : 'Update'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}