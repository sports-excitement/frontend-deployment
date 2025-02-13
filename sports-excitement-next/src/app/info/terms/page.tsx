import React from 'react';

const termsContent = [
  {
    title: 'Acceptance of Terms',
    content: `By accessing or using Sports Excitement's services, you agree to be bound by these Terms and Conditions. If you disagree with any part of these terms, you may not access our services.`
  },
  {
    title: 'User Accounts',
    content: `• You must be 13 years or older to create an account
    • You are responsible for maintaining account security
    • You must provide accurate and complete information
    • You may not share your account credentials
    • We reserve the right to terminate accounts that violate our terms`
  },
  {
    title: 'Service Usage',
    content: `• Services are provided "as is" without warranties
    • We may modify or discontinue services at any time
    • You agree to use services only for lawful purposes
    • You may not interfere with service operation
    • We reserve the right to refuse service to anyone`
  },
  {
    title: 'User Content',
    content: `• You retain rights to content you post
    • You grant us license to use your content
    • You are responsible for your content
    • We may remove content that violates terms
    • We do not endorse user content`
  },
  {
    title: 'Payments and Refunds',
    content: `• All payments are processed securely
    • Prices are subject to change
    • Refunds are handled case by case
    • Some services may require subscription
    • Cancellation terms vary by service`
  },
  {
    title: 'Limitation of Liability',
    content: `• We are not liable for indirect damages
    • Our liability is limited to service fees paid
    • We do not guarantee service availability
    • User assumes risks of service use
    • Force majeure applies`
  },
  {
    title: 'Dispute Resolution',
    content: `• Disputes will be resolved through arbitration
    • California law governs these terms
    • You waive right to class action
    • Small claims court is an option
    • 30-day notice required for claims`
  }
];

export default function TermsPage() {
  return (
    <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-semibold text-gray-900 text-center mb-4">
          Terms and Conditions
        </h1>
        
        <p className="text-gray-600 text-center mb-16">
          Please read these terms and conditions carefully before using Sports Excitement's services.
        </p>

        <div className="space-y-12">
          {termsContent.map((section, index) => (
            <div key={index} className="prose max-w-none">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {section.title}
              </h2>
              <p className="text-gray-600 whitespace-pre-line">
                {section.content}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 p-8 bg-gray-50 border border-gray-200 rounded-lg">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Last Updated
          </h2>
          <p className="text-gray-600">
            February 2025
          </p>
        </div>
      </div>
    </div>
  );
}
