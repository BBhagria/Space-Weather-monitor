
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Github, Linkedin, Mail } from 'lucide-react';

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <Button 
            onClick={() => navigate('/')}
            variant="outline"
            className="mr-4 bg-black/20 border-white/30 text-white hover:bg-black/40"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          <h1 className="text-4xl font-bold text-white bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            About the Developer
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="bg-black/30 border-blue-500/30 backdrop-blur-md">
            <CardHeader>
              <CardTitle className="text-2xl text-white">
                About This Project
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <p className="text-lg">
                This Space Weather Monitor is a comprehensive web application that provides real-time information about space weather events and potentially hazardous asteroids.
              </p>
              <p className="text-gray-300">
                The application features dynamic backgrounds sourced from NASA's Astronomy Picture of the Day (APOD), interactive space weather monitoring with customizable date ranges and weather type filters, and detailed asteroid tracking with speed trend analysis.
              </p>
              <p className="text-gray-300">
                Built with modern web technologies including React, TypeScript, Tailwind CSS, and integrated with space weather APIs to provide accurate and up-to-date information.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-black/30 border-purple-500/30 backdrop-blur-md">
            <CardHeader>
              <CardTitle className="text-2xl text-white">
                Developer Information
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-purple-300">Skills & Technologies</h3>
                <div className="flex flex-wrap gap-2">
                  {['React', 'TypeScript', 'Python', 'Node.js', 'Tailwind CSS', 'API Integration', 'Data Visualization'].map((skill) => (
                    <span key={skill} className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-purple-300">Interests</h3>
                <p className="text-gray-300">
                  Passionate about space exploration, astronomy, and creating innovative web applications that make complex scientific data accessible to everyone.
                </p>
              </div>

              <div className="space-y-2">
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-purple-300">Connect</h3>
                  <div className="flex space-x-4">
                    
                    {/* GitHub Button */}
                    <a
                      href="https://github.com/BBhagria?tab=repositories"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-black/20 border-purple-500/30 text-white hover:bg-black/40"
                      >
                        <Github className="w-4 h-4 mr-2" />
                        GitHub
                      </Button>
                    </a>

                    {/* LinkedIn Button */}
                    <a
                      href="https://www.linkedin.com/in/bhavesh-bhagria/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-black/20 border-purple-500/30 text-white hover:bg-black/40"
                      >
                        <Linkedin className="w-4 h-4 mr-2" />
                        LinkedIn
                      </Button>
                    </a>

                    {/* Email Button */}
                    <a
                      href="mailto:bhavesh.bhagria@gmail.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-black/20 border-purple-500/30 text-white hover:bg-black/40"
                      >
                        <Mail className="w-4 h-4 mr-2" />
                        Email
                      </Button>
                    </a>

                  </div>
                </div> 
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default About;
