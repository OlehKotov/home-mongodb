import * as invoicesService from '../services/invoices.js';

export const createInvoiceController = async (req, res) => {
  try {
    const invoice = await invoicesService.createInvoiceService(req.body);
    res.status(201).json(invoice);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getInvoicesController = async (req, res) => {
  try {
    const { apartmentId } = req.params;
    const { limit } = req.query;
    const invoices = await invoicesService.getInvoicesByApartment(apartmentId, Number(limit) || 3);
    res.json({ data: invoices });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
