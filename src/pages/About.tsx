import React from 'react';
import { Building2, Target, Award, Users, Briefcase, BarChart as ChartBar } from 'lucide-react';
import PageHeader from '../components/layout/PageHeader';
import { Card, CardContent } from '../components/ui/Card';

const About: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <PageHeader
        title="About Us"
        description="Learn about our mission, values, and track record of success in investment management."
      />

      {/* Mission Section */}
      <div className="mb-16">
        <div className="bg-white rounded-lg overflow-hidden shadow-sm">
          <div className="md:flex">
            <div className="md:flex-1 p-8">
              <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
              <p className="text-neutral-600 mb-6">
                We are dedicated to providing our investors with exceptional opportunities
                for wealth creation through carefully selected investment projects. Our
                focus on transparency, due diligence, and sustainable growth has made us
                a trusted partner for investors seeking reliable returns.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start">
                  <Target className="h-6 w-6 text-primary-600 mt-1 mr-3" />
                  <div>
                    <h3 className="font-medium">Strategic Focus</h3>
                    <p className="text-sm text-neutral-600">
                      Identifying high-potential investment opportunities
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Award className="h-6 w-6 text-primary-600 mt-1 mr-3" />
                  <div>
                    <h3 className="font-medium">Excellence</h3>
                    <p className="text-sm text-neutral-600">
                      Maintaining the highest standards in all operations
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:flex-1">
              <img
                src="https://images.pexels.com/photos/3183183/pexels-photo-3183183.jpeg"
                alt="Team Meeting"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-8">Our Core Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <Users className="h-8 w-8 text-primary-600 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Investor First</h3>
              <p className="text-neutral-600">
                We prioritize our investors' interests in every decision we make,
                ensuring their success is our primary focus.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <Briefcase className="h-8 w-8 text-primary-600 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Professional Excellence</h3>
              <p className="text-neutral-600">
                Our team maintains the highest standards of professionalism and
                expertise in investment management.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <ChartBar className="h-8 w-8 text-primary-600 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Sustainable Growth</h3>
              <p className="text-neutral-600">
                We focus on long-term, sustainable growth strategies that deliver
                consistent returns for our investors.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Team Section */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-8">Leadership Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              name: "Sarah Johnson",
              title: "Chief Executive Officer",
              image: "https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg",
              description: "20+ years of investment management experience"
            },
            {
              name: "Michael Chen",
              title: "Chief Investment Officer",
              image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg",
              description: "Former head of real estate at Goldman Sachs"
            },
            {
              name: "Emily Williams",
              title: "Head of Operations",
              image: "https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg",
              description: "15+ years of operations management experience"
            }
          ].map((member) => (
            <Card key={member.name}>
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-48 object-cover"
              />
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-1">{member.name}</h3>
                <p className="text-primary-600 text-sm mb-2">{member.title}</p>
                <p className="text-neutral-600 text-sm">{member.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Track Record */}
      <div>
        <h2 className="text-2xl font-bold mb-8">Our Track Record</h2>
        <div className="bg-white rounded-lg border border-neutral-200 p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-600 mb-2">15+</div>
              <div className="text-neutral-600">Years of Experience</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-600 mb-2">$2B+</div>
              <div className="text-neutral-600">Total Investments Managed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-600 mb-2">200+</div>
              <div className="text-neutral-600">Successful Projects</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-600 mb-2">18%</div>
              <div className="text-neutral-600">Average Annual Return</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;