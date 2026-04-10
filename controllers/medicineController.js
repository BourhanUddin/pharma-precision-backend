const Medicine = require('../models/medicine');

// @desc    Get all medicines with optional search
// @route   GET /api/medicines
exports.getMedicines = async (req, res) => {
  try {
    const { search } = req.query;
    let query = {};

    if (search) {
      query = {
        $or: [
          { name: { $regex: search, $options: 'i' } },
          { sku: { $regex: search, $options: 'i' } }
        ]
      };
    }

    const medicines = await Medicine.find(query).sort({ name: 1 });
    res.status(200).json(medicines);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching medicines', error: err.message });
  }
};

// @desc    Add a new medicine
// @route   POST /api/medicines
exports.addMedicine = async (req, res) => {
  try {
    const { sku } = req.body;

    // Check if SKU already exists
    const existingMedicine = await Medicine.findOne({ sku });
    if (existingMedicine) {
      return res.status(400).json({ message: 'A medicine with this SKU already exists' });
    }

    const newMedicine = new Medicine(req.body);
    const savedMedicine = await newMedicine.save();
    res.status(201).json(savedMedicine);
  } catch (err) {
    res.status(400).json({ message: 'Failed to add medicine', error: err.message });
  }
};

// @desc    Update medicine details or stock
// @route   PUT /api/medicines/:id
exports.updateMedicine = async (req, res) => {
  try {
    const updatedMedicine = await Medicine.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedMedicine) {
      return res.status(404).json({ message: 'Medicine not found' });
    }

    res.status(200).json(updatedMedicine);
  } catch (err) {
    res.status(400).json({ message: 'Failed to update medicine', error: err.message });
  }
};

// @desc    Delete a medicine
// @route   DELETE /api/medicines/:id
exports.deleteMedicine = async (req, res) => {
  try {
    const medicine = await Medicine.findByIdAndDelete(req.params.id);
    if (!medicine) {
      return res.status(404).json({ message: 'Medicine not found' });
    }
    res.status(200).json({ message: 'Medicine deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting medicine', error: err.message });
  }
};