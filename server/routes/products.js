import express from 'express';
import { addProduct, getProducts, updateProduct, deleteProduct } from '../controllers/productController.js';
import auth from '../middleware/auth.js'; 
import upload from '../middleware/upload.js';

const router = express.Router();

router.get('/', getProducts);
router.post('/', upload.single('image'), auth('admin'), addProduct);
router.put("/:id", upload.single('image'), auth('admin'), updateProduct);
router.delete("/:id", auth('admin'), deleteProduct);

router.get("/auth-test", auth("admin"), (req, res) => {
  res.json({ message: "✅ Token is valid", user: req.user });
});

export default router;
 