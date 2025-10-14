import { Router } from 'express';
import {
  createInvoiceController,
  getInvoicesController,
} from '../controllers/invoices.js';

const router = Router();

router.post('/', createInvoiceController);
router.get('/:apartmentId', getInvoicesController);

export default router;