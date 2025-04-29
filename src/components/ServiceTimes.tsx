
import { Card, CardContent } from "@/components/ui/card";

const ServiceTimes = () => {
  return (
    <Card className="shadow-md bg-white border-2 border-church-light-blue overflow-hidden">
      <CardContent className="p-6">
        <h3 className="text-xl font-bold mb-4 text-center">Service Times</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="font-medium">Sunday Morning Bible Study</span>
            <span>9:00 AM</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-medium">Sunday Worship</span>
            <span>10:00 AM</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-medium">Life Groups</span>
            <span>Various Times Throughout the Week</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-medium">Wednesday Night Classes</span>
            <span>7:00 PM</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceTimes;
