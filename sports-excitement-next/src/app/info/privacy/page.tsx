import React from 'react';

const privacyContent = [
  {
    title: 'Information We Collect',
    content: `We collect information that you provide directly to us, including when you create an account, make a purchase, or contact us for support. This may include:
    • Name and contact information
    • Payment information
    • Profile information
    • Activity and usage data
    • Device and location information`
  },
  {
    title: 'How We Use Your Information',
    content: `We use the information we collect to:
    • Provide and maintain our services
    • Process your transactions
    • Send you updates and marketing communications
    • Improve our services
    • Ensure platform security
    • Comply with legal obligations`
  },
  {
    title: 'Information Sharing',
    content: `We may share your information with:
    • Service providers and partners
    • Legal authorities when required
    • Other users (only information you choose to make public)
    We never sell your personal information to third parties.`
  },
  {
    title: 'Your Rights and Choices',
    content: `You have the right to:
    • Access your personal information
    • Correct inaccurate data
    • Request deletion of your data
    • Opt-out of marketing communications
    • Control cookie preferences`
  },
  {
    title: 'Data Security',
    content: `We implement appropriate technical and organizational measures to protect your personal information. This includes encryption, secure servers, and regular security assessments.`
  },
  {
    title: 'Children\'s Privacy',
    content: `Our services are not intended for children under 13. We do not knowingly collect information from children under 13. If you believe we have collected information from a child under 13, please contact us.`
  }
];

export default function PrivacyPage() {
  return (
    <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl md:text-6xl font-semibold text-gray-900 text-center mb-6">
        Privacy Policy
      </h1>

      <p className="text-gray-600 mb-16 text-center max-w-2xl mx-auto">
        At Sports Excitement, we take your privacy seriously. This policy describes how we collect, use, and protect your personal information.
      </p>

      <div className="space-y-8">
        {privacyContent.map((section, index) => (
          <div
            key={index}
            className={`p-8 ${
              index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
            } border border-gray-200 rounded-lg`}
          >
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4">
              {section.title}
            </h2>
            <p className="text-gray-600 whitespace-pre-line leading-relaxed">
              {section.content}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-16 text-center">
        <p className="text-sm text-gray-500 italic">
          Last updated: February 2025
        </p>
      </div>
    </div>
  );
}
