import { atom, selector } from "recoil";

export const networkAtom = atom({
  key: "networkAtom",
  default: 104,
});

export const jobAtom = atom({
  key: "jobAtom",
  default: 0,
});

export const notificationsAtom = atom({
  key: "notificationsAtom",
  default: 12,
});

export const messagingAtom = atom({
  key: "messagingAtom",
  default: 2,
});

export const totalNotificationSelector = selector({
  key: "totalNotificationSelector",
  get: ({ get }) => {
    const networkCount = get(networkAtom);
    const jobsCount = get(jobAtom);
    const notificationsCount = get(notificationsAtom);
    const messagingCount = get(messagingAtom);
    return networkCount + jobsCount + notificationsCount + messagingCount;
  }
});