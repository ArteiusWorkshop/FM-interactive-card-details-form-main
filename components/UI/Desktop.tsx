import { Box, Typography, TextField, Button } from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import { useFormControls } from "../form";

const inputFieldValues = [
  {
    name: "name",
    label: "Cardholder Name",
    id: "my-name",
    maxL: 99,
    boxWidth: "100%",
    padding: "15px",
  },
  {
    name: "num",
    label: "Card Number",
    id: "my-num",
    maxL: 16,
    boxWidth: "100%",
    padding: "15px",
  },
  {
    name: "edM",
    label: "MM",
    id: "my-edM",
    maxL: 2,
    boxWidth: "90px",
    padding: "15px",
  },
  {
    name: "edY",
    label: "YY",
    id: "my-edY",
    maxL: 2,
    boxWidth: "90px",
    padding: "15px",
  },
  {
    name: "cvc",
    label: "CVC",
    id: "my-cvc",
    maxL: 3,
    boxWidth: "230px",
    padding: "15px",
  },
];

export const Desktop = () => {
  const { handleInputValue, handleFormSubmit, formIsValid, errors } =
    useFormControls();

  const [nam, setNam] = useState("JAMES APPLESEED");
  const [num, setNum] = useState("0000 0000 0000 0000");
  const [mon, setMon] = useState("00");
  const [yea, setYea] = useState("00");
  const [cvc, setCvc] = useState("000");
  const [flipped, setFlipped] = useState(false);

  const handleFlip = () => {
    setFlipped(!flipped);
    if (flipped) {
      window.location.reload();
    }
  };

  const styles = {
    cardFront: {
      height: 245,
      width: 447,
      color: "white",
      backgroundImage: "url(/img/bg-card-front.png)",
    },
    cardBack: {
      height: 245,
      width: 447,
      color: "white",
      backgroundImage: "url(/img/bg-card-back.png)",
    },
    button: {
      height: "60px",
      width: "500px",
      backgroundColor: "hsl(278, 68%, 11%)",
      color: "white",
      borderRadius: "10px",
    },
    disabled: {
      height: "60px",
      width: "500px",
      backgroundColor: "hsl(270, 3%, 87%)",
      color: "white",
      borderRadius: "10px",
    },
  };

  const handleState = (e: any) => {
    handleInputValue(e);
    switch (e.target.name) {
      case "name":
        var control = e.target.value.toUpperCase();
        setNam(control);
        if (e.target.value === "") setNam("JAMES APPLESEED");
        break;
      case "num":
        var control = e.target.value
          .replace(/[^\dA-Z]/g, "")
          .replace(/(.{4})/g, "$1 ")
          .trim();
        setNum(control);
        if (e.target.value === "") setNum("0000 0000 0000 0000");
        break;
      case "edM":
        setMon(e.target.value);
        if (e.target.value === "") setMon("00");
        break;
      case "edY":
        setYea(e.target.value);
        if (e.target.value === "") setYea("00");
        break;
      case "cvc":
        setCvc(e.target.value);
        if (e.target.value === "") setCvc("000");
        break;

      default:
        break;
    }
  };
  return (
    <Box display="flex">
      <Box width="50vw">
        <Box
          position="relative"
          style={styles.cardFront}
          marginBottom={5}
          sx={{ left: { lg: "40px", xl: "222px" } }}
        >
          <Box
            display="flex"
            flexDirection="column"
            position="absolute"
            width="85%"
            paddingLeft={3.5}
            paddingTop={2}
          >
            <Box alignSelf="start">
              <Image
                src="/img/card-logo.svg"
                width="84"
                height="47"
                alt="Card Logo"
              />
            </Box>
            <Box paddingTop={8}>
              <Typography variant="inherit" fontSize={34}>
                {num}
              </Typography>
            </Box>
            <Box display="flex" paddingTop={3} justifyContent="space-between">
              <Typography fontSize={15} variant="inherit">
                {nam}
              </Typography>
              <Typography fontSize={15} variant="inherit">
                {mon}/{yea}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box
          position="relative"
          style={styles.cardBack}
          marginLeft={10}
          sx={{ left: { lg: "40px", xl: "222px" } }}
        >
          <Box position="absolute" top={108} left={360}>
            <Typography variant="inherit">{cvc}</Typography>
          </Box>
        </Box>
      </Box>
      {flipped ? (
        <Box width="50vw">
          <Box
            display="flex"
            flexDirection="column"
            width="80%"
            sx={{ paddingTop: "70px" }}
          >
            <Box margin={6}>
              <Image
                src="/img/icon-complete.svg"
                width="80"
                height="80"
                alt="Thank You"
              />
              <Typography fontSize={50} variant="inherit">
                THANK YOU!
              </Typography>
              <Typography fontSize={30} variant="inherit" color="gray">
                We&apos;ve added your card details
              </Typography>
            </Box>

            <Box>
              <Button
                style={{
                  height: "60px",
                  width: "500px",
                  backgroundColor: "hsl(278, 68%, 11%)",
                  color: "white",
                  borderRadius: "10px",
                }}
                onClick={handleFlip}
              >
                Continue
              </Button>
            </Box>
          </Box>
        </Box>
      ) : (
        <Box width="50vw">
          <Box
            display="flex"
            flexDirection="column"
            width="80%"
            sx={{ paddingTop: "70px" }}
          >
            <form autoComplete="off" onSubmit={handleFormSubmit}>
              {inputFieldValues.map((inputFieldValue, index) => {
                return (
                  <TextField
                    inputProps={{
                      maxLength: inputFieldValue.maxL,
                    }}
                    key={index}
                    onChange={(e) => {
                      handleState(e);
                    }}
                    onBlur={(e) => {
                      handleState(e);
                    }}
                    style={{
                      width: inputFieldValue.boxWidth,
                      margin: inputFieldValue.padding,
                    }}
                    sx={{ marginRight: inputFieldValue.padding }}
                    name={inputFieldValue.name}
                    label={inputFieldValue.label}
                    error={errors[inputFieldValue.name]}
                    autoComplete="none"
                    {...(errors[inputFieldValue.name] && {
                      error: true,
                      helperText: errors[inputFieldValue.name],
                    })}
                  />
                );
              })}
            </form>

            <Box>
              <Button
                disabled={!formIsValid()}
                style={!formIsValid() ? styles.disabled : styles.button}
                onClick={handleFlip}
              >
                Confirm
              </Button>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};
