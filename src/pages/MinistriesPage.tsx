
import { useQuery } from "@tanstack/react-query";
import PageHeader from "@/components/PageHeader";
import MinistryCard from "@/components/MinistryCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Ministry } from "@/lib/types/ministries";
import { useState } from "react";

const MinistriesPage = () => {
  const [selectedMinistryId, setSelectedMinistryId] = useState<string | null>(null);

  const { data: ministries = [], isLoading } = useQuery({
    queryKey: ['ministries'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('ministries')
        .select('*')
        .order('title', { ascending: true });

      if (error) {
        console.error('Error fetching ministries:', error);
        return [];
      }

      return data as Ministry[];
    },
  });

  const handleMinistryCardClick = (ministryId: string) => {
    setSelectedMinistryId(ministryId === selectedMinistryId ? null : ministryId);
    
    // Scroll to the ministry section if it's not already visible
    if (ministryId !== selectedMinistryId) {
      setTimeout(() => {
        const element = document.getElementById(ministryId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  };

  return (
    <div>
      <PageHeader 
        title="Our Ministries"
        description="Connect, serve, and grow through these ministry opportunities"
        backgroundImage="/images/ministries.jpg"
      />
      
      <section className="section-padding bg-white">
        <div className="page-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How We Serve</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              At Summerville Church of Christ, we believe every member has unique gifts to contribute 
              to the body of Christ. Our ministries provide opportunities for spiritual growth, 
              meaningful fellowship, and service to others.
            </p>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center items-center py-10">
              <div className="animate-pulse text-lg">Loading ministries...</div>
            </div>
          ) : ministries.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-lg text-gray-500">No ministries found.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                {ministries.map((ministry) => (
                  <MinistryCard
                    key={ministry.id}
                    title={ministry.title}
                    description={ministry.description}
                    image={ministry.image_url || "https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"}
                    link={`#${ministry.id}`}
                    buttonText="Learn More"
                    onClick={() => handleMinistryCardClick(ministry.id)}
                  />
                ))}
              </div>
              
              {/* Detailed Ministry Information */}
              {ministries.map((ministry) => (
                <div key={ministry.id} id={ministry.id} className={`page-section ${selectedMinistryId === ministry.id ? 'animate-fadeIn' : ''}`}>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    <div className="lg:col-span-1">
                      <div className="sticky top-24">
                        <div className="rounded-lg overflow-hidden mb-4">
                          <img 
                            src={ministry.image_url || "https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"} 
                            alt={ministry.title} 
                            className="w-full h-auto"
                          />
                        </div>
                        <Card>
                          <CardContent className="p-6">
                            <h3 className="text-lg font-bold mb-3">Ministry Activities</h3>
                            <ul className="space-y-2">
                              {ministry.activities && ministry.activities.length > 0 ? (
                                ministry.activities.map((activity, index) => (
                                  <li key={index} className="flex items-start">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-church-blue mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span>{activity}</span>
                                  </li>
                                ))
                              ) : (
                                <li className="text-gray-500">No activities listed</li>
                              )}
                            </ul>
                            <div className="mt-4 pt-4 border-t">
                              <p className="text-sm">
                                <strong>Contact:</strong> {ministry.contact_first_name} {ministry.contact_last_name} ({ministry.contact_email})
                              </p>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                    <div className="lg:col-span-2">
                      <h2 className="text-3xl font-bold mb-4">{ministry.title}</h2>
                      <div className="w-20 h-1 bg-church-blue mb-6"></div>
                      <p className="text-lg text-gray-700 mb-6">
                        {ministry.description}
                      </p>
                      <div className="mb-8">
                        <h3 className="text-xl font-bold mb-3">How to Get Involved</h3>
                        <p className="text-gray-700 mb-4">
                          {ministry.involvement_description || "Whether you're looking to serve or simply want to participate, we'd love to have you join us!"}
                        </p>
                        <ul className="space-y-2 mb-6">
                          {ministry.involvement_ways && ministry.involvement_ways.length > 0 ? (
                            ministry.involvement_ways.map((way, index) => (
                              <li key={index} className="flex items-start">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-church-blue mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>{way}</span>
                              </li>
                            ))
                          ) : (
                            <>
                              <li className="flex items-start">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-church-blue mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>Attend any of our regular meetings or activities</span>
                              </li>
                              <li className="flex items-start">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-church-blue mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>Contact the ministry leader for more information</span>
                              </li>
                            </>
                          )}
                        </ul>
                        <div className="flex space-x-4">
                          <Button className="bg-church-blue hover:bg-blue-500">
                            Contact Ministry Leader
                          </Button>
                          <Button variant="outline" className="border-church-blue text-church-blue hover:bg-church-light-blue">
                            Volunteer Application
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
          
          {/* Start Your Own Ministry */}
          <div className="mt-16 bg-church-light-blue p-8 rounded-lg">
            <div className="text-center max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold mb-4">Have an Idea for a New Ministry?</h3>
              <p className="text-gray-700 mb-6">
                God may be calling you to start something new! If you have a passion for serving 
                in a way that's not currently covered by our existing ministries, we'd love to 
                hear your ideas and help you explore how God might use you.
              </p>
              <Button asChild className="bg-church-blue hover:bg-blue-500">
                <Link to="/contact">Contact Church Leadership</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MinistriesPage;
