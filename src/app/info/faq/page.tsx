"use client";

import React from 'react';
import { Disclosure } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: 'What is Sports Excitement?',
    answer: 'Sports Excitement is your premier destination for sports merchandise and fan gear. We offer a wide selection of authentic products for sports enthusiasts worldwide.'
  },
  {
    question: 'How do I track my order?',
    answer: 'Once your order is shipped, you will receive a tracking number via email. You can use this number to track your package on our website or through the carrier\'s website.'
  },
  {
    question: 'What is your return policy?',
    answer: 'We offer a 30-day return policy for most items. Products must be in their original condition with tags attached. Please contact our customer service team to initiate a return.'
  },
  {
    question: 'Do you ship internationally?',
    answer: 'Yes, we ship to most countries worldwide. Shipping costs and delivery times vary by location. You can see the exact shipping cost during checkout.'
  },
  {
    question: 'Are your products authentic?',
    answer: 'Yes, all our products are 100% authentic and sourced directly from official manufacturers or authorized distributors. We guarantee the authenticity of every item we sell.'
  }
];

const FAQPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Frequently Asked Questions
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
            Find answers to common questions about Sports Excitement
          </p>
        </div>

        <div className="mt-12 max-w-3xl mx-auto">
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <Disclosure key={index}>
                {({ open }: { open: boolean }) => (
                  <div className="bg-white rounded-lg shadow-sm">
                    <Disclosure.Button className="w-full px-4 py-6 text-left flex justify-between items-center focus:outline-none">
                      <span className="text-lg font-medium text-gray-900">
                        {faq.question}
                      </span>
                      <ChevronDownIcon
                        className={`${
                          open ? 'transform rotate-180' : ''
                        } w-5 h-5 text-gray-500`}
                      />
                    </Disclosure.Button>
                    <Disclosure.Panel className="px-4 pb-6">
                      <p className="text-gray-600">{faq.answer}</p>
                    </Disclosure.Panel>
                  </div>
                )}
              </Disclosure>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Still have questions?
          </h2>
          <p className="text-gray-600 mb-8">
            Our customer service team is here to help you
          </p>
          <button className="bg-orange-600 text-white px-8 py-3 rounded-full font-medium hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
