import { FaUser } from "react-icons/fa"
import { AppUser } from "../../../next-auth"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"

const UserAvatar = ({user}: {user?: AppUser | null}) => {
  console.log("UserAvatar")
  console.log(user?.image)
  // Todo How to make it so we're not making so many requests for the user.image from Google?
  return (
    <Avatar>
      <AvatarImage src={user?.image || ""}/>
      <AvatarFallback className="bg-blue-500">
        <FaUser/>
      </AvatarFallback>
    </Avatar>
  )
}

export default UserAvatar