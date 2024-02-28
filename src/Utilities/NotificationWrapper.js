import {
  NotificationMessage,
  NotificationTitle,
} from "../GeneralComponents/NotificationComponents";
import { NotificationManager } from "react-notifications";

export const formatNtf = (message, title) => [
  <NotificationMessage>{message}</NotificationMessage>,
  <NotificationTitle>{title}</NotificationTitle>,
];
