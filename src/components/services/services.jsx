import { Box, Button } from "@mui/material";
import { useState } from "react";
import worriedGirl from "../../assets/worried_girl.svg";
import cryingGirl from "../../assets/crying_girl.svg";
import girlAndBoy from "../../assets/girl_and_boy.svg";
import manAndGirl from "../../assets/man_and_girl.svg";
import womanAndBoy from "../../assets/woman_and_boy.svg";
import supervision from "../../assets/supervision.svg";
import { ServiceDialog } from "../service-dialog/service-dialog";

export const Services = () => {
  const [selectedService, setSelectedService] = useState(null);

  const handleSelectService = (service) => {
    setSelectedService(service);
  };

  const handleCloseDialog = () => {
    setSelectedService(null);
  };

  const services = [
    {
      title: "Индивидуальные консультации детей и подростков",
      description:
        "На консультациях рассматриваются вопросы самооценки, стресса, тревожности, отношений, личностного роста, учебно-познавательной мотивации, улучшения психоэмоционального состояния, профориентации и другие.",
      img: worriedGirl,
    },
    {
      title: "Индивидуальные и семейные консультации родителей",
      description:
        "На консультациях рассматриваются вопросы детско-родительских отношений, помощь в разрешении конфликтных ситуаций, улучшении коммуникации и укреплении семейных связей.",
      img: manAndGirl,
    },
    {
      title: "Групповые занятия для подростков",
      description:
        "Занятия представляют собой социально-психологические тренинги по развитию навыков саморегуляции и управления эмоциями, по развитию коммуникативных навыков.",
      img: girlAndBoy,
    },
    {
      title: "Групповые занятия для родителей",
      description:
        "Занятия для родителей нацелены на обучение методам поддержки подростков, пониманию их потребностей и особенностей.",
      img: womanAndBoy,
    },
    {
      title: "Кризисное консультирование для детей и взрослых",
      description:
        "Оказание психологической помощи при переживании кризисных ситуаций (насилие, конфликты, потери, в том числе утрата близкого человека, другие травматические ситуации, суицидальные мысли).",
      img: cryingGirl,
    },
    {
      title: "Групповые и индивидуальные супервизии для психологов",
      description:
        "На супервизорских сессиях психологи-консультанты, педагоги-психологи могут увидеть сильные и слабые стороны в своей работе, понять природу возникающих профессиональных трудностей, выработать профессиональную позицию, осознать и отреагировать негативные эмоции. Работа проводится индивидуально с супервизором либо в группе профессиональной взаимопомощи (интервизия). Супервизорская поддержка способствует снижению риска эмоционального выгорания и профессиональной деформации у специалистов помогающих профессий.",
      img: supervision,
    },
  ];

  if (!services.length) {
    return (
      <p style={{ textAlign: "center", opacity: "0.7" }}>Список услуг пуст.</p>
    );
  }

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {services.map((item) => (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: { xs: "column", sm: "row" },
              gap: "8px",
              alignItems: "center",
              padding: "8px 16px",
              boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.2)",
            }}
          >
            <span style={{ textTransform: "uppercase" }}>{item.title}</span>
            <Button
              onClick={() => handleSelectService(item)}
              variant="contained"
              sx={{ width: { xs: "100%", sm: "auto" }, flexShrink: "0" }}
            >
              Подробнее
            </Button>
          </Box>
        ))}
      </Box>
      <ServiceDialog
        selectedService={selectedService}
        onCloseDialog={handleCloseDialog}
      />
    </>
  );
};
