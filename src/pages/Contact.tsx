import React, { useState } from 'react';
import { Mail, Phone, MapPin, MessageSquare } from 'lucide-react';
import PageHeader from '../components/layout/PageHeader';
import Button from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <PageHeader
        title="Contact Us"
        description="Get in touch with our team for any questions about our investment opportunities."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="block w-full rounded-md border-neutral-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="block w-full rounded-md border-neutral-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="block w-full rounded-md border-neutral-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-neutral-700 mb-1">
                      Subject
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="block w-full rounded-md border-neutral-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                      required
                    >
                      <option value="">Select a subject</option>
                      <option value="investment">Investment Inquiry</option>
                      <option value="partnership">Partnership Opportunity</option>
                      <option value="support">Technical Support</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="block w-full rounded-md border-neutral-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    required
                  ></textarea>
                </div>

                <div>
                  <Button type="submit" className="w-full">
                    Send Message
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <Mail className="h-5 w-5 text-primary-600 mt-1 mr-3" />
                  <div>
                    <p className="font-medium">Email</p>
                    <a href="mailto:contact@example.com" className="text-primary-600 hover:text-primary-700">
                      contact@example.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone className="h-5 w-5 text-primary-600 mt-1 mr-3" />
                  <div>
                    <p className="font-medium">Phone</p>
                    <a href="tel:+1234567890" className="text-primary-600 hover:text-primary-700">
                      +1 (234) 567-890
                    </a>
                  </div>
                </div>
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-primary-600 mt-1 mr-3" />
                  <div>
                    <p className="font-medium">Address</p>
                    <p className="text-neutral-600">
                      123 Investment Plaza<br />
                      New York, NY 10001<br />
                      United States
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Office Hours</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-neutral-600">Monday - Friday</span>
                  <span className="font-medium">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">Saturday</span>
                  <span className="font-medium">10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">Sunday</span>
                  <span className="font-medium">Closed</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-neutral-600 hover:text-primary-600">
                  <span className="sr-only">LinkedIn</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
                <a href="#" className="text-neutral-600 hover:text-primary-600">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
                  </svg>
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Contact;