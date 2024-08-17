import { useForm } from "@mantine/form";
import React from "react";
import useCountries from "../../hooks/useCountries";
import { Button, Group, Select, TextInput } from "@mantine/core";
import Map from "../Map/Map";

const AddLocation = ({ propertyDetails, setPropertyDetails, nextStep }) => {
  const { getAll } = useCountries();
  const form = useForm({
    initialValues: {
      country: propertyDetails?.country || '',
      city: propertyDetails?.city || '',
      address: propertyDetails?.address || '',
    },
    validate: {
      country: (value) =>
        value.length < 5 ? "Country name must have at least 5 letters" : null,
      city: (value) =>
        value.length < 5 ? "City name must have at least 5 letters" : null,
      address: (value) =>
        value.length < 5 ? "Address must have at least 5 letters" : null,
    },
  });

  const { country, city, address } = form.values;

  const handleSubmit = () => {
    const { hasErrors } = form.validate();
    if (!hasErrors) {
      setPropertyDetails((prev) => ({
        ...prev,
        country,
        city,
        address,
      }));
      nextStep();
    }
  };

  return (
    <form 
      onSubmit={(event) => {
        event.preventDefault();
        handleSubmit();
      }}
    >
      <div 
        className="flexCenter"
        style={{
          marginTop: "3rem",
          gap: "3rem",
          justifyContent: "space-between",
          flexDirection: "row",
        }}
      >
        <div className="flexColStart" style={{ flex: 1, gap: "1rem" }}>
          <Select
            w={"100%"}
            data={getAll()}
            withAsterisk
            label="Country"
            searchable
            {...form.getInputProps("country")}
          />
          <TextInput
            w={"100%"}
            withAsterisk
            label="City"
            {...form.getInputProps("city")}
          />
          <TextInput
            w={"100%"}
            withAsterisk
            label="Address"
            {...form.getInputProps("address")}
          />
        </div>
        <div style={{ flex: 1 }}>
          <Map address={address} country={country} city={city} />
        </div>
      </div>
      <Group justify="center" mt="xl">
        <Button type="submit">Next step</Button>
      </Group>
    </form>
  );
};

export default AddLocation;
