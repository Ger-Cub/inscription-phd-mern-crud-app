// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

// Connectons la base de données à notre backend n'oubliez pas de 
//remplacer l'uri 'mongodb://localhost:27017/mern-basic-crud' par l'uri de votre base de donnée mongodb
mongoose.connect('mongodb://localhost:27017/mern-basic-crud', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});




// Routes pour les étudiants
app.get('/api/Students', (req, res) => {
  Student.find().then(item => {
    console.log(item);
    res.status(200).json({ message: 'Item fetched successfully', data: item, });
  })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'Server error' });
    });
});

app.get('/api/Students/:id', (req, res) => {
  const { id } = req.params;
  Student.find({_id:id}).then(item => {
    console.log(item);
    res.status(200).json({ message: 'Item fetched successfully', data: item, });
  })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'Server error' });
    });
});

app.post('/api/Students', (req, res) => {
  const newStudent = new Student(req.body);
  console.log(newStudent);
  newStudent.save().then(item => {
    console.log(item);
    res.status(201).json({ message: 'Item added successfully' });
  })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'Server error' });
    });
});

app.put('/api/Students/:id', (req, res) => {
  const { id } = req.params;
  Student.findByIdAndUpdate(id, req.body, { new: true }).then(item => {
    console.log(item);
    res.status(203).json({ message: 'Item Fetched Successfully', data:item });
  })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'Server error' });
    });
});

app.delete('/api/Students/:id', (req, res) => {
  const { id } = req.params;
  Student.findByIdAndRemove(id).then(item => {
    console.log(item);
    res.status(203).json({ message: 'Item Fetched Successfully', data:item });
  })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'Server error' });
    });
});

// Routes for Projects
app.get('/api/Projects', (req, res) => {
  Project.find().then(item => {
    console.log(item);
    res.status(201).json({ message: 'Projects Fetched Successfully!', data: item });
  })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'Server error' });
    });
});

app.get('/api/Projects/:id', (req, res) => {
  const { id } = req.params;
  Project.find({_id:id}).then(item => {
    console.log(item);
    res.status(200).json({ message: 'Item fetched successfully', data: item, });
  })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'Server error' });
    });
});

app.post('/api/Projects', (req, res) => {
  const newProject = new Project(req.body);
  newProject.save().then(item => {
    console.log(item);
    res.status(201).json({ message: 'Item added successfully' });
  })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'Server error' });
    });
});

app.put('/api/Projects/:id', (req, res) => {
  const { id } = req.params;
  Project.findByIdAndUpdate(id, req.body, { new: true }).then(item => {
    console.log(item);
    res.status(203).json({ message: 'Item Fetched Successfully', data:item });
  })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'Server error' });
    });
});

app.delete('/api/Projects/:id', (req, res) => {
  const { id } = req.params;
  Project.findByIdAndRemove(id).then(item => {
    res.status(203).json({ message: 'Deleted Successfully' });
  })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'Server error' });
    });
});



const Schema = mongoose.Schema;
const StudentSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, { timestamps: true });

const ProjectSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
}, { timestamps: true });

const Student = mongoose.model('Student', StudentSchema);
const Project = mongoose.model('Project', ProjectSchema);

// Add routes for CRUD operations for Students and Projects here

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});