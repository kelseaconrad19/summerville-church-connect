
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useAdmin } from "@/hooks/use-admin";
import { CalendarDays, BookOpen, Church, Users, File, FileText } from "lucide-react";

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

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Events</CardTitle>
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{eventStats?.total || 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{eventStats?.upcoming || 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Classes</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{classStats || 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sermons</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{sermonStats || 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ministries</CardTitle>
            <Church className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{ministryStats || 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Leadership</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{leadershipStats || 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userStats || 0}</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
