import React from "react";
import { Container, Modal,Stepper, Button, Group } from "@mantine/core";
import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import AddLocation from "../Addlocation/AddLocation";
import UploadImage from "../UploadImage/UploadImage";
import BasicDetails from "../BasicDetails.jsx/BasicDetails";
const AddModalProperty = ({ modalOpened, setModalOpened }) => {
  const [active, setActive] = useState(0);
  const { user } = useAuth0();

  const [propertyDetails, setPropertyDetails] = useState({
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
      area:0
    },
    userEmail: user?.email,
  });
  const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

  return (
    <Modal
      opened={modalOpened}
      onClose={() => setModalOpened(false)}
      closeOnClickOutside
      size={"90rem"}
      centered
    >
      <Container h={"40rem"} w={"100%"}>
        <Stepper
          active={active}
          onStepClick={setActive}
          allowNextStepsSelect={false}
        >
          <Stepper.Step label="Location" description="Location Info">
            <AddLocation
            propertyDetails={propertyDetails}
            setPropertyDetails={setPropertyDetails}
            nextStep={nextStep}
            />
          </Stepper.Step>
          <Stepper.Step label=" Image" description="Upload Image">
           <UploadImage
           propertyDetails={propertyDetails}
           setPropertyDetails={setPropertyDetails}
           prevStep={prevStep}
           nextStep={nextStep}
           />
          </Stepper.Step>
          <Stepper.Step label="Details" description="Property Details">
            <BasicDetails
              propertyDetails={propertyDetails}
              setPropertyDetails={setPropertyDetails}
              prevStep={prevStep}
              setActive={setActive}
              setModalOpened={setModalOpened}
            />
          </Stepper.Step>
          <Stepper.Completed>
            Completed, click back button to get to previous step
          </Stepper.Completed>
        </Stepper>
       
      </Container>
    </Modal>
  );
};

export default AddModalProperty;
