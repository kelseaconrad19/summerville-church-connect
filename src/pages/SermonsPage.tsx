
import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import SermonCard from "@/components/SermonCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const SermonsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSeries, setSelectedSeries] = useState("all");
  const [selectedSpeaker, setSelectedSpeaker] = useState("all");
  
  const sermons = [
    {
      id: 1,
      title: "The Power of Faith",
      speaker: "John Smith",
      date: "April 23, 2023",
      description: "Exploring how faith can transform our lives even in the most challenging circumstances.",
      series: "Faith Walk Series",
      videoUrl: "#",
      audioUrl: "#"
    },
    {
      id: 2,
      title: "Living With Purpose",
      speaker: "Michael Johnson",
      date: "April 16, 2023",
      description: "Discovering God's purpose for your life and how to live it out every day.",
      series: "Life Essentials",
      videoUrl: "#",
      audioUrl: "#"
    },
    {
      id: 3,
      title: "The Heart of Worship",
      speaker: "John Smith",
      date: "April 9, 2023",
      description: "Understanding what true worship is and how it transforms our relationship with God.",
      series: "Worship Series",
      videoUrl: "#",
      audioUrl: "#"
    },
    {
      id: 4,
      title: "Grace That Saves",
      speaker: "Robert Williams",
      date: "April 2, 2023",
      description: "A deep dive into the concept of grace and its role in our salvation and daily lives.",
      series: "Foundations of Faith",
      videoUrl: "#",
      audioUrl: "#"
    },
    {
      id: 5,
      title: "The Gospel Message",
      speaker: "John Smith",
      date: "March 26, 2023",
      description: "Understanding the core message of the gospel and why it matters today.",
      series: "Foundations of Faith",
      videoUrl: "#",
      audioUrl: "#"
    },
    {
      id: 6,
      title: "Prayer That Works",
      speaker: "Michael Johnson",
      date: "March 19, 2023",
      description: "Practical guidance on developing a powerful prayer life that connects you with God.",
      series: "Life Essentials",
      videoUrl: "#",
      audioUrl: "#"
    }
  ];
  
  // Extract unique series and speakers for filters
  const seriesList = [...new Set(sermons.map(sermon => sermon.series))];
  const speakersList = [...new Set(sermons.map(sermon => sermon.speaker))];
  
  // Filter sermons based on search and filters
  const filteredSermons = sermons.filter(sermon => {
    const matchesSearch = sermon.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          sermon.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSeries = selectedSeries === "all" || sermon.series === selectedSeries;
    const matchesSpeaker = selectedSpeaker === "all" || sermon.speaker === selectedSpeaker;
    
    return matchesSearch && matchesSeries && matchesSpeaker;
  });

  return (
    <div>
      <PageHeader 
        title="Sermons"
        description="Listen to and watch recent messages from our services"
      />
      
      <section className="section-padding bg-white">
        <div className="page-container">
          {/* Featured Sermon */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Latest Sermon</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                  <iframe 
                    width="100%" 
                    height="100%" 
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
                    title="Latest Sermon" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">The Power of Faith</h3>
                <p className="text-gray-500 mb-3">John Smith • April 23, 2023</p>
                <p className="text-gray-700 mb-4">
                  Exploring how faith can transform our lives even in the most challenging circumstances. 
                  This sermon looks at examples from Scripture and provides practical applications for today.
                </p>
                <div className="flex space-x-3">
                  <Button className="bg-church-blue hover:bg-blue-500">
                    Watch
                  </Button>
                  <Button variant="outline" className="border-church-blue text-church-blue hover:bg-church-light-blue">
                    Download Audio
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Sermon Search and Filters */}
          <div className="mb-8 bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4">Find Sermons</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <Input
                  type="text"
                  placeholder="Search sermons..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div>
                <Select value={selectedSeries} onValueChange={setSelectedSeries}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Series" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Series</SelectItem>
                    {seriesList.map((series) => (
                      <SelectItem key={series} value={series}>{series}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Select value={selectedSpeaker} onValueChange={setSelectedSpeaker}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Speaker" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Speakers</SelectItem>
                    {speakersList.map((speaker) => (
                      <SelectItem key={speaker} value={speaker}>{speaker}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          {/* Sermon List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSermons.map((sermon) => (
              <SermonCard
                key={sermon.id}
                title={sermon.title}
                speaker={sermon.speaker}
                date={sermon.date}
                description={sermon.description}
                videoUrl={sermon.videoUrl}
                audioUrl={sermon.audioUrl}
              />
            ))}
          </div>
          
          {filteredSermons.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">No sermons found matching your criteria.</p>
            </div>
          )}
          
          <div className="mt-8 flex justify-center">
            <Button variant="outline" className="border-church-blue text-church-blue hover:bg-church-light-blue">
              Load More Sermons
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SermonsPage;
