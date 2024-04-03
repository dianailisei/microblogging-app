import { useSearchParams } from "react-router-dom";
import { useAppSelector } from "../store";

const useUserRights = () => {
  const [searchParams] = useSearchParams();
  const paramsUserId = searchParams.get("userid");
  const loggedUserId = useAppSelector((store) => store.user.loggedUser?.id);

  const currentUserId = paramsUserId ? paramsUserId : loggedUserId;

  return { currentUserId, isOwner: loggedUserId === currentUserId };
};

export default useUserRights;
