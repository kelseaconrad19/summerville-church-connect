
import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import EventCard from "@/components/EventCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const EventsPage = () => {
  const [activeTab, setActiveTab] = useState("upcoming");
  
  // Sample events data
  const upcomingEvents = [
    {
      id: 1,
      title: "Family Fun Night",
      date: "May 15, 2023",
      time: "6:00 PM",
      description: "Join us for games, food, and fellowship perfect for the entire family. We'll have activities for all ages!",
      image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
    },
    {
      id: 2,
      title: "Bible Study Series",
      date: "Every Wednesday",
      time: "7:00 PM",
      description: "An in-depth study of the book of Romans led by Pastor Johnson. Bring your Bible and a friend!",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
    },
    {
      id: 3,
      title: "Community Service Day",
      date: "June 3, 2023",
      time: "9:00 AM",
      description: "Volunteer to help clean up local parks and serve our community. Supplies and lunch will be provided.",
      image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
    },
    {
      id: 4,
      title: "Men's Prayer Breakfast",
      date: "May 20, 2023",
      time: "8:00 AM",
      description: "A time of fellowship, prayer, and encouragement for men. Enjoy a delicious breakfast while connecting with others.",
      image: "https://images.unsplash.com/photo-1473177104440-ffee2f376098?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
    },
    {
      id: 5,
      title: "Women's Bible Study",
      date: "Every Thursday",
      time: "10:00 AM",
      description: "Join us for coffee, prayer, and study of God's Word. This weekly gathering is a wonderful opportunity for women to grow together.",
      image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
    },
    {
      id: 6,
      title: "Vacation Bible School",
      date: "June 12-16, 2023",
      time: "9:00 AM - 12:00 PM",
      description: "A week of Bible stories, crafts, games, and fun for children ages 4-12. Registration opens May 1st!",
      image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
    }
  ];
  
  const recurringEvents = [
    {
      id: 7,
      title: "Sunday Worship",
      date: "Every Sunday",
      time: "10:30 AM",
      description: "Our main worship service featuring a cappella singing, communion, prayer, and Bible-based teaching.",
      image: "https://images.unsplash.com/photo-1473177104440-ffee2f376098?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
    },
    {
      id: 8,
      title: "Sunday Bible Classes",
      date: "Every Sunday",
      time: "9:00 AM",
      description: "Age-appropriate Bible study classes for all ages, from children to adults.",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
    },
    {
      id: 9,
      title: "Wednesday Bible Study",
      date: "Every Wednesday",
      time: "7:00 PM",
      description: "Midweek Bible study for all ages. Adults meet in the auditorium, while children and teens have separate classes.",
      image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
    },
    {
      id: 10,
      title: "Youth Group",
      date: "Every Sunday",
      time: "5:00 PM",
      description: "Weekly gathering for teens featuring games, Bible study, discussion, and dinner.",
      image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
    }
  ];

  return (
    <div>
      <PageHeader 
        title="Events & Calendar"
        description="Stay connected with what's happening in our church community"
      />
      
      <section className="section-padding bg-white">
        <div className="page-container">
          {/* Calendar Component */}
          <div className="mb-12">
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Church Calendar</h2>
              <p className="text-gray-700 mb-6">
                Here's what's coming up at Summerville Church of Christ. Click on any event for more details.
              </p>
              <div className="bg-white border rounded-lg p-4 h-96 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-gray-500 mb-4">Interactive calendar would be embedded here.</p>
                  <p className="text-sm text-gray-400">(In the final implementation, this would be replaced with a dynamic calendar component.)</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Event Tabs */}
          <Tabs defaultValue="upcoming" value={activeTab} onValueChange={setActiveTab}>
            <div className="flex justify-center mb-6">
              <TabsList>
                <TabsTrigger value="upcoming" className="px-8">Upcoming Events</TabsTrigger>
                <TabsTrigger value="recurring" className="px-8">Recurring Events</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="upcoming">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {upcomingEvents.map((event) => (
                  <EventCard
                    key={event.id}
                    title={event.title}
                    date={event.date}
                    time={event.time}
                    description={event.description}
                    image={event.image}
                  />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="recurring">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recurringEvents.map((event) => (
                  <EventCard
                    key={event.id}
                    title={event.title}
                    date={event.date}
                    time={event.time}
                    description={event.description}
                    image={event.image}
                  />
                ))}
              </div>
            </TabsContent>
          </Tabs>
          
          {/* Submit Event Section */}
          <div className="mt-16 bg-church-light-blue p-8 rounded-lg text-center">
            <h3 className="text-2xl font-bold mb-4">Planning a Church Event?</h3>
            <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
              If you'd like to schedule a church event or ministry activity, please contact the church office 
              or submit your request using our online form.
            </p>
            <Button className="bg-church-blue hover:bg-blue-500">
              Submit Event Request
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EventsPage;
