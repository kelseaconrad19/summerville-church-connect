
import PageHeader from "@/components/PageHeader";
import ServiceTimes from "@/components/ServiceTimes";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

const AboutPage = () => {
  const leadershipTeam = [
    {
      name: "John Smith",
      role: "Senior Minister",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      bio: "John has been serving as our senior minister since 2010. He has a passion for teaching God's Word and helping people grow in their faith."
    },
    {
      name: "Michael Johnson",
      role: "Youth Minister",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      bio: "Michael leads our youth ministry with energy and dedication. He loves seeing young people discover the joy of following Jesus."
    },
    {
      name: "Robert Williams",
      role: "Elder",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      bio: "Robert has served as an elder for 15 years. His wisdom and gentle guidance have been invaluable to our church family."
    },
    {
      name: "David Brown",
      role: "Elder",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      bio: "David brings business experience and practical insight to our leadership team. He's passionate about church growth and community outreach."
    }
  ];

  return (
    <div>
      <PageHeader 
        title="About Our Church"
        description="Learn about our history, beliefs, and vision for the future"
        backgroundImage="https://images.unsplash.com/photo-1473177104440-ffee2f376098?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
      />
      
      {/* Our Story Section */}
      <section className="section-padding bg-white">
        <div className="page-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="mb-4 text-gray-700">
                Summerville Church of Christ was established in 1965 by a small group of families 
                committed to New Testament Christianity. From our humble beginnings in a rented 
                storefront, we've grown into a thriving congregation with a beautiful campus and 
                a heart for serving our community.
              </p>
              <p className="mb-4 text-gray-700">
                For over five decades, our congregation has been a beacon of hope and faith in the 
                Summerville area. Through times of growth and change, we've remained committed to 
                our founding principles of Bible-based teaching, sincere worship, and compassionate 
                outreach.
              </p>
              <p className="text-gray-700">
                Today, we're a diverse family of believers united by our love for God and desire 
                to share the good news of Jesus Christ with our community and beyond.
              </p>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" 
                alt="Church Building" 
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Beliefs Section */}
      <section className="section-padding bg-gray-50">
        <div className="page-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What We Believe</h2>
            <div className="w-20 h-1 bg-church-blue mx-auto mb-6"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">The Bible</h3>
                <p className="text-gray-700">
                  We believe the Bible is God's inspired Word, the complete revelation of His will 
                  for salvation, and the ultimate authority for Christian faith and life.
                </p>
              </CardContent>
            </Card>
            
            <Card className="shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Jesus Christ</h3>
                <p className="text-gray-700">
                  We believe in Jesus Christ as the Son of God, who came to earth as fully divine 
                  and fully human, lived a sinless life, died for our sins, and rose from the dead.
                </p>
              </CardContent>
            </Card>
            
            <Card className="shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Salvation</h3>
                <p className="text-gray-700">
                  We believe salvation is a free gift from God, received through faith in Jesus 
                  Christ and obedience to His commands, including repentance, confession, and 
                  baptism by immersion.
                </p>
              </CardContent>
            </Card>
            
            <Card className="shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">The Church</h3>
                <p className="text-gray-700">
                  We believe the church is the body of Christ on earth, empowered by the Holy 
                  Spirit to continue the work of Jesus by sharing the good news and serving others 
                  in love.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Leadership Team */}
      <section className="section-padding bg-white">
        <div className="page-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Leadership Team</h2>
            <div className="w-20 h-1 bg-church-blue mx-auto mb-6"></div>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              Meet the dedicated individuals who help guide our church family.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {leadershipTeam.map((leader, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                <div className="h-64 overflow-hidden">
                  <img 
                    src={leader.image} 
                    alt={leader.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1">{leader.name}</h3>
                  <p className="text-church-blue font-medium mb-3">{leader.role}</p>
                  <p className="text-gray-600">{leader.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Plan Your Visit */}
      <section id="visit" className="section-padding bg-church-light-blue">
        <div className="page-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Plan Your Visit</h2>
            <div className="w-20 h-1 bg-church-blue mx-auto mb-6"></div>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              We'd love to have you join us for worship! Here's what you can expect when you visit.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Card className="shadow-md">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">What to Expect</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-bold text-lg">A Warm Welcome</h4>
                      <p className="text-gray-700">
                        When you arrive, our greeters will welcome you, answer any questions, 
                        and help you find your way around. We're a friendly bunch!
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-bold text-lg">Worship Style</h4>
                      <p className="text-gray-700">
                        Our worship follows the New Testament pattern with a cappella singing, 
                        prayer, communion, giving, and Bible-based teaching.
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-bold text-lg">Children's Programs</h4>
                      <p className="text-gray-700">
                        We offer age-appropriate Bible classes for children of all ages during 
                        our Bible study hour. All our children's workers are background-checked 
                        for safety.
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-bold text-lg">Dress Code</h4>
                      <p className="text-gray-700">
                        There's no formal dress code. Some members dress casually while others 
                        prefer more formal attire. Come as you are!
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <div className="rounded-lg overflow-hidden shadow-lg">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3354.230364624891!2d-80.17551502392329!3d32.78203167505267!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88fe71f78e00c47d%3A0xf1e68a5436afcd06!2sSummerville%2C%20SC!5e0!3m2!1sen!2sus!4v1682783365151!5m2!1sen!2sus"
                  width="100%" 
                  height="300" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy"
                  className="rounded-lg"
                  title="Church Location"
                ></iframe>
              </div>
            </div>
            
            <div>
              <ServiceTimes />
              
              <Card className="mt-6 shadow-md">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Contact Information</h3>
                  <div className="space-y-2">
                    <p><strong>Address:</strong> 123 Main Street, Summerville, SC 29483</p>
                    <p><strong>Phone:</strong> (555) 123-4567</p>
                    <p><strong>Email:</strong> info@summervillechurch.org</p>
                  </div>
                </CardContent>
              </Card>
              
              <div className="mt-6">
                <Button asChild className="w-full bg-church-blue hover:bg-blue-500">
                  <Link to="/contact">Contact Us</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
