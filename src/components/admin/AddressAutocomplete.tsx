import React, { useEffect, useRef, useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Address {
  address1: string;
  address2?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
}

interface AddressAutocompleteProps {
  value: Address;
  onChange: (value: Address) => void;
}

const AddressAutocomplete = ({ value, onChange }: AddressAutocompleteProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  useEffect(() => {
    if (!inputRef.current) return;
  
    const options = {
      componentRestrictions: { country: "us" },
      fields: ["address_components", "formatted_address", "geometry", "name"],
      types: ["address"],
    };
  
    // Initialize Google Places Autocomplete with address-only type
    autocompleteRef.current = new google.maps.places.Autocomplete(
      inputRef.current,
      options
    );
  
    // Listen for address selection and fill form fields
    autocompleteRef.current.addListener("place_changed", () => {
      const place = autocompleteRef.current?.getPlace();
    
      if (!place || !place.address_components || place.address_components.length === 0) {
        return; // Do nothing if no valid place
      }
    
      let address1 = "";
      let city = "";
      let state = "";
      let postalCode = "";
      let country = "";
    
      for (const component of place.address_components) {
        const componentType = component.types[0];
    
        switch (componentType) {
          case "street_number":
            address1 = `${component.long_name} ${address1}`;
            break;
          case "route":
            address1 += component.short_name;
            break;
          case "locality":
            city = component.long_name;
            break;
          case "administrative_area_level_1":
            state = component.short_name;
            break;
          case "postal_code":
            postalCode = component.long_name;
            break;
          case "postal_code_suffix":
            postalCode += `-${component.long_name}`;
            break;
          case "country":
            country = component.long_name;
            break;
        }
      }
    
      onChange({
        address1,
        address2: value.address2, // Keep whatever user entered manually
        city,
        state,
        postalCode,
        country,
      });
    
      // Optional polish: focus apartment/suite field
      document.getElementById("address2")?.focus();
    });
  
    return () => {
      if (autocompleteRef.current) {
        google.maps.event.clearInstanceListeners(autocompleteRef.current);
        autocompleteRef.current = null;
      }
    };
  }, [onChange, value.address2]);

  return (
    <div className="space-y-2">
      <Label htmlFor="address1">Street Address</Label>
      <Input
        ref={inputRef}
        type="text"
        id="address1"
        value={value.address1}
        onChange={(e) => onChange({ ...value, address1: e.target.value })}
        placeholder="Enter street address"
      />

      <Label htmlFor="address2">Apt, Suite, etc.</Label>
      <Input
        type="text"
        id="address2"
        value={value.address2 || ""}
        onChange={(e) => onChange({ ...value, address2: e.target.value })}
        placeholder="Enter apartment, suite, etc."
      />

      <Label htmlFor="city">City</Label>
      <Input
        type="text"
        id="city"
        value={value.city || ""}
        onChange={(e) => onChange({ ...value, city: e.target.value })}
        placeholder="City"
      />

      <Label htmlFor="state">State</Label>
      <Input
        type="text"
        id="state"
        value={value.state || ""}
        onChange={(e) => onChange({ ...value, state: e.target.value })}
        placeholder="State"
      />

      <Label htmlFor="postalCode">Postal Code</Label>
      <Input
        type="text"
        id="postalCode"
        value={value.postalCode || ""}
        onChange={(e) => onChange({ ...value, postalCode: e.target.value })}
        placeholder="Postal Code"
      />

      <Label htmlFor="country">Country</Label>
      <Input
        type="text"
        id="country"
        value={value.country || ""}
        onChange={(e) => onChange({ ...value, country: e.target.value })}
        placeholder="Country"
      />
    </div>
  );
};


export default AddressAutocomplete;
