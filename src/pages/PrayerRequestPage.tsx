
import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";

const PrayerRequestPage = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    prayerType: "personal",
    requestDetails: "",
    isUrgent: false,
    isConfidential: false,
    shareWithChurch: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleRadioChange = (value: string) => {
    setFormData((prev) => ({ ...prev, prayerType: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Prayer Request Submitted",
        description: "Thank you for sharing your prayer request. Our prayer team will be praying for you.",
      });
      setIsSubmitting(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        prayerType: "personal",
        requestDetails: "",
        isUrgent: false,
        isConfidential: false,
        shareWithChurch: false
      });
    }, 1500);
  };

  return (
    <div>
      <PageHeader 
        title="Prayer Requests"
        description="Share your prayer needs with our church family"
      />
      
      <section className="section-padding bg-white">
        <div className="page-container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-6">Submit a Prayer Request</h2>
                  
                  <form onSubmit={handleSubmit}>
                    <div className="space-y-6">
                      {/* Contact Information */}
                      <div>
                        <h3 className="text-lg font-semibold mb-3">Your Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input 
                              id="name" 
                              name="name" 
                              value={formData.name} 
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input 
                              id="email" 
                              name="email" 
                              type="email" 
                              value={formData.email} 
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                          <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="phone">Phone (optional)</Label>
                            <Input 
                              id="phone" 
                              name="phone" 
                              value={formData.phone} 
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                      </div>
                      
                      {/* Prayer Request Type */}
                      <div>
                        <h3 className="text-lg font-semibold mb-3">Prayer Request Type</h3>
                        <RadioGroup 
                          value={formData.prayerType} 
                          onValueChange={handleRadioChange}
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="personal" id="personal" />
                            <Label htmlFor="personal">Personal Request</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="family" id="family" />
                            <Label htmlFor="family">Family Member</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="friend" id="friend" />
                            <Label htmlFor="friend">Friend or Acquaintance</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="other" id="other" />
                            <Label htmlFor="other">Other</Label>
                          </div>
                        </RadioGroup>
                      </div>
                      
                      {/* Prayer Request Details */}
                      <div>
                        <h3 className="text-lg font-semibold mb-3">Prayer Request Details</h3>
                        <div className="space-y-2">
                          <Label htmlFor="requestDetails">
                            Please share details about your prayer request
                          </Label>
                          <Textarea 
                            id="requestDetails" 
                            name="requestDetails" 
                            value={formData.requestDetails} 
                            onChange={handleInputChange}
                            rows={5}
                            required
                          />
                        </div>
                      </div>
                      
                      {/* Options */}
                      <div>
                        <h3 className="text-lg font-semibold mb-3">Additional Options</h3>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <Label htmlFor="isUrgent" className="text-base">This is an urgent request</Label>
                              <p className="text-sm text-gray-500">Urgent requests will be shared with our prayer team immediately</p>
                            </div>
                            <Switch 
                              id="isUrgent"
                              checked={formData.isUrgent}
                              onCheckedChange={(checked) => handleSwitchChange("isUrgent", checked)}
                            />
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div>
                              <Label htmlFor="isConfidential" className="text-base">Keep this request confidential</Label>
                              <p className="text-sm text-gray-500">Only the pastoral staff and prayer team leaders will see this request</p>
                            </div>
                            <Switch 
                              id="isConfidential"
                              checked={formData.isConfidential}
                              onCheckedChange={(checked) => handleSwitchChange("isConfidential", checked)}
                            />
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div>
                              <Label htmlFor="shareWithChurch" className="text-base">Share with the church</Label>
                              <p className="text-sm text-gray-500">Include this request in our weekly prayer list (no email/phone shared)</p>
                            </div>
                            <Switch 
                              id="shareWithChurch"
                              checked={formData.shareWithChurch}
                              onCheckedChange={(checked) => handleSwitchChange("shareWithChurch", checked)}
                              disabled={formData.isConfidential}
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <Button 
                          type="submit" 
                          className="w-full md:w-auto bg-church-blue hover:bg-blue-500"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? "Submitting..." : "Submit Prayer Request"}
                        </Button>
                      </div>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
            
            <div>
              <div className="sticky top-24 space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-4">About Our Prayer Ministry</h3>
                    <p className="text-gray-700 mb-4">
                      Our prayer team is committed to lifting up your requests to God. We believe in the power 
                      of prayer and take each request seriously.
                    </p>
                    <p className="text-gray-700">
                      If you mark a request as confidential, it will only be shared with our pastoral staff 
                      and prayer team leaders. Otherwise, requests may be included in our weekly prayer list 
                      distributed to the congregation, unless you opt out.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-4">Prayer Resources</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-church-blue mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>Weekly Prayer Meeting: Wednesdays at 6:30 PM</span>
                      </li>
                      <li className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-church-blue mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>Prayer Room: Open during office hours</span>
                      </li>
                      <li className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-church-blue mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>Prayer Chain: Call (555) 123-4567</span>
                      </li>
                    </ul>
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <h4 className="font-bold mb-2">Join Our Prayer Team</h4>
                      <p className="text-sm text-gray-700 mb-3">
                        If you have a heart for prayer and would like to join our prayer team, 
                        please contact our prayer coordinator.
                      </p>
                      <Button variant="outline" className="w-full border-church-blue text-church-blue hover:bg-church-light-blue">
                        Contact Prayer Coordinator
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrayerRequestPage;
