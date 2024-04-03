import { useSearchParams } from "react-router-dom";
import { useAppSelector } from "../store";

const useIsLoggedUser = () => {
  const [searchParams] = useSearchParams();
  const currentUserId: string = searchParams.get("userid")!;

  const loggedUserId: string = useAppSelector(
    (store) => store.user.loggedUser!.id
  );
  const isLoggedUser = loggedUserId.toString() === currentUserId;
  
  return { currentUserId, loggedUserId, isLoggedUser };
};

export default useIsLoggedUser;
