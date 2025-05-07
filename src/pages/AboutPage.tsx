
import PageHeader from "@/components/PageHeader";
import ServiceTimes from "@/components/ServiceTimes";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

const AboutPage = () => {

  return (
    <div>
      <PageHeader 
        title="About Our Church"
        description="Learn about our history, beliefs, and vision for the future"
        backgroundImage="/images/about.jpg"
      />
      
      {/* Our Story Section */}
      <section className="section-padding bg-white">
        <div className="page-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="mb-4 text-gray-700">
                The Summerville Church of Christ first met on March 3, 1968, with 58 people in attendance. Wayne Altman served as the congregation’s first minister until 1995, continuing to worship with the church family after his retirement. David Clayton served as senior minister from 1996 until his retirement in 2022, when Len Driskell stepped into the role. From the beginning, the church has been devoted to sharing Christ’s love and building a strong spiritual community.
              </p>
              <p className="mb-4 text-gray-700">
              The congregation purchased a 3.6-acre property soon after its founding, completing its first building in 1969. As the church grew, new spaces were added, including classrooms, a multi-purpose room, a 600-seat auditorium, and a Family Life Center with a gym, kitchen, and fellowship areas. In 1989, following Hurricane Hugo, the church became an emergency relief center, coordinating aid and distributing supplies across the Lowcountry.

              </p>
              <p className="mb-4 text-gray-700">
              Today, Summerville Church of Christ remains dedicated to the truth of Scripture and the vision of its founders. Weekly attendance is over 300, with strong youth, family, and mission ministries. In recent years, the congregation has raised over $100,000 for external missions and partnered with Triangle 2 Solutions to better serve the growing Summerville community. We trust that God will continue to guide and bless His church here.

              </p>
              <p className="text-gray-700"><em>
                (Adapted from the Summerville Church of Christ History at 40 Years, compiled by Ken Leach, 2008; updated 2018.)
              
              </em>           </p>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-lg">
              <img 
                src="/images/otherChurch2.jpg" 
                alt="Photo by Kenny Eliason on Unsplash"
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
                <h3 className="text-xl font-bold mb-4">The Trinity</h3>
                <p className="text-gray-700">
                WWe believe in one God who exists eternally as three persons—God the Father, God the Son, and God the Holy Spirit—equal in power and united in purpose.

                </p>
              </CardContent>
            </Card>
            
            <Card className="shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Salvation</h3>
                <p className="text-gray-700">
                We believe all people have sinned and fall short of God’s glory. But through Jesus—God’s Son, born of a virgin, crucified, and raised on the third day—we are offered forgiveness, grace, and new life through faith.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Baptism</h3>
                <p className="text-gray-700">
                We believe that when believers are baptized into Christ, they receive forgiveness of sins, the gift of the Holy Spirit, and are raised to walk in newness of life, growing continually in faith and fruitfulness.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">The Bible</h3>
                <p className="text-gray-700">
                We believe the Bible is the inspired Word of God, fully authoritative and sufficient for faith, salvation, and daily living. It reveals God’s will and provides the foundation for all Christian teaching and practice.
                </p>
              </CardContent>
            </Card>
            
            <Card className="shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Jesus Christ</h3>
                <p className="text-gray-700">
                We believe Jesus is the Son of God, fully divine and fully human, who lived a perfect life, died for our sins, and rose from the dead. He is the Savior of the world and the head of the church.
                </p>
              </CardContent>
            </Card>
            
            
            <Card className="shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">The Church</h3>
                <p className="text-gray-700">
                We believe the church is the body of Christ on earth, called to worship, serve, and grow together. Following the New Testament example, we observe weekly communion, sing a cappella, baptize by immersion, and are led by shepherds.
                </p>
              </CardContent>
            </Card>
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
          
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-3 space-y-6">
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
                  </div>
                </CardContent>
              </Card>
              
              <div className="rounded-lg overflow-hidden shadow-lg">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3329.057827702468!2d-80.18001348479398!3d32.96609818092673!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88fe7103c50c1bff%3A0xf9433a0661b99d53!2s413%20Old%20Trolley%20Rd%2C%20Summerville%2C%20SC%2029485!5e0!3m2!1sen!2sus!4v1682790000000!5m2!1sen!2sus" 
                  width="100%" 
                  height="300" 
                  style={{ border: 0 }}  
                  allowFullScreen 
                  loading="lazy" 
                  className="rounded-lg" 
                  title="Church Location">
                </iframe>
              </div>
            </div>
            
            <div className="lg:col-span-2">
              <ServiceTimes />
              
              <Card className="mt-6 shadow-md">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Contact Information</h3>
                  <div className="space-y-2">
                    <p><strong>Address:</strong> 413 Old Trolley Rd, Summerville, SC 29485</p>
                    <p><strong>Phone:</strong> (843) 873-1517</p>
                    <p><strong>Email:</strong> office@summervillechurchofchrist.org</p>
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
