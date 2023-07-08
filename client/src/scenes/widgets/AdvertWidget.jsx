import { Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useEffect, useState } from "react";

const AdvertWidget = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;
  const customSponsor = {
    img: "http://localhost:3001/assets/customSponsored.jpg",
    createdAt: Date.now() + 8000,
    lifeSpan: 8000,
    title: "Yum's Patties",
    site: "yumpat.com",
    desc: "Hungry? Grab a Yum. Order on the Website and Get 50% Off!",
  };

  const [images, setImages] = useState([
    {
      img: "http://localhost:3001/assets/sponsored.jpg",
      createdAt: Date.now(),
      lifeSpan: 8000,
      title: "MusicHub",
      site: "musichub.com",
      desc: "Listen to all your faviourite without any ad breaks only on Music Hub.",
    },
    {
      img: "http://localhost:3001/assets/sponsored2.jpg",
      createdAt: Date.now() + 8000,
      lifeSpan: 8000,
      title: "Juicy Little",
      site: "juicylittle.com",
      desc: "Thirsty?? Grab a jLittle. Hurry!! Order Now!",
    },
  ]);
  const [currImg, setCurrImg] = useState(images[0]);

  useEffect(() => {
    if (images.length > 0) {
      const interval = setInterval(() => {
        if (images.length > 0) {
          images.forEach((item) => {
            if (Date.now() - item.lifeSpan > item.createdAt) {
              var currImages = [...images];
              currImages.shift();
              setImages(currImages);
              if (currImages.length > 0) {
                setCurrImg(currImages[0]);
              } else {
                setCurrImg(customSponsor);
              }
            }
          });
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [images]);

  return (
    <WidgetWrapper>
      <FlexBetween>
        <Typography color={dark} variant="h5" fontWeight="500">
          Sponsored
        </Typography>
        <Typography
          color={medium}
          sx={{ "&:hover": { cursor: "pointer", color: "grey" } }}
        >
          Create Ad
        </Typography>
      </FlexBetween>
      {currImg && (
        <img
          width="100%"
          height="auto"
          alt="advert"
          src={currImg.img}
          style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
        />
      )}
      {currImg && (
        <FlexBetween>
          <Typography color={main}>{currImg.title}</Typography>
          <Typography
            color={medium}
            sx={{ "&:hover": { cursor: "pointer", color: "grey" } }}
          >
            {currImg.site}
          </Typography>
        </FlexBetween>
      )}
      {currImg && (
        <Typography color={medium} m="0.5rem 0">
          {currImg.desc}
        </Typography>
      )}
    </WidgetWrapper>
  );
};

export default AdvertWidget;
