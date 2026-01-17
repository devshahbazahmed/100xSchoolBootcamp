import { useRecoilState, useRecoilValue } from 'recoil';
import './App.css';
import { jobAtom, messagingAtom, networkAtom, notificationsAtom, totalNotificationSelector } from './store/atoms/atoms';

function App() {
  const networkAtomCount = useRecoilValue(networkAtom);
  const jobsAtomCount = useRecoilValue(jobAtom);
  const notificationsAtomCount = useRecoilValue(notificationsAtom);
  const [messagingAtomCount] = useRecoilState(messagingAtom);
  const totalNotificationsCount = useRecoilValue(totalNotificationSelector);

  return (
    <>
      <button style={{ marginLeft: 10 }}>Home</button>

      <button style={{ marginLeft: 10 }}>My Network ({networkAtomCount >= 100 ? "99+" : networkAtomCount})</button>
      <button style={{ marginLeft: 10 }}>Jobs ({jobsAtomCount})</button>
      <button style={{ marginLeft: 10 }}>Messaging ({messagingAtomCount})</button>
      <button style={{ marginLeft: 10 }}>Notifications ({notificationsAtomCount})</button>

      <button>Me ({totalNotificationsCount})</button>
    </>
  );
}

// function ButtonUpdater() {
//   const setMessagingAtomCount = useSetRecoilState(messagingAtom);
//   return (
//     <button style={{ marginLeft: 10 }} onClick={() => {
//       setMessagingAtomCount(c => c + 1);
//     }}>Me</button>
//   );
// }

export default App;
