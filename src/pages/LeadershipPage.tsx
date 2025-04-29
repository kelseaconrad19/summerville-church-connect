
import PageHeader from "@/components/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Mail } from "lucide-react";
import { LeadershipMember } from "@/lib/types/leadership";

const LeadershipPage = () => {
  const { data: leadershipData } = useQuery({
    queryKey: ["leadership"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("leadership")
        .select("*")
        .order("display_order", { ascending: true })
        .order("role", { ascending: true })
        .order("name", { ascending: true });

      if (error) {
        console.error("Error fetching leadership data:", error);
        return { leadershipTeam: [], shepherds: [], deacons: [] };
      }

      // Cast data to LeadershipMember[] to ensure type safety
      const typedData = data as LeadershipMember[];

      return {
        leadershipTeam: typedData.filter(item => item.role === "Leadership Team") || [],
        shepherds: typedData.filter(item => item.role === "Shepherd") || [],
        deacons: typedData.filter(item => item.role === "Deacon") || [],
      };
    },
    initialData: { 
      leadershipTeam: [], 
      shepherds: [], 
      deacons: [] 
    }
  });

  const renderLeaderCard = (leader: LeadershipMember) => (
    <div key={leader.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      <div className="h-64 overflow-hidden">
        <img 
          src={leader.image_url || "https://images.unsplash.com/photo-1511632765486-a01980e01a18?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"} 
          alt={leader.name} 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-bold mb-1">{leader.name}</h3>
            <p className="text-church-blue font-medium mb-3">{leader.ministry || leader.role}</p>
          </div>
          {leader.email && (
            <a 
              href={`mailto:${leader.email}`}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              title={`Email ${leader.name}`}
            >
              <Mail className="h-5 w-5 text-church-blue" />
            </a>
          )}
        </div>
        <p className="text-gray-600">{leader.bio}</p>
      </div>
    </div>
  );

  return (
    <div>
      <PageHeader 
        title="Our Leadership"
        description="Meet the dedicated leaders who guide and serve our church family"
        backgroundImage="https://images.unsplash.com/photo-1511632765486-a01980e01a18?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
      />
      
      {/* Ministry Staff Section */}
      <section className="section-padding bg-white">
        <div className="page-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ministry Staff</h2>
            <div className="w-20 h-1 bg-church-blue mx-auto mb-6"></div>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              Our dedicated staff members who serve our congregation daily.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {leadershipData.leadershipTeam.map(renderLeaderCard)}
          </div>
        </div>
      </section>

      {/* Shepherds (Elders) Section */}
      <section className="section-padding bg-gray-50">
        <div className="page-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Shepherds</h2>
            <div className="w-20 h-1 bg-church-blue mx-auto mb-6"></div>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              These men serve as elders, providing spiritual leadership and guidance to our church family.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {leadershipData.shepherds.map(renderLeaderCard)}
          </div>
        </div>
      </section>

      {/* Deacons Section */}
      <section className="section-padding bg-white">
        <div className="page-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Deacons</h2>
            <div className="w-20 h-1 bg-church-blue mx-auto mb-6"></div>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              These dedicated servants lead various ministries and service areas within our congregation.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {leadershipData.deacons.map(renderLeaderCard)}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LeadershipPage;
