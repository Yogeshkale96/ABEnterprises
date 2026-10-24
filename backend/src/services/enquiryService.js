const AppError = require('../utils/AppError');
const logger = require('../utils/logger');
const enquiryRepository = require('../repositories/enquiryRepository');
const { SERVICE_LABELS } = require('../validators/enquiryValidator');

const enquiryService = {
  async submit(data, ipAddress) {
    const storedSubject = data.service
      ? `Quote request: ${SERVICE_LABELS[data.service]}`
      : data.subject;
    const id = await enquiryRepository.create({ ...data, subject: storedSubject, ipAddress });
    if (data.items?.length) await enquiryRepository.addItems(id, data.items);
    logger.info('New enquiry received', { id, type: data.type });
    return { id };
  },

  async list(filters) {
    const { page, limit } = filters;
    const [items, total] = await Promise.all([
      enquiryRepository.list(filters),
      enquiryRepository.count(filters),
    ]);
    return { items, total, page, limit };
  },

  /** Full detail for the admin panel: enquiry + quote items + admin notes. */
  async detail(id) {
    const enquiry = await enquiryRepository.findById(id);
    if (!enquiry) throw new AppError('Enquiry not found', 404, 'NOT_FOUND');
    const [items, notes] = await Promise.all([
      enquiryRepository.findItems(id),
      enquiryRepository.listNotes(id),
    ]);
    return { ...enquiry, items, notes };
  },

  async addNote(id, note, author) {
    const exists = await enquiryRepository.findById(id);
    if (!exists) throw new AppError('Enquiry not found', 404, 'NOT_FOUND');
    const noteId = await enquiryRepository.addNote(id, note, author);
    return { id: noteId, enquiry_id: Number(id), note, author: author || null };
  },

  async updateStatus(id, status) {
    const updated = await enquiryRepository.updateStatus(id, status);
    if (!updated) throw new AppError('Enquiry not found', 404, 'NOT_FOUND');
    return { id, status };
  },

  stats: () => enquiryRepository.stats(),
};

module.exports = enquiryService;
