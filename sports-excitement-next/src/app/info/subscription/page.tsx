import React from 'react';
import { ArrowPathIcon, CreditCardIcon, XCircleIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';

const policies = [
  {
    title: 'Billing Cycles',
    icon: <ArrowPathIcon className="w-10 h-10 text-orange-500" />,
    content: `• Subscriptions are billed on a recurring basis
    • Monthly plans are billed every 30 days
    • Annual plans are billed once per year
    • Billing date aligns with initial subscription date
    • Pro-rated charges may apply for plan changes`
  },
  {
    title: 'Payment Methods',
    icon: <CreditCardIcon className="w-10 h-10 text-orange-500" />,
    content: `• We accept all major credit cards
    • PayPal payments are supported
    • Bank transfers for annual plans
    • Automatic renewal using saved payment method
    • Secure payment processing`
  },
  {
    title: 'Cancellation Policy',
    icon: <XCircleIcon className="w-10 h-10 text-orange-500" />,
    content: `• Cancel anytime through your account
    • No cancellation fees
    • Access continues until billing period ends
    • No partial refunds for unused time
    • Option to pause subscription available`
  },
  {
    title: 'Data Protection',
    icon: <ShieldCheckIcon className="w-10 h-10 text-orange-500" />,
    content: `• Payment information is encrypted
    • No storage of complete card details
    • Compliance with data protection laws
    • Regular security audits
    • Transparent data handling`
  }
];

const additionalInfo = [
  {
    title: 'Plan Changes',
    content: `When upgrading or downgrading your subscription:
    • Upgrades take effect immediately
    • Downgrades apply at next billing cycle
    • Credit applied for unused premium time
    • No fees for plan changes
    • Previous plan features remain until cycle end`
  },
  {
    title: 'Refund Policy',
    content: `Our refund policy ensures fair treatment:
    • 14-day money-back guarantee
    • Full refund for service issues
    • Partial refunds case-by-case
    • Processing time: 5-10 business days
    • Original payment method credited`
  },
  {
    title: 'Account Status',
    content: `Your account status affects access:
    • Active: Full feature access
    • Past Due: 7-day grace period
    • Suspended: Limited access
    • Cancelled: Access until period end
    • Terminated: Immediate access loss`
  }
];

export default function SubscriptionPage() {
  return (
    <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl md:text-6xl font-semibold text-gray-900 text-center mb-4">
        Subscription Policy
      </h1>

      <p className="text-gray-600 mb-16 text-center max-w-2xl mx-auto">
        Understanding your subscription with Sports Excitement: terms, conditions, and everything you need to know about managing your account.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {policies.map((policy, index) => (
          <div
            key={index}
            className="p-8 bg-gray-50 border border-gray-200 rounded-lg"
          >
            <div className="flex items-center mb-6">
              {policy.icon}
              <h2 className="text-2xl font-semibold text-gray-900 ml-3">
                {policy.title}
              </h2>
            </div>
            <p className="text-gray-600 whitespace-pre-line leading-relaxed">
              {policy.content}
            </p>
          </div>
        ))}
      </div>

      <div className="space-y-8">
        {additionalInfo.map((info, index) => (
          <div
            key={index}
            className={`p-8 ${
              index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
            } border border-gray-200 rounded-lg`}
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {info.title}
            </h2>
            <p className="text-gray-600 whitespace-pre-line leading-relaxed">
              {info.content}
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
