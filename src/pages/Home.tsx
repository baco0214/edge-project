import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, TrendingUp, Shield, Users } from 'lucide-react';
import Button from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';

const Home: React.FC = () => {
  return (
    <div>
      {/* Hero Section */}
      <div className="relative bg-primary-900 text-white">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/7567443/pexels-photo-7567443.jpeg"
            alt="Investment Background"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Secure Your Future with Smart Investments
          </h1>
          <p className="text-xl md:text-2xl text-primary-100 mb-8 max-w-3xl">
            Join our platform to access exclusive investment opportunities and track your portfolio performance in real-time.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/projects">
              <Button size="lg">
                View Investment Opportunities
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" size="lg">
                Contact an Advisor
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">
              Why Choose Our Platform
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              We provide comprehensive tools and insights to help you make informed investment decisions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card>
              <CardContent className="p-6 text-center">
                <Building2 className="h-12 w-12 text-primary-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Premium Properties</h3>
                <p className="text-neutral-600">
                  Access exclusive real estate investment opportunities in prime locations.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <TrendingUp className="h-12 w-12 text-primary-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Strong Returns</h3>
                <p className="text-neutral-600">
                  Track record of delivering consistent returns to our investors.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Shield className="h-12 w-12 text-primary-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Secure Platform</h3>
                <p className="text-neutral-600">
                  Advanced security measures to protect your investments and data.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Users className="h-12 w-12 text-primary-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Expert Support</h3>
                <p className="text-neutral-600">
                  Dedicated team of investment advisors to guide you.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-primary-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">$500M+</div>
              <div className="text-primary-200">Assets Under Management</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">1,000+</div>
              <div className="text-primary-200">Active Investors</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-primary-200">Investment Projects</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">15%</div>
              <div className="text-primary-200">Average Annual Return</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-neutral-900 mb-4">
            Ready to Start Investing?
          </h2>
          <p className="text-lg text-neutral-600 mb-8 max-w-2xl mx-auto">
            Join thousands of successful investors who have already chosen our platform for their investment journey.
          </p>
          <Link to="/login">
            <Button size="lg">
              Create Your Account
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;