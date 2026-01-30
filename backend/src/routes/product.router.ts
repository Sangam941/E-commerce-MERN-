import { Router } from 'express';
import { createProduct } from '../controllers/product.controller';
import upload from '../middleware/multer';
import { protect } from '../middleware/auth.middleware';

const router = Router();

router.use(protect)

router.post('/add-product', upload, createProduct);

export default router;

