import AButton from "./AButton.vue";
(AButton as any).install = (app: any) => {
  app.component(AButton.name, AButton);
};

export default AButton;
