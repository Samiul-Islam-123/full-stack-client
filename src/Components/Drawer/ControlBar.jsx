import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import EqualizerIcon from '@mui/icons-material/Equalizer';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import SmartDisplayIcon from '@mui/icons-material/SmartDisplay';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import StorefrontIcon from '@mui/icons-material/Storefront';
import { useNavigate } from "react-router-dom";

export default function ControlBar({ children }) {
  const navigate = useNavigate();

  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <Typography variant="h6" align="center" margin={2}>
          Control Bar
        </Typography>
        <Divider color="white" />

        <ListItem disablePadding>
          <ListItemButton
            onClick={() => {
              navigate("/apps/dashboard");
            }}
          >
            <ListItemText primary={"Dashboard"} style={{ textAlign: 'center' }}/>
            <ListItemIcon>
                <EqualizerIcon />
            </ListItemIcon>
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton
            onClick={() => {
              navigate("/apps/marketplace");
            }}
          >
            <ListItemText primary={"SkillSync"} secondary={"Freelance Marketplace"} style={{ textAlign: 'center' }}/>
            <ListItemIcon>
                <StorefrontIcon />
            </ListItemIcon>
          </ListItemButton>
        </ListItem>


        <ListItem disablePadding>
          <ListItemButton
            onClick={() => {
              navigate("/apps/video-call");
            }}
          >
            <ListItemText primary={"EchoTalk"} secondary={"Video Call Service"} style={{ textAlign: 'center' }}/>
            <ListItemIcon>
                <VideoCallIcon />
            </ListItemIcon>
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton
            onClick={() => {
              navigate("/apps/video-stream");
            }}
          >
            <ListItemText primary={"StreamSphere"} secondary={"Video Streaming Service"} style={{ textAlign: 'center' }}/>
            <ListItemIcon>
                <SmartDisplayIcon />
            </ListItemIcon>
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton
            onClick={() => {
              navigate("/apps/project-management/my-teams");
            }}
          >
            <ListItemText primary={"TeamSync"} secondary = {"Project Management Service"} style={{ textAlign: 'center' }}/>
            <ListItemIcon>
                <ManageAccountsIcon />
            </ListItemIcon>
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton
            onClick={() => {
              navigate("/apps/genius");
            }}
          >
            <ListItemText primary={"Genius"}style={{ textAlign: 'center' }} />
            <AutoAwesomeIcon />
          </ListItemButton>
        </ListItem>

        <Divider />
      </List>
    </Box>
  );

  return (
    <div>
      <IconButton onClick={toggleDrawer("left", true)}>
        {children}
      </IconButton>
      <Drawer
        anchor={"left"}
        open={state["left"]}
        onClose={toggleDrawer("left", false)}
      >
        {list("left")}
      </Drawer>
    </div>
  );
}
