import { Router } from 'express';
import { protect } from '../middleware/auth.middleware';
import { restrictTo } from '../middleware/restrictTo';
import { getAdminDashboardStats } from '../controllers/admin.controller';

const router = Router();

// All admin routes are protected and restricted to ADMIN role
router.use(protect, restrictTo("ADMIN"));

router.get('/dashboard-stats', getAdminDashboardStats);

export default router;


