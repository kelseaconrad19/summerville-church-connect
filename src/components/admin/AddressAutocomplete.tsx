import React from "react";
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

function AddressAutocomplete({ value, onChange }: AddressAutocompleteProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="location-address">Street Address*</Label>
      <Input
        id="location-address"
        value={value.address1}
        onChange={(e) => onChange({ ...value, address1: e.target.value })}
        required
        autoComplete="off"
        placeholder="Enter street address"
      />

      <Label htmlFor="address2">Apartment, unit, suite, or floor #</Label>
      <Input
        id="address2"
        value={value.address2 || ""}
        onChange={(e) => onChange({ ...value, address2: e.target.value })}
        placeholder="Apartment, Unit, Suite"
      />

      <Label htmlFor="city">City*</Label>
      <Input
        id="city"
        value={value.city || ""}
        onChange={(e) => onChange({ ...value, city: e.target.value })}
        required
        placeholder="City"
      />

      <div className="flex space-x-4">
        <div className="flex-1">
          <Label htmlFor="state">State/Province*</Label>
          <Input
            id="state"
            value={value.state || ""}
            onChange={(e) => onChange({ ...value, state: e.target.value })}
            required
            placeholder="State"
          />
        </div>
        <div className="flex-1">
          <Label htmlFor="postalCode">Postal Code*</Label>
          <Input
            id="postalCode"
            value={value.postalCode || ""}
            onChange={(e) => onChange({ ...value, postalCode: e.target.value })}
            required
            placeholder="Postal Code"
          />
        </div>
      </div>

      <Label htmlFor="country">Country/Region*</Label>
      <Input
        id="country"
        value={value.country || ""}
        onChange={(e) => onChange({ ...value, country: e.target.value })}
        required
        placeholder="Country"
      />
    </div>
  );
}

export default AddressAutocomplete;