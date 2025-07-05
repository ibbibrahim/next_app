import DB from '../db/index.js';

export default async function routes(fastify, options) {
  fastify.get('/ping', async (request, reply) => {
    return 'pong\n';
  });

  // Get all emails with optional pagination
  fastify.get('/api/emails', async (request, reply) => {
    try {
      const { limit = 50, offset = 0 } = request.query;
      const emails = await DB.getEmails(parseInt(limit), parseInt(offset));
      return { success: true, data: emails };
    } catch (error) {
      fastify.log.error(error);
      return reply.status(500).send({ success: false, error: 'Failed to fetch emails' });
    }
  });

  // Get a single email by ID
  fastify.get('/api/emails/:id', async (request, reply) => {
    try {
      const { id } = request.params;
      const email = await DB.getEmailById(id);
      
      if (!email) {
        return reply.status(404).send({ success: false, error: 'Email not found' });
      }
      
      return { success: true, data: email };
    } catch (error) {
      fastify.log.error(error);
      return reply.status(500).send({ success: false, error: 'Failed to fetch email' });
    }
  });

  // Create a new email
  fastify.post('/api/emails', async (request, reply) => {
    try {
      const { to, cc, bcc, subject, body } = request.body;
      
      // Validate required fields
      if (!to || !subject || !body) {
        return reply.status(400).send({ 
          success: false, 
          error: 'To, subject, and body are required fields' 
        });
      }

      const emailData = {
        to,
        cc: cc || null,
        bcc: bcc || null,
        subject,
        body,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      const result = await DB.createEmail(emailData);
      return { success: true, data: { id: result[0], ...emailData } };
    } catch (error) {
      fastify.log.error(error);
      return reply.status(500).send({ success: false, error: 'Failed to create email' });
    }
  });

  // Search emails
  fastify.get('/api/emails/search/:query', async (request, reply) => {
    try {
      const { query } = request.params;
      const { limit = 50, offset = 0 } = request.query;
      
      if (!query || query.trim() === '') {
        return reply.status(400).send({ success: false, error: 'Search query is required' });
      }

      const emails = await DB.searchEmails(query.trim(), parseInt(limit), parseInt(offset));
      return { success: true, data: emails };
    } catch (error) {
      fastify.log.error(error);
      return reply.status(500).send({ success: false, error: 'Failed to search emails' });
    }
  });
}
