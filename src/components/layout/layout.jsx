import { Container } from "@mui/material";
import { Header } from "../header/header";
import { Home } from "../home/home";
import { useRef } from "react";
import { About } from "../about/about";
import { Services } from "../services/services";
import { Questions } from "../questions/questions";
import { Reviews } from "../reviews/reviews";
import { Contacts } from "../contacts/contacts";
import { Articles } from "../articles/articles";

export const Layout = () => {
  const ref = useRef(null);

  const handleSelectMenuItem = (index) => {
    if (ref.current) {
      ref.current.lastElementChild.children[index].scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const menuItems = [
    {
      title: "О нас",
      component: <About />,
    },
    {
      title: "Услуги",
      component: <Services />,
    },
    {
      title: "Частые вопросы",
      component: <Questions />,
    },
    {
      title: "Статьи и лайфхаки",
      component: <Articles />,
    },
    {
      title: "Отзывы",
      component: <Reviews />,
    },
    {
      title: "Контакты",
      component: <Contacts />,
    },
  ];

  return (
    <>
      <Header onSelectMenuItem={handleSelectMenuItem} menuItems={menuItems} />
      <Container maxWidth="xl" ref={ref}>
        <Home menuItems={menuItems} />
      </Container>
    </>
  );
};
