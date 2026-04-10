const express = require('express');
const router = express.Router();
const { 
    getMedicines, 
    addMedicine, 
    updateMedicine, 
    deleteMedicine 
} = require('../controllers/medicineController');

// @route   GET /api/medicines
router.get('/', getMedicines);

// @route   POST /api/medicines
router.post('/', addMedicine);

// @route   PUT /api/medicines/:id
router.put('/:id', updateMedicine);

// @route   DELETE /api/medicines/:id
router.delete('/:id', deleteMedicine);
router.post('/', async (req, res) => {
  try {
    const newMedicine = new Medicine(req.body);
    const saved = await newMedicine.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
module.exports = router;