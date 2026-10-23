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

  async list({ status, page, limit, offset }) {
    const [items, total] = await Promise.all([
      enquiryRepository.list({ status, limit, offset }),
      enquiryRepository.count({ status }),
    ]);
    return { items, total, page, limit };
  },

  async updateStatus(id, status) {
    const updated = await enquiryRepository.updateStatus(id, status);
    if (!updated) throw new AppError('Enquiry not found', 404, 'NOT_FOUND');
    return { id, status };
  },

  stats: () => enquiryRepository.stats(),
};

module.exports = enquiryService;
