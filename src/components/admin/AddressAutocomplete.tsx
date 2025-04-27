
import React, { useEffect, useRef, useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AddressAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
}

const AddressAutocomplete = ({ value, onChange }: AddressAutocompleteProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);

  useEffect(() => {
    if (!inputRef.current) return;

    const options = {
      componentRestrictions: { country: "us" },
      fields: ["formatted_address", "geometry", "name"],
    };

    const autocompleteInstance = new google.maps.places.Autocomplete(
      inputRef.current,
      options
    );

    autocompleteInstance.addListener("place_changed", () => {
      const place = autocompleteInstance.getPlace();
      if (place.formatted_address) {
        onChange(place.formatted_address);
      }
    });

    setAutocomplete(autocompleteInstance);

    return () => {
      if (autocomplete) {
        google.maps.event.clearInstanceListeners(autocomplete);
      }
    };
  }, [onChange]);

  return (
    <div className="space-y-2">
      <Label htmlFor="location">Location</Label>
      <Input
        ref={inputRef}
        type="text"
        id="location"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter location"
      />
    </div>
  );
};

export default AddressAutocomplete;
