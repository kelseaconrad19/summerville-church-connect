
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";

export default function DashboardPage() {
  const { data: eventStats } = useQuery({
    queryKey: ['eventStats'],
    queryFn: async () => {
      const [totalEvents, upcomingEvents] = await Promise.all([
        supabase.from('events').select('*', { count: 'exact' }),
        supabase
          .from('events')
          .select('*', { count: 'exact' })
          .gte('date_start', new Date().toISOString())
      ]);

      return {
        total: totalEvents.count || 0,
        upcoming: upcomingEvents.count || 0,
      };
    },
  });

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
