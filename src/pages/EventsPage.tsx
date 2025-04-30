
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import PageHeader from "@/components/PageHeader";
import { EventCalendar } from "@/components/EventCalendar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EventCard from "@/components/EventCard";
import { fetchEvents } from "@/lib/api/events";

const EventsPage = () => {
  const [activeTab, setActiveTab] = useState("upcoming");

  const { data: upcomingEvents, refetch: refetchUpcoming, isLoading: isLoadingUpcoming } = useQuery({
    queryKey: ["events", "upcoming"],
    queryFn: () => fetchEvents("upcoming"),
  });

  const { data: recurringEvents, refetch: refetchRecurring, isLoading: isLoadingRecurring } = useQuery({
    queryKey: ["events", "recurring"],
    queryFn: () => fetchEvents("recurring"),
  });

  const handleEventRegistration = () => {
    refetchUpcoming();
    refetchRecurring();
  };
  
  return (
    <div>
      <PageHeader 
        title="Events & Calendar"
        description="Stay connected with what's happening in our church community"
        backgroundImage="/images/events.jpg"
      />
      
      <section className="section-padding bg-white">
        <div className="page-container">
          {/* Calendar Component */}
          <div className="mb-12">
            <EventCalendar />
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
              {isLoadingUpcoming ? (
                <div className="text-center py-8">Loading upcoming events...</div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {upcomingEvents?.length === 0 ? (
                    <div className="col-span-full text-center py-8">No upcoming events found</div>
                  ) : (
                    upcomingEvents?.map((event) => (
                      <EventCard
                        key={event.id}
                        event={event}
                        onRegister={handleEventRegistration}
                      />
                    ))
                  )}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="recurring">
              {isLoadingRecurring ? (
                <div className="text-center py-8">Loading recurring events...</div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {recurringEvents?.length === 0 ? (
                    <div className="col-span-full text-center py-8">No recurring events found</div>
                  ) : (
                    recurringEvents?.map((event) => (
                      <EventCard
                        key={event.id}
                        event={event}
                        onRegister={handleEventRegistration}
                      />
                    ))
                  )}
                </div>
              )}
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
