import knex from 'knex';

const db = knex({
  client: 'sqlite3', // or 'better-sqlite3'
  connection: {
    filename: './dev.sqlite3',
  },
  useNullAsDefault: true,
});

class DB {
  static async addLead(data) {
    return db('leads').insert(data);
  }

  // Get all emails with pagination support
  static async getEmails(limit = 50, offset = 0) {
    return db('emails')
      .select('*')
      .orderBy('created_at', 'desc')
      .limit(limit)
      .offset(offset);
  }

  // Get a single email by ID
  static async getEmailById(id) {
    return db('emails')
      .select('*')
      .where('id', id)
      .first();
  }

  // Create a new email
  static async createEmail(emailData) {
    return db('emails').insert(emailData);
  }

  // Search emails by text in to, cc, bcc, subject, or body fields
  static async searchEmails(searchText, limit = 50, offset = 0) {
    const searchPattern = `%${searchText}%`;
    return db('emails')
      .select('*')
      .where(function() {
        this.where('to', 'like', searchPattern)
          .orWhere('cc', 'like', searchPattern)
          .orWhere('bcc', 'like', searchPattern)
          .orWhere('subject', 'like', searchPattern)
          .orWhere('body', 'like', searchPattern);
      })
      .orderBy('created_at', 'desc')
      .limit(limit)
      .offset(offset);
  }
}

export default DB;
