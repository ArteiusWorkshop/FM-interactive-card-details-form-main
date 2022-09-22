import { Box, Button, TextField, Typography } from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import { useFormControls } from "../form";

const inputFieldValues = [
  {
    name: "name",
    label: "Cardholder Name",
    id: "my-name",
    maxL: 99,
    boxWidth: "90%",
    padding: "15px",
  },
  {
    name: "num",
    label: "Card Number",
    id: "my-num",
    maxL: 16,
    boxWidth: "90%",
    padding: "15px",
  },
  {
    name: "edM",
    label: "MM",
    id: "my-edM",
    maxL: 2,
    boxWidth: "90px",
  },
  {
    name: "edY",
    label: "YY",
    id: "my-edY",
    maxL: 2,
    boxWidth: "90px",
    paddingL: "15px",
  },
  {
    name: "cvc",
    label: "CVC",
    id: "my-cvc",
    maxL: 3,
    boxWidth: "100px",
    paddingL: "15px",
  },
];

export const Mobile = () => {
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
      height: 220,
      width: 330,
      color: "white",
      top: "-83px",
      left: 10,
      backgroundImage: "url(/img/bg-card-front.png)",
      backgroundSize: "contain",
      backgroundRepeat: "no-repeat",
    },
    cardBack: {
      height: 220,
      width: 330,
      color: "white",
      top: 34,
      left: 80,
      backgroundImage: "url(/img/bg-card-back.png)",
      backgroundSize: "contain",
      backgroundRepeat: "no-repeat",
    },
    button: {
      height: "60px",
      width: "90vw",
      backgroundColor: "hsl(278, 68%, 11%)",
      color: "white",
      borderRadius: "10px",
      marginTop: "20px",
    },
    disabled: {
      height: "60px",
      width: "90vw",
      backgroundColor: "hsl(270, 3%, 87%)",
      color: "white",
      borderRadius: "10px",
      marginTop: "20px",
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
    <Box>
      <Box width="100vw">
        <Box position="relative" style={styles.cardBack}>
          <Box position="absolute" top={77} left={260}>
            <Typography variant="inherit">{cvc}</Typography>
          </Box>
        </Box>
        <Box position="relative" style={styles.cardFront}>
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
                width="60"
                height="33"
                alt="Card Logo"
              />
            </Box>
            <Box paddingTop={4}>
              <Typography variant="inherit" fontSize={25}>
                {num}
              </Typography>
            </Box>
            <Box display="flex" paddingTop={4} justifyContent="space-between">
              <Typography fontSize={13} variant="inherit">
                {nam}
              </Typography>
              <Typography fontSize={13} variant="inherit">
                {mon}/{yea}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      {flipped ? (
        <Box width="100vw">
          <Box
            display="flex"
            flexDirection="column"
            width="100%"
            alignItems="center"
          >
            <Box margin={6}>
              <Image
                src="/img/icon-complete.svg"
                width="80"
                height="80"
                alt="Thank you"
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
                  width: "90vw",
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
        <Box width="100vw">
          <Box display="flex" flexDirection="column" width="100%">
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
                      marginLeft: inputFieldValue.paddingL,
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
