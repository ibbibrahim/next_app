import DB from './src/db/index.js';

const sampleEmails = [
  {
    to: 'john.doe@example.com',
    cc: 'team@example.com',
    bcc: null,
    subject: 'Project Update - Q1 Results',
    body: 'Hi John,\n\nI wanted to share the Q1 project results with you. We have successfully completed all major milestones and are on track for the Q2 deliverables.\n\nKey highlights:\n- Feature A: 100% complete\n- Feature B: 85% complete\n- Performance improvements: 40% faster\n\nPlease review the attached report and let me know if you have any questions.\n\nBest regards,\nSarah',
    created_at: new Date('2024-01-15T10:30:00Z').toISOString(),
    updated_at: new Date('2024-01-15T10:30:00Z').toISOString()
  },
  {
    to: 'alice.smith@company.com',
    cc: null,
    bcc: 'hr@company.com',
    subject: 'Meeting Request - Budget Discussion',
    body: 'Hello Alice,\n\nI hope this email finds you well. I would like to schedule a meeting to discuss the upcoming budget allocation for our department.\n\nProposed agenda:\n1. Current budget status\n2. Q2 requirements\n3. Resource allocation\n4. Timeline planning\n\nPlease let me know your availability for next week.\n\nThanks,\nMike',
    created_at: new Date('2024-01-14T14:20:00Z').toISOString(),
    updated_at: new Date('2024-01-14T14:20:00Z').toISOString()
  },
  {
    to: 'support@techcorp.com',
    cc: 'manager@techcorp.com',
    bcc: null,
    subject: 'Technical Issue - Login System',
    body: 'Dear Support Team,\n\nWe are experiencing issues with our login system. Users are unable to authenticate properly, and we are getting timeout errors.\n\nError details:\n- Error code: AUTH_001\n- Affected users: All\n- Time of occurrence: 2:00 PM EST\n\nThis is affecting our production environment. Please provide an urgent resolution.\n\nRegards,\nDavid Chen\nSystem Administrator',
    created_at: new Date('2024-01-13T16:45:00Z').toISOString(),
    updated_at: new Date('2024-01-13T16:45:00Z').toISOString()
  },
  {
    to: 'marketing@startup.io',
    cc: 'design@startup.io',
    bcc: 'ceo@startup.io',
    subject: 'New Product Launch Campaign',
    body: 'Hi Marketing Team,\n\nI\'m excited to announce our new product launch campaign! We\'ve been working hard on this and it\'s finally ready to go live.\n\nCampaign details:\n- Launch date: February 1st, 2024\n- Target audience: Tech professionals\n- Channels: Social media, email, and influencer partnerships\n- Budget: $50,000\n\nPlease review the campaign materials and provide feedback by Friday.\n\nLet\'s make this launch a success!\n\nBest,\nJennifer',
    created_at: new Date('2024-01-12T09:15:00Z').toISOString(),
    updated_at: new Date('2024-01-12T09:15:00Z').toISOString()
  },
  {
    to: 'client@bigcorp.com',
    cc: 'sales@ourcompany.com',
    bcc: null,
    subject: 'Proposal for Enterprise Solution',
    body: 'Dear Client,\n\nThank you for your interest in our enterprise solution. I\'ve prepared a comprehensive proposal based on our discussion last week.\n\nProposal highlights:\n- Custom integration with your existing systems\n- 24/7 support and maintenance\n- Scalable architecture for future growth\n- Competitive pricing with volume discounts\n\nI\'ve attached the detailed proposal document. Please review it and let me know if you have any questions or need any modifications.\n\nI\'m available for a follow-up call next week to discuss the proposal in detail.\n\nBest regards,\nRobert Johnson\nSenior Account Manager',
    created_at: new Date('2024-01-11T11:30:00Z').toISOString(),
    updated_at: new Date('2024-01-11T11:30:00Z').toISOString()
  },
  {
    to: 'team@project.com',
    cc: null,
    bcc: null,
    subject: 'Weekly Standup - Tomorrow at 10 AM',
    body: 'Hi Team,\n\nJust a reminder that we have our weekly standup meeting tomorrow at 10 AM.\n\nAgenda:\n1. Project status updates\n2. Blockers and challenges\n3. Next week\'s priorities\n4. Open discussion\n\nPlease come prepared with your updates. The meeting will be held in the main conference room.\n\nSee you there!\n\nRegards,\nLisa',
    created_at: new Date('2024-01-10T17:00:00Z').toISOString(),
    updated_at: new Date('2024-01-10T17:00:00Z').toISOString()
  },
  {
    to: 'vendor@supplier.com',
    cc: 'procurement@company.com',
    bcc: null,
    subject: 'Order Confirmation - IT Equipment',
    body: 'Dear Vendor,\n\nThis email confirms our order for IT equipment as discussed in our meeting yesterday.\n\nOrder details:\n- 50 laptops (Dell Latitude 5520)\n- 25 monitors (24" Dell P2419H)\n- 50 docking stations\n- Delivery date: January 25th, 2024\n\nPlease confirm receipt of this order and provide the tracking information once shipped.\n\nPayment terms: Net 30 days\n\nThank you for your business.\n\nBest regards,\nTom Wilson\nIT Manager',
    created_at: new Date('2024-01-09T13:45:00Z').toISOString(),
    updated_at: new Date('2024-01-09T13:45:00Z').toISOString()
  },
  {
    to: 'newsletter@techblog.com',
    cc: null,
    bcc: null,
    subject: 'This Week in Tech - Latest Updates',
    body: 'Hello Tech Enthusiasts,\n\nHere\'s your weekly roundup of the latest tech news and updates:\n\nTop Stories:\n1. New AI breakthrough in natural language processing\n2. Major security vulnerability discovered in popular framework\n3. Tech giant announces revolutionary new product\n4. Startup funding round reaches $100M\n\nRead the full articles on our website and stay tuned for more updates next week!\n\nBest regards,\nThe Tech Blog Team',
    created_at: new Date('2024-01-08T08:00:00Z').toISOString(),
    updated_at: new Date('2024-01-08T08:00:00Z').toISOString()
  }
];

async function seedDatabase() {
  try {
    console.log('Starting database seeding...');
    
    // Insert sample emails
    for (const email of sampleEmails) {
      await DB.createEmail(email);
      console.log(`Created email: ${email.subject}`);
    }
    
    console.log('Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase(); 