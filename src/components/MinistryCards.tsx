
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Ministry } from '@/lib/types/ministries';
import MinistryCard from './MinistryCard';
import { Skeleton } from './ui/skeleton';

const MinistryCards = () => {
  const [ministries, setMinistries] = useState<Ministry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMinistries = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('ministries')
          .select('*')
          .eq('is_published', true) // Only show published ministries
          .limit(3)
          .order('title', { ascending: true });
        
        if (error) {
          throw new Error(error.message);
        }
        
        setMinistries(data as Ministry[]);
      } catch (err) {
        console.error('Error fetching ministries:', err);
        setError('Failed to load ministries');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMinistries();
  }, []);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((index) => (
          <div key={index} className="border rounded-lg overflow-hidden">
            <Skeleton className="h-48 w-full" />
            <div className="p-6">
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-10 w-1/3 mt-4" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  if (ministries.length === 0) {
    return (
      <div className="text-center text-gray-500">
        No ministries found. Please add some ministries in the admin panel.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {ministries.map((ministry) => (
        <MinistryCard
          key={ministry.id}
          title={ministry.title}
          description={ministry.description}
          image={ministry.image_url || 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'}
          link={`/ministries#${ministry.title.toLowerCase().replace(/\s+/g, '-')}`}
        />
      ))}
    </div>
  );
};

export default MinistryCards;
