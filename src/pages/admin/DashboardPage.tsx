
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useAdmin } from "@/hooks/use-admin";

export default function DashboardPage() {
  const { isAdmin } = useAdmin();

  const { data: eventStats, isError, error } = useQuery({
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

  if (isError) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <div className="rounded-md bg-red-50 p-4">
          <p className="text-red-700">Error loading event statistics: {String(error)}</p>
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
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{eventStats?.total || 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{eventStats?.upcoming || 0}</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
