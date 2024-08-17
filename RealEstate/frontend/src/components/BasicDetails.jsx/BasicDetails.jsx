import React from "react";
import { TextInput, Box, Textarea, Group, Button, NumberInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import useProperties from "../../hooks/useProperties";
import { toast } from "react-toastify";
import { useMutation } from "react-query";
import { createResidency } from "../../utils/api";
import { useAuth0 } from "@auth0/auth0-react";

const BasicDetails = ({ prevStep, propertyDetails, setPropertyDetails, setActive, setModalOpened }) => {
  const form = useForm({
    initialValues: {
      title: propertyDetails.title,
      description: propertyDetails.description,
      price: propertyDetails.price,
      bedrooms: propertyDetails.facilities.bedrooms,
      bathrooms: propertyDetails.facilities.bathrooms,
      parking: propertyDetails.facilities.parking,
      area: propertyDetails.facilities.area, // Add initial value for area
    },
    validate: {
      title: (value) => (value.length < 5 ? "Title must have at least 5 letters" : null),
      description: (value) => (value.length < 10 ? "Description must have at least 10 letters" : null),
      price: (value) => (value < 1000 ? "Price must be greater than 999" : null),
      bedrooms: (value) => (value <= 0 ? "Bedrooms must be greater than 0" : null),
      bathrooms: (value) => (value <= 0 ? "Bathrooms must be greater than 0" : null),
      parking: (value) => (value <= 0 ? "Parking must be greater than 0" : null),
      area: (value) => (value <= 100 ? "Area must be greater than 100 square feet" : null), // Add validation for area
    },
  });

  const { title, description, price, bedrooms, parking, bathrooms, area } = form.values;
  const { user } = useAuth0();

  const { refetch: refetchProperties } = useProperties();

  const { mutate, isLoading } = useMutation({
    mutationFn: (updatedDetails) => createResidency({ propertyDetails: updatedDetails }),
    onSuccess: () => {
      toast.success("Property added successfully", { position: "bottom-right" });
      setPropertyDetails({
        title: "",
        description: "",
        price: 0,
        country: "",
        city: "",
        address: "",
        image: null,
        facilities: {
          bedrooms: 0,
          parking: 0,
          bathrooms: 0,
          area: 0, // Reset area
        },
        userEmail: user?.email,
      });
      setActive(0);
      setModalOpened(false);
      refetchProperties();
    },
    onError: ({ response }) => {
      toast.error(response.data.message, { position: "bottom-right" });
    },
  });

  const handleSubmit = () => {
    const { hasErrors } = form.validate();
    if (!hasErrors) {
      setPropertyDetails((prev) => {
        const updatedDetails = {
          ...prev,
          title,
          description,
          price,
          facilities: { bedrooms, parking, bathrooms, area }, // Include area
          userEmail: user.email,
        };
        mutate(updatedDetails);  // Pass the updated details to the mutation
        return updatedDetails;  // Update the state with the new details
      });
    }
  };

  return (
    <Box maw="70%" mx="auto" my="md">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <TextInput
          withAsterisk
          label="Title"
          placeholder="Property Name"
          {...form.getInputProps("title")}
        />
        <Textarea
          placeholder="Description"
          label="Description"
          withAsterisk
          {...form.getInputProps("description")}
        />
        <NumberInput
          withAsterisk
          label="Price"
          placeholder="1000"
          min={0}
          {...form.getInputProps("price")}
        />
        <NumberInput
          withAsterisk
          label="No of Bedrooms"
          min={0}
          {...form.getInputProps("bedrooms")}
        />
        <NumberInput
          label="No of Parkings"
          min={0}
          {...form.getInputProps("parking")}
        />
        <NumberInput
          withAsterisk
          label="No of Bathrooms"
          min={0}
          {...form.getInputProps("bathrooms")}
        />
        <NumberInput
          withAsterisk
          label="Area (Square Feet)"
          min={0}
          placeholder="e.g., 1200"
          {...form.getInputProps("area")}
        />
        <Group position="center" mt="xl">
          <Button variant="default" onClick={prevStep}>
            Back
          </Button>
          <Button type="submit" color="green" disabled={isLoading}>
            {isLoading ? "Submitting" : "Add Property"}
          </Button>
        </Group>
      </form>
    </Box>
  );
};

export default BasicDetails;
