const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Serve static files (like HTML, CSS, and JS)
app.use(express.static(path.join(__dirname, 'public')));

// Connect to MongoDB
const mongoURI = 'mongodb://wonbotFms:wonbotFms@localhost:27015';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('Failed to connect to MongoDB:', err));

// Define Employee schema with In and Out time
const employeeSchema = new mongoose.Schema({
  name: String,
  position: String,
  overtime: Number,
  inTime: Date,
  outTime: Date
});

const Employee = mongoose.model('Employee', employeeSchema);

// Endpoint to add an employee record
app.post('/employee', async (req, res) => {
  const { name, position, overtime, inTime, outTime } = req.body;

  const newEmployee = new Employee({
    name,
    position,
    overtime,
    inTime: new Date(inTime),  // Store inTime as Date
    outTime: new Date(outTime)  // Store outTime as Date
  });

  try {
    await newEmployee.save();
    res.status(201).json({ message: 'Employee added successfully', data: newEmployee });
  } catch (error) {
    res.status(400).json({ message: 'Error adding employee', error: error.message });
  }
});

// Endpoint to fetch all employee records
app.get('/employees', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json({ message: 'Employees fetched successfully', data: employees });
  } catch (error) {
    res.status(400).json({ message: 'Error fetching employees', error: error.message });
  }
});

// Endpoint to delete an employee record by ID
app.delete('/employee/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const employee = await Employee.findByIdAndDelete(id);
      
      if (!employee) {
        return res.status(404).json({ message: 'Employee not found' });
      }
  
      res.status(200).json({ message: 'Employee record deleted successfully' });
    } catch (error) {
      res.status(400).json({ message: 'Error deleting employee', error: error.message });
    }
  });
  

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
