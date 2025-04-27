
import PageHeader from "@/components/PageHeader";
import MinistryCard from "@/components/MinistryCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

const MinistriesPage = () => {
  const ministries = [
    {
      id: "children",
      name: "Children's Ministry",
      description: "Nurturing the faith of our youngest members through fun and engaging Bible lessons.",
      longDescription: "Our children's ministry provides age-appropriate Bible education and activities for children from birth through elementary school. We focus on helping children understand God's love and develop a personal relationship with Jesus in a safe, fun environment.",
      image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
      activities: [
        "Sunday Bible Classes (9:00 AM)",
        "Children's Worship (during sermon)",
        "Vacation Bible School (Summer)",
        "Family Fun Nights (Monthly)"
      ],
      contact: "Sarah Johnson, Children's Minister"
    },
    {
      id: "youth",
      name: "Youth Group",
      description: "Supporting teens in their spiritual growth through fellowship, fun activities, and Bible study.",
      longDescription: "Our youth ministry provides a Christ-centered community where teenagers can grow in their faith, develop lasting friendships, and learn to apply biblical principles to their everyday lives. We offer a mix of fun activities, meaningful discussions, and service opportunities.",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
      activities: [
        "Sunday Bible Study (9:00 AM)",
        "Sunday Night Youth Group (5:00 PM)",
        "Wednesday Night Bible Study (7:00 PM)",
        "Monthly Activities & Service Projects",
        "Summer Camp & Mission Trips"
      ],
      contact: "Michael Johnson, Youth Minister"
    },
    {
      id: "adult",
      name: "Adult Bible Studies",
      description: "Deepening faith through in-depth Bible study, prayer, and community discussion.",
      longDescription: "Our adult education ministry offers various opportunities for spiritual growth through Bible study, topical discussions, and prayer. These classes and small groups help foster spiritual maturity and build meaningful relationships within our church family.",
      image: "https://images.unsplash.com/photo-1473177104440-ffee2f376098?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
      activities: [
        "Sunday Morning Bible Classes (9:00 AM)",
        "Wednesday Night Bible Study (7:00 PM)",
        "Small Groups (Various times)",
        "Men's and Women's Bible Studies"
      ],
      contact: "Robert Williams, Education Minister"
    },
    {
      id: "worship",
      name: "Worship Ministry",
      description: "Leading the congregation in heartfelt worship through a cappella singing.",
      longDescription: "Our worship ministry focuses on leading the congregation in meaningful worship through a cappella singing. We strive to create an atmosphere where people can connect with God and express their devotion through songs of praise.",
      image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
      activities: [
        "Sunday Worship Services",
        "Song Leader Training",
        "Singing Practice (Monthly)",
        "Special Singing Events"
      ],
      contact: "David Brown, Worship Coordinator"
    },
    {
      id: "outreach",
      name: "Community Outreach",
      description: "Sharing God's love through service projects and community involvement.",
      longDescription: "Our outreach ministry seeks to demonstrate Christ's love by addressing physical needs in our community. We organize various service projects, food drives, and other initiatives to help those in need while sharing the message of hope found in Jesus.",
      image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
      activities: [
        "Food Pantry (Weekly)",
        "Clothing Closet (Monthly)",
        "Community Service Days",
        "Holiday Assistance Programs",
        "Disaster Relief Support"
      ],
      contact: "Jennifer Smith, Outreach Coordinator"
    },
    {
      id: "seniors",
      name: "Senior Ministry",
      description: "Serving and celebrating our older members through fellowship and care.",
      longDescription: "Our senior ministry honors our older members through fellowship opportunities, spiritual enrichment, and practical support. We recognize the wisdom and experience seniors bring to our church family and seek to keep them actively engaged in church life.",
      image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
      activities: [
        "Monthly Luncheons",
        "Bible Study (Tuesdays at 10:00 AM)",
        "Visitation Program",
        "Transportation Assistance",
        "Senior Trips & Activities"
      ],
      contact: "Tom Wilson, Senior Ministry Coordinator"
    }
  ];

  return (
    <div>
      <PageHeader 
        title="Our Ministries"
        description="Connect, serve, and grow through these ministry opportunities"
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {ministries.map((ministry) => (
              <MinistryCard
                key={ministry.id}
                title={ministry.name}
                description={ministry.description}
                image={ministry.image}
                link={`#${ministry.id}`}
              />
            ))}
          </div>
          
          {/* Detailed Ministry Information */}
          {ministries.map((ministry) => (
            <div key={ministry.id} id={ministry.id} className="page-section">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-1">
                  <div className="sticky top-24">
                    <div className="rounded-lg overflow-hidden mb-4">
                      <img 
                        src={ministry.image} 
                        alt={ministry.name} 
                        className="w-full h-auto"
                      />
                    </div>
                    <Card>
                      <CardContent className="p-6">
                        <h3 className="text-lg font-bold mb-3">Ministry Activities</h3>
                        <ul className="space-y-2">
                          {ministry.activities.map((activity, index) => (
                            <li key={index} className="flex items-start">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-church-blue mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              <span>{activity}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="mt-4 pt-4 border-t">
                          <p className="text-sm"><strong>Contact:</strong> {ministry.contact}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
                <div className="lg:col-span-2">
                  <h2 className="text-3xl font-bold mb-4">{ministry.name}</h2>
                  <div className="w-20 h-1 bg-church-blue mb-6"></div>
                  <p className="text-lg text-gray-700 mb-6">
                    {ministry.longDescription}
                  </p>
                  <div className="mb-8">
                    <h3 className="text-xl font-bold mb-3">How to Get Involved</h3>
                    <p className="text-gray-700 mb-4">
                      Whether you're looking to serve or simply want to participate, we'd love to have you join us! 
                      Here are some ways to get connected with the {ministry.name.toLowerCase()}:
                    </p>
                    <ul className="space-y-2 mb-6">
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
                      <li className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-church-blue mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>Fill out a connection card on Sunday indicating your interest</span>
                      </li>
                      <li className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-church-blue mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>Complete our volunteer application if you'd like to serve</span>
                      </li>
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
