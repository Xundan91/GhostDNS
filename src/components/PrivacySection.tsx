import React from 'react';

const PrivacySection: React.FC = () => (
  <section id="privacy" className="py-20 px-4 bg-gradient-to-b from-white via-accent-light/5 to-white dark:from-black dark:via-accent-dark/5 dark:to-black border-t border-accent-light/10 dark:border-accent-dark/10">
    <div className="container mx-auto max-w-4xl">
      <div className="mb-10 text-center">
        <img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" alt="Logo" className="mx-auto mb-4" style={{ width: 120 }} />
        <h2 className="text-3xl md:text-4xl font-bold mb-2 text-accent-light dark:text-accent-dark">Privacy Policy</h2>
        <p className="text-accent-light/70 dark:text-accent-dark/70 text-lg">Your privacy and security are our top priorities.</p>
      </div>
      <div className="prose prose-accent dark:prose-invert max-w-none text-base opacity-90">
        {/* --- BEGIN PRIVACY POLICY CONTENT --- */}
        <h3>1. Information Collection and Use</h3>
        <h4>API Credentials We Collect</h4>
        <ul>
          <li>Hostinger API keys and authentication tokens</li>
          <li>GoDaddy API keys and secret keys</li>
          <li>Vercel deployment tokens and authentication credentials</li>
          <li>Account information necessary for API integration setup</li>
        </ul>
        <h4>How We Collect</h4>
        <ul>
          <li>Direct input through secure forms on our platform</li>
          <li>Encrypted transmission during API setup processes</li>
          <li>Automated collection during service integration workflows</li>
        </ul>
        <h4>Purpose of Collection</h4>
        <ul>
          <li>To enable DNS record management through Hostinger's API</li>
          <li>To facilitate domain configuration via GoDaddy's DNS services</li>
          <li>To support deployment management through Vercel's platform</li>
          <li>To provide automated API integration services as requested by users</li>
        </ul>
        <h3>2. Data Security and Encryption</h3>
        <h4>API Key Protection Measures</h4>
        <ul>
          <li><b>Encryption Standards:</b> We implement <b>AES-256 encryption</b> for all API keys and sensitive credentials both at rest and in transit. All data transmission occurs over <b>HTTPS with TLS 1.2 or higher</b>.</li>
          <li><b>Access Controls:</b> API keys are accessible only to authorized personnel with legitimate business needs. Multi-factor authentication and role-based access controls are enforced.</li>
          <li><b>Storage Security:</b> All API keys are stored in encrypted databases with industry-standard security measures. Secure key management systems are used, and regular security audits are performed.</li>
        </ul>
        <h3>3. Third-Party Service Integration</h3>
        <ul>
          <li><b>Hostinger Integration:</b> Credentials are used only to manage DNS records as needed.</li>
          <li><b>GoDaddy Integration:</b> API keys are used strictly for domain management tasks and kept confidential.</li>
          <li><b>Vercel Integration:</b> Tokens are used for deployment management, following Vercel's API terms.</li>
        </ul>
        <h3>4. Data Retention and Deletion</h3>
        <ul>
          <li>API keys are retained only as long as necessary to provide services.</li>
          <li>Users can request deletion of their credentials at any time.</li>
          <li>Secure deletion and audit logs are maintained for compliance.</li>
        </ul>
        <h3>5. User Rights and Control</h3>
        <ul>
          <li>View, update, or delete your API credentials at any time.</li>
          <li>Withdraw consent for processing and request account deletion.</li>
        </ul>
        <h3>6. Legal Compliance</h3>
        <ul>
          <li>GDPR and CCPA rights are respected, including access, erasure, and portability.</li>
          <li>Contact our Data Protection Officer at <a href="mailto:your-dpo@email.com">your-dpo@email.com</a>.</li>
        </ul>
        <h3>7. Security Incident Response</h3>
        <ul>
          <li>Real-time monitoring and rapid breach notification procedures are in place.</li>
        </ul>
        <h3>8. Cookies and Tracking</h3>
        <ul>
          <li>Only essential cookies for authentication and analytics are used.</li>
        </ul>
        <h3>9. International Data Transfers</h3>
        <ul>
          <li>Data is stored in secure, compliant data centers. SCCs and safeguards are applied for cross-border transfers.</li>
        </ul>
        <h3>10. Changes to Privacy Policy</h3>
        <ul>
          <li>Material changes are notified by email and on our website.</li>
        </ul>
        <h3>11. Contact Information</h3>
        <ul>
          <li>Email: <a href="mailto:your-privacy@email.com">your-privacy@email.com</a></li>
          <li>Address: [Your Business Address]</li>
        </ul>
        <h3>12. Developer-Specific Provisions</h3>
        <ul>
          <li>We recommend regular API key rotation and use of environment variables for key storage.</li>
        </ul>
        <div className="text-center mt-10 opacity-60 text-xs">
          <span>Last updated: July 2025</span>
        </div>
      </div>
    </div>
  </section>
);

export default PrivacySection; 