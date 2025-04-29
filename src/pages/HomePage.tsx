
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import ServiceTimes from "@/components/ServiceTimes";
import EventCards from "@/components/EventCards";
import LatestSermons from "@/components/LatestSermons";

const HomePage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative bg-cover bg-center h-[80vh] flex items-center"
        style={{ 
          backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1473177104440-ffee2f376098?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')",
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 animate-fade-in">
              Welcome to Summerville Church of Christ
            </h1>
            <p className="text-xl sm:text-2xl text-white mb-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              A community of faith sharing God's love in Summerville
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <Button asChild size="lg" className="text-lg bg-church-blue hover:bg-blue-500">
                <Link to="/about#visit">Plan Your Visit</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-lg bg-white text-church-blue hover:bg-gray-100">
                <Link to="/sermons">Watch Sermons</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Welcome Section */}
      <section className="section-padding bg-white">
        <div className="page-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Mission</h2>
            <div className="w-20 h-1 bg-church-blue mx-auto mb-6"></div>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              We exist to glorify God by making disciples who love God, grow in community, 
              and serve our city. Join us as we seek to share the transformative message of 
              Jesus Christ with our community and beyond.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="text-center p-6 rounded-lg bg-church-light-blue">
              <div className="bg-white p-4 inline-block rounded-full mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-10 w-10 text-church-blue">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4 4 0 000 6.364L12 20.364l7.682-7.682a4 4 0 00-6.364-6.364L12 7.636l-1.318-1.318a4 4 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Love God</h3>
              <p className="text-gray-700">
                We worship together and grow in our relationship with God through prayer, 
                Bible study, and fellowship.
              </p>
            </div>
            
            <div className="text-center p-6 rounded-lg bg-church-green">
              <div className="bg-white p-4 inline-block rounded-full mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-10 w-10 text-church-blue">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Grow in Community</h3>
              <p className="text-gray-700">
                We build meaningful relationships through small groups, fellowship events, 
                and serving alongside one another.
              </p>
            </div>
            
            <div className="text-center p-6 rounded-lg bg-church-light-blue">
              <div className="bg-white p-4 inline-block rounded-full mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-10 w-10 text-church-blue">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 019-9m0 18c-1.657 0-3-4.03-3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s-1.343-9-3-9m-9 9a9 9 0 019-9" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Serve Our City</h3>
              <p className="text-gray-700">
                We demonstrate Christ's love through outreach programs, missions, and 
                community service initiatives.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Service Times & Location */}
      <section className="section-padding bg-gray-50">
        <div className="page-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Join Us This Sunday</h2>
              <p className="text-gray-700 mb-6">
                We'd love to have you join us for worship! Our services are designed 
                to be welcoming to all, whether you're a long-time Christian or just 
                exploring faith.
              </p>
              <ServiceTimes />
              <Button asChild className="mt-6 bg-church-blue hover:bg-blue-500">
                <Link to="/about#visit">Plan Your Visit</Link>
              </Button>
            </div>
            
            <div>
              <div className="rounded-lg overflow-hidden shadow-lg">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3354.230364624891!2d-80.17551502392329!3d32.78203167505267!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88fe71f78e00c47d%3A0xf1e68a5436afcd06!2sSummerville%2C%20SC!5e0!3m2!1sen!2sus!4v1682783365151!5m2!1sen!2sus"
                  width="100%" 
                  height="400" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy"
                  className="rounded-lg"
                  title="Church Location"
                ></iframe>
              </div>
              <p className="text-center mt-4 text-gray-700">
                <strong>123 Main Street, Summerville, SC 29483</strong>
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Latest Sermons */}
      <section className="section-padding bg-white">
        <div className="page-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Latest Sermons</h2>
            <div className="w-20 h-1 bg-church-blue mx-auto mb-6"></div>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              Listen to recent messages from our services and grow in your faith journey.
            </p>
          </div>
          
          <LatestSermons />
          
          <div className="text-center mt-10">
            <Button asChild className="bg-church-blue hover:bg-blue-500">
              <Link to="/sermons">View All Sermons</Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Upcoming Events */}
      <section className="section-padding bg-gray-50">
        <div className="page-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Upcoming Events</h2>
            <div className="w-20 h-1 bg-church-blue mx-auto mb-6"></div>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              Join us for these upcoming gatherings and opportunities to connect with our church family.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <EventCards />
          </div>
          
          <div className="text-center mt-10">
            <Button asChild className="bg-church-blue hover:bg-blue-500">
              <Link to="/events">View All Events</Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section 
        className="py-16 md:py-24 px-4 text-center bg-cover bg-center relative"
        style={{ 
          backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')",
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
      >
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 animate-fade-in">
            We'd Love to Meet You
          </h2>
          <p className="text-xl text-white mb-8 animate-fade-in">
            No matter where you are in your spiritual journey, you are welcome here. 
            Join us this Sunday as we worship and grow together.
          </p>
          <div className="flex justify-center animate-fade-in">
            <Button asChild size="lg" className="text-lg bg-church-blue hover:bg-blue-500">
              <Link to="/about#visit">Plan Your Visit</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
