// import React from 'react';
// import Navbar from '@/components/Navbar';
// import Footer from '@/components/Footer';

// const sections = [
//   {
//     title: '1. Information Collection and Use',
//     blocks: [
//       {
//         subtitle: 'API Credentials We Collect',
//         content: [
//           'Hostinger API keys and authentication tokens',
//           'GoDaddy API keys and secret keys',
//           'Vercel deployment tokens and authentication credentials',
//           'Account information necessary for API integration setup',
//         ],
//       },
//       {
//         subtitle: 'How We Collect',
//         content: [
//           'Direct input through secure forms on our platform',
//           'Encrypted transmission during API setup processes',
//           'Automated collection during service integration workflows',
//         ],
//       },
//       {
//         subtitle: 'Purpose of Collection',
//         content: [
//           'To enable DNS record management through Hostinger\'s API',
//           'To facilitate domain configuration via GoDaddy\'s DNS services',
//           'To support deployment management through Vercel\'s platform',
//           'To provide automated API integration services as requested by users',
//         ],
//       },
//     ],
//   },
//   {
//     title: '2. Data Security and Encryption',
//     blocks: [
//       {
//         subtitle: 'API Key Protection Measures',
//         content: [
//           'Encryption Standards: We implement AES-256 encryption for all API keys and sensitive credentials both at rest and in transit. All data transmission occurs over HTTPS with TLS 1.2 or higher.',
//           'Access Controls: API keys are accessible only to authorized personnel with legitimate business needs. Multi-factor authentication and role-based access controls are enforced.',
//           'Storage Security: All API keys are stored in encrypted databases with industry-standard security measures. Secure key management systems are used, and regular security audits are performed.',
//         ],
//       },
//     ],
//   },
//   {
//     title: '3. Third-Party Service Integration',
//     blocks: [
//       {
//         subtitle: '',
//         content: [
//           'Hostinger Integration: Credentials are used only to manage DNS records as needed.',
//           'GoDaddy Integration: API keys are used strictly for domain management tasks and kept confidential.',
//           'Vercel Integration: Tokens are used for deployment management, following Vercel\'s API terms.',
//         ],
//       },
//     ],
//   },
//   {
//     title: '4. Data Retention and Deletion',
//     blocks: [
//       {
//         subtitle: '',
//         content: [
//           'API keys are retained only as long as necessary to provide services.',
//           'Users can request deletion of their credentials at any time.',
//           'Secure deletion and audit logs are maintained for compliance.',
//         ],
//       },
//     ],
//   },
//   {
//     title: '5. User Rights and Control',
//     blocks: [
//       {
//         subtitle: '',
//         content: [
//           'View, update, or delete your API credentials at any time.',
//           'Withdraw consent for processing and request account deletion.',
//         ],
//       },
//     ],
//   },
//   {
//     title: '6. Legal Compliance',
//     blocks: [
//       {
//         subtitle: '',
//         content: [
//           'GDPR and CCPA rights are respected, including access, erasure, and portability.',
//         ],
//       },
//     ],
//   },
//   {
//     title: '7. Security Incident Response',
//     blocks: [
//       {
//         subtitle: '',
//         content: [
//           'Real-time monitoring and rapid breach notification procedures are in place.',
//         ],
//       },
//     ],
//   },
//   {
//     title: '8. Cookies and Tracking',
//     blocks: [
//       {
//         subtitle: '',
//         content: [
//           'Only essential cookies for authentication and analytics are used.',
//         ],
//       },
//     ],
//   },
//   {
//     title: '9. International Data Transfers',
//     blocks: [
//       {
//         subtitle: '',
//         content: [
//           'Data is stored in secure, compliant data centers. SCCs and safeguards are applied for cross-border transfers.',
//         ],
//       },
//     ],
//   },
//   {
//     title: '10. Changes to Privacy Policy',
//     blocks: [
//       {
//         subtitle: '',
//         content: [
//           'Material changes are notified by email and on our website.',
//         ],
//       },
//     ],
//   },
//   {
//     title: '11. Contact Information',
//     blocks: [
//       {
//         subtitle: '',
//         content: [
//           'Email: ',
//         ],
//         extra: <span className="font-mono text-blue-600 dark:text-blue-400">kundansingh023230@email.com</span>,
//       },
//     ],
//   },
//   {
//     title: '12. Developer-Specific Provisions',
//     blocks: [
//       {
//         subtitle: '',
//         content: [
//           'We recommend regular API key rotation and use of environment variables for key storage.',
//         ],
//       },
//     ],
//   },
// ];

// export default function PrivacyPage() {
//   return (
//     <div className="min-h-screen flex flex-col bg-gradient-to-br from-accent-light/5 via-white to-accent-light/10 dark:from-accent-dark/10 dark:via-black dark:to-accent-dark/5">
//       <Navbar />
//       <main className="flex-1 flex flex-col items-center justify-center py-16 px-4">
//         <div className="w-full max-w-3xl mx-auto">
//           <div className="mb-12 text-center">
//             <h1 className="text-4xl md:text-5xl font-extrabold mb-3 text-accent-light dark:text-accent-dark tracking-tight">Privacy Policy</h1>
//             <p className="text-accent-light/70 dark:text-accent-dark/70 text-lg max-w-2xl mx-auto">Your privacy and security are our top priorities. This policy explains how we handle your data and credentials with care and transparency.</p>
//           </div>
//           <div className="space-y-12">
//             {sections.map((section, idx) => (
//               <section key={section.title} className="">
//                 <div className="flex items-center mb-6">
//                   <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent-light/10 dark:bg-accent-dark/10 flex items-center justify-center text-xl font-bold text-accent-light dark:text-accent-dark border border-accent-light/20 dark:border-accent-dark/20 mr-4">
//                     {idx + 1}
//                   </div>
//                   <h2 className="text-2xl md:text-3xl font-bold text-accent-light dark:text-accent-dark tracking-tight">{section.title.replace(/^[0-9]+\. /, '')}</h2>
//                 </div>
//                 <div className="space-y-8">
//                   {section.blocks.map((block, bidx) => (
//                     <div key={bidx} className="bg-white dark:bg-zinc-900 rounded-xl shadow border border-accent-light/10 dark:border-accent-dark/10 p-6 md:p-8">
//                       {block.subtitle && <h3 className="text-lg font-semibold mb-2 text-accent-light dark:text-accent-dark">{block.subtitle}</h3>}
//                       <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
//                         {block.content.map((item, i) => (
//                           <li key={i} className="leading-relaxed">{item}</li>
//                         ))}
//                         {block.extra && <li>{block.extra}</li>}
//                       </ul>
//                     </div>
//                   ))}
//                 </div>
//               </section>
//             ))}
//           </div>
//           <div className="text-center mt-16 text-sm text-gray-400">
//             Last updated: July 2025
//           </div>
//         </div>
//       </main>
//       <Footer />
//     </div>
//   );ss
// } 