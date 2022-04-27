import * as React from 'react';
import { Typography, styled } from '@mui/material';
import Avatar from '@mui/material/Avatar';

import Darot from "app/assets/team-images/darot.jpeg";
import Panha from "app/assets/team-images/panha.jpeg";
import Thea from "app/assets/team-images/thea.jpeg";
import Vatanak from "app/assets/team-images/vatanak.jpeg";
import Sarak from "app/assets/team-images/vatanak.jpeg";


const StyleFooter = styled(`div`)(() => ({
  backgroundColor: "grey",
  textAlign: "center",
  alignItems: "center",
  justifyContent: "center",
  alignContent: "center",
  position: "fixed",
  bottom: 0,
  margin: "0px 0px 0px 00px",
  padding: "0px 30px 100px 0px",
  width: "100%"
}));

const AvatarStyle = {
  width: 48,
  height: 48,
  margin: "0px 4px",
  borderStyle: "solid",
  borderColor: "white"
}

const Footer = () => {
  return (
    <StyleFooter>
      <p>Our Team</p>

      <div style={{ display: "flex", alignSelf: "center", justifyContent: "center", }}>
        <Avatar sx={AvatarStyle} alt="Kok Sopanha" src={Panha} />
        <Avatar sx={AvatarStyle} alt="Chen Darot" src={Darot} />
        <Avatar sx={AvatarStyle} alt="Choem Thea" src={Thea} />
        <Avatar sx={AvatarStyle} alt="Chomrouen Vatanak" src={Vatanak} />
        <Avatar sx={AvatarStyle} alt="Kang Rotsarak" src={Sarak} />
      </div>
    </StyleFooter>
  );
};

export default Footer;