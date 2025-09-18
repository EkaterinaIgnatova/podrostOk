import { Box, IconButton, useMediaQuery } from "@mui/material";
import { VkIcon } from "../../assets/icon_vk.jsx";
import { TgIcon } from "../../assets/icon_tg.jsx";
import { WhatsupIcon } from "../../assets/icon_whatsup.jsx";

export const Contacts = () => {
  const matches = useMediaQuery((theme) => theme.breakpoints.up("sm"));

  const socialMedia = [
    { icon: <VkIcon />, link: "https://vk.com/podrostok_syktyvkar" },
    { icon: <TgIcon />, link: "https://t.me/Ignatova_NVI" },
    { icon: <WhatsupIcon />, link: "https://wa.me/79129649309" },
  ];

  return (
    <>
      <Box sx={{ height: matches ? "400px" : "200px" }}>
        <iframe
          src="https://yandex.ru/map-widget/v1/?ll=50.808677%2C61.681945&mode=search&ol=geo&ouri=ymapsbm1%3A%2F%2Fgeo%3Fdata%3DCgg1NzU2OTExORJe0KDQvtGB0YHQuNGPLCDQoNC10YHQv9GD0LHQu9C40LrQsCDQmtC-0LzQuCwg0KHRi9C60YLRi9Cy0LrQsNGALCDRg9C70LjRhtCwINCT0YDQvtC80L7QstCwLCA3NSIKDRY8S0IVT7p2Qg%2C%2C&z=16.32"
          style={{
            borderRadius: "4px",
            borderWidth: "0",
            width: "100%",
            height: "100%",
          }}
        ></iframe>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: matches ? "row" : "column",
          justifyContent: "space-between",
          gap: "8px",
          fontWeight: "600",
          marginTop: "8px",
        }}
      >
        <span>г. Сыктывкар, ул. Громова, д. 75</span>
        <div>
          <span>+7(912)964-93-03</span>
          <Box sx={{ display: "flex", justifyContent: "end" }}>
            {socialMedia.map(({ icon, link }) => (
              <IconButton sx={{ padding: "8px 4px" }} href={link}>
                {icon}
              </IconButton>
            ))}
          </Box>
        </div>
      </Box>
    </>
  );
};
