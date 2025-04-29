
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useAdmin } from "@/hooks/use-admin";
import { CalendarDays, BookOpen, Church, Users, FileText } from "lucide-react";
import { Link } from "react-router-dom";

export default function DashboardPage() {
  const { isAdmin } = useAdmin();

  const { data: eventStats, isError: isEventError, error: eventError } = useQuery({
    queryKey: ['eventStats'],
    queryFn: async () => {
      try {
        const [totalEvents, upcomingEvents] = await Promise.all([
          supabase.from('events').select('*', { count: 'exact' }),
          supabase
            .from('events')
            .select('*', { count: 'exact' })
            .gte('date_start', new Date().toISOString())
        ]);

        if (totalEvents.error) {
          console.error("Error fetching total events:", totalEvents.error);
          throw totalEvents.error;
        }

        if (upcomingEvents.error) {
          console.error("Error fetching upcoming events:", upcomingEvents.error);
          throw upcomingEvents.error;
        }

        return {
          total: totalEvents.count || 0,
          upcoming: upcomingEvents.count || 0,
        };
      } catch (err) {
        console.error("Error in event stats query:", err);
        throw err;
      }
    },
    enabled: isAdmin,
  });

  const { data: classStats, isError: isClassError, error: classError } = useQuery({
    queryKey: ['classStats'],
    queryFn: async () => {
      try {
        const { count, error } = await supabase
          .from('classes')
          .select('*', { count: 'exact' });
          
        if (error) {
          console.error("Error fetching classes:", error);
          throw error;
        }
        
        return count || 0;
      } catch (err) {
        console.error("Error in class stats query:", err);
        throw err;
      }
    },
    enabled: isAdmin,
  });
  
  const { data: sermonStats, isError: isSermonError, error: sermonError } = useQuery({
    queryKey: ['sermonStats'],
    queryFn: async () => {
      try {
        const { count, error } = await supabase
          .from('sermons')
          .select('*', { count: 'exact' });
          
        if (error) {
          console.error("Error fetching sermons:", error);
          throw error;
        }
        
        return count || 0;
      } catch (err) {
        console.error("Error in sermon stats query:", err);
        throw err;
      }
    },
    enabled: isAdmin,
  });
  
  const { data: ministryStats, isError: isMinistryError, error: ministryError } = useQuery({
    queryKey: ['ministryStats'],
    queryFn: async () => {
      try {
        const { count, error } = await supabase
          .from('ministries')
          .select('*', { count: 'exact' });
          
        if (error) {
          console.error("Error fetching ministries:", error);
          throw error;
        }
        
        return count || 0;
      } catch (err) {
        console.error("Error in ministry stats query:", err);
        throw err;
      }
    },
    enabled: isAdmin,
  });
  
  const { data: userStats, isError: isUserError, error: userError } = useQuery({
    queryKey: ['userStats'],
    queryFn: async () => {
      try {
        const { count, error } = await supabase
          .from('profiles')
          .select('*', { count: 'exact' });
          
        if (error) {
          console.error("Error fetching users:", error);
          throw error;
        }
        
        return count || 0;
      } catch (err) {
        console.error("Error in user stats query:", err);
        throw err;
      }
    },
    enabled: isAdmin,
  });

  const { data: leadershipStats, isError: isLeadershipError, error: leadershipError } = useQuery({
    queryKey: ['leadershipStats'],
    queryFn: async () => {
      try {
        const { count, error } = await supabase
          .from('leadership')
          .select('*', { count: 'exact' });
          
        if (error) {
          console.error("Error fetching leadership:", error);
          throw error;
        }
        
        return count || 0;
      } catch (err) {
        console.error("Error in leadership stats query:", err);
        throw err;
      }
    },
    enabled: isAdmin,
  });

  if (isEventError || isClassError || isSermonError || isMinistryError || isUserError || isLeadershipError) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <div className="rounded-md bg-red-50 p-4">
          <p className="text-red-700">
            Error loading statistics: {String(eventError || classError || sermonError || ministryError || userError || leadershipError)}
          </p>
        </div>
      </div>
    );
  }

  // Create a reusable component for the stat cards
  const StatCard = ({ title, value, icon: Icon, href }: { 
    title: string;
    value: number;
    icon: React.ElementType;
    href: string;
  }) => (
    <Link to={href} className="block">
      <Card className="hover:shadow-md transition-shadow duration-200 cursor-pointer">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          <Icon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{value}</div>
        </CardContent>
      </Card>
    </Link>
  );

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <StatCard 
          title="Total Events" 
          value={eventStats?.total || 0} 
          icon={CalendarDays} 
          href="/admin/events" 
        />
        <StatCard 
          title="Upcoming Events" 
          value={eventStats?.upcoming || 0} 
          icon={CalendarDays} 
          href="/admin/events" 
        />
        <StatCard 
          title="Classes" 
          value={classStats || 0} 
          icon={BookOpen} 
          href="/admin/classes" 
        />
        <StatCard 
          title="Sermons" 
          value={sermonStats || 0} 
          icon={FileText} 
          href="/admin/sermons" 
        />
        <StatCard 
          title="Ministries" 
          value={ministryStats || 0} 
          icon={Church} 
          href="/admin/ministries" 
        />
        <StatCard 
          title="Leadership" 
          value={leadershipStats || 0} 
          icon={Users} 
          href="/admin/leadership" 
        />
        <StatCard 
          title="Users" 
          value={userStats || 0} 
          icon={Users} 
          href="/admin/users" 
        />
      </div>
    </div>
  );
}
