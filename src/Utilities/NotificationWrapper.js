import {
  NotificationMessage,
  NotificationTitle,
} from "../GeneralComponents/NotificationComponents";

export const formatNtf = (message, title) => [
  <NotificationMessage>{message}</NotificationMessage>,
  <NotificationTitle>{title}</NotificationTitle>,
];
